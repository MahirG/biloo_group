-- BILOO super-app foundation
-- Launch defaults: Ethiopia, ETB, Addis Ababa service zones.

create extension if not exists pgcrypto;
create extension if not exists postgis;

create type public.biloo_user_role as enum (
  'customer',
  'driver',
  'vendor_staff',
  'support',
  'operations',
  'admin'
);

create type public.biloo_vendor_type as enum (
  'restaurant',
  'supermarket',
  'construction_supplier',
  'auto_parts_supplier'
);

create type public.biloo_order_status as enum (
  'draft',
  'pending_payment',
  'placed',
  'accepted',
  'preparing',
  'ready_for_pickup',
  'picked_up',
  'in_transit',
  'delivered',
  'cancelled',
  'rejected',
  'payment_failed',
  'refund_pending',
  'refunded',
  'disputed'
);

create type public.biloo_trip_status as enum (
  'requested',
  'searching',
  'driver_assigned',
  'driver_arriving',
  'driver_arrived',
  'in_progress',
  'completed',
  'no_driver_found',
  'cancelled_by_customer',
  'cancelled_by_driver',
  'cancelled_by_operations',
  'payment_failed',
  'disputed'
);

create type public.biloo_payment_status as enum (
  'created',
  'pending',
  'authorized',
  'paid',
  'failed',
  'cancelled',
  'partially_refunded',
  'refunded'
);

create type public.biloo_job_status as enum (
  'unassigned',
  'offered',
  'accepted',
  'arriving_pickup',
  'at_pickup',
  'in_progress',
  'completed',
  'expired',
  'cancelled'
);

create table public.biloo_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.biloo_user_role not null default 'customer',
  full_name text,
  phone text,
  avatar_path text,
  preferred_language text not null default 'en' check (preferred_language in ('en', 'am', 'om')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index biloo_profiles_phone_unique
  on public.biloo_profiles(phone)
  where phone is not null;

create table public.biloo_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.biloo_profiles(id) on delete cascade,
  label text not null,
  recipient_name text,
  recipient_phone text,
  formatted_address text not null,
  instructions text,
  location geography(point, 4326) not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index biloo_addresses_user_idx on public.biloo_addresses(user_id);
create index biloo_addresses_location_idx on public.biloo_addresses using gist(location);

create table public.biloo_service_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text not null default 'Addis Ababa',
  country_code char(2) not null default 'ET',
  boundary geography(polygon, 4326) not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index biloo_service_zones_boundary_idx on public.biloo_service_zones using gist(boundary);

create table public.biloo_vendors (
  id uuid primary key default gen_random_uuid(),
  type public.biloo_vendor_type not null,
  legal_name text not null,
  display_name text not null,
  description text,
  phone text,
  email text,
  logo_path text,
  cover_path text,
  location geography(point, 4326),
  formatted_address text,
  service_zone_id uuid references public.biloo_service_zones(id),
  commission_rate numeric(5, 2) not null default 0 check (commission_rate between 0 and 100),
  minimum_order_amount numeric(14, 2) not null default 0,
  average_preparation_minutes integer,
  is_verified boolean not null default false,
  is_open boolean not null default false,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index biloo_vendors_type_idx on public.biloo_vendors(type, is_active, is_open);
create index biloo_vendors_location_idx on public.biloo_vendors using gist(location);

create table public.biloo_vendor_users (
  vendor_id uuid not null references public.biloo_vendors(id) on delete cascade,
  user_id uuid not null references public.biloo_profiles(id) on delete cascade,
  role text not null default 'staff' check (role in ('owner', 'manager', 'staff')),
  created_at timestamptz not null default now(),
  primary key (vendor_id, user_id)
);

create table public.biloo_categories (
  id uuid primary key default gen_random_uuid(),
  vendor_type public.biloo_vendor_type not null,
  parent_id uuid references public.biloo_categories(id) on delete set null,
  name text not null,
  slug text not null,
  image_path text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (vendor_type, slug)
);

create table public.biloo_products (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.biloo_vendors(id) on delete cascade,
  category_id uuid references public.biloo_categories(id) on delete set null,
  name text not null,
  description text,
  sku text,
  unit_label text not null default 'item',
  base_price numeric(14, 2) not null check (base_price >= 0),
  compare_at_price numeric(14, 2),
  currency char(3) not null default 'ETB',
  stock_quantity numeric(14, 3),
  is_available boolean not null default true,
  requires_quote boolean not null default false,
  image_paths text[] not null default '{}',
  attributes jsonb not null default '{}'::jsonb,
  -- Auto-parts attributes may include make, model, year range, engine, OEM number.
  -- Construction attributes may include weight, volume, truck class, and bulk tiers.
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (vendor_id, sku)
);

create index biloo_products_vendor_idx on public.biloo_products(vendor_id, is_available);
create index biloo_products_category_idx on public.biloo_products(category_id);
create index biloo_products_attributes_idx on public.biloo_products using gin(attributes);

create table public.biloo_product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.biloo_products(id) on delete cascade,
  name text not null,
  sku text,
  price_delta numeric(14, 2) not null default 0,
  stock_quantity numeric(14, 3),
  attributes jsonb not null default '{}'::jsonb,
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, sku)
);

create table public.biloo_driver_profiles (
  user_id uuid primary key references public.biloo_profiles(id) on delete cascade,
  verification_status text not null default 'pending' check (verification_status in ('pending', 'in_review', 'approved', 'rejected', 'suspended')),
  service_roles text[] not null default array['delivery']::text[],
  is_online boolean not null default false,
  is_available boolean not null default false,
  rating numeric(3, 2) not null default 5.00,
  completed_jobs integer not null default 0,
  documents jsonb not null default '{}'::jsonb,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.biloo_vehicles (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.biloo_driver_profiles(user_id) on delete cascade,
  vehicle_class text not null,
  make text,
  model text,
  production_year integer,
  plate_number text not null,
  color text,
  capacity_kg numeric(12, 2),
  documents jsonb not null default '{}'::jsonb,
  is_verified boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (plate_number)
);

create table public.biloo_driver_locations (
  driver_id uuid primary key references public.biloo_driver_profiles(user_id) on delete cascade,
  location geography(point, 4326) not null,
  heading numeric(6, 2),
  speed_kph numeric(7, 2),
  accuracy_meters numeric(9, 2),
  recorded_at timestamptz not null default now()
);

create index biloo_driver_locations_location_idx on public.biloo_driver_locations using gist(location);
create index biloo_driver_locations_recorded_idx on public.biloo_driver_locations(recorded_at desc);

create table public.biloo_orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid not null references public.biloo_profiles(id),
  vendor_id uuid not null references public.biloo_vendors(id),
  delivery_address_id uuid references public.biloo_addresses(id),
  status public.biloo_order_status not null default 'draft',
  currency char(3) not null default 'ETB',
  subtotal numeric(14, 2) not null default 0,
  delivery_fee numeric(14, 2) not null default 0,
  service_fee numeric(14, 2) not null default 0,
  discount_amount numeric(14, 2) not null default 0,
  tax_amount numeric(14, 2) not null default 0,
  total_amount numeric(14, 2) not null default 0,
  customer_note text,
  delivery_location geography(point, 4326),
  pricing_snapshot jsonb not null default '{}'::jsonb,
  placed_at timestamptz,
  delivered_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index biloo_orders_customer_idx on public.biloo_orders(customer_id, created_at desc);
create index biloo_orders_vendor_idx on public.biloo_orders(vendor_id, status, created_at desc);
create index biloo_orders_delivery_location_idx on public.biloo_orders using gist(delivery_location);

create table public.biloo_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.biloo_orders(id) on delete cascade,
  product_id uuid references public.biloo_products(id) on delete set null,
  variant_id uuid references public.biloo_product_variants(id) on delete set null,
  product_name text not null,
  sku text,
  unit_label text not null,
  quantity numeric(14, 3) not null check (quantity > 0),
  unit_price numeric(14, 2) not null check (unit_price >= 0),
  line_total numeric(14, 2) not null check (line_total >= 0),
  configuration jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index biloo_order_items_order_idx on public.biloo_order_items(order_id);

create table public.biloo_trips (
  id uuid primary key default gen_random_uuid(),
  trip_number text not null unique,
  customer_id uuid not null references public.biloo_profiles(id),
  driver_id uuid references public.biloo_driver_profiles(user_id),
  vehicle_id uuid references public.biloo_vehicles(id),
  status public.biloo_trip_status not null default 'requested',
  vehicle_class text not null,
  pickup_address text not null,
  pickup_location geography(point, 4326) not null,
  destination_address text not null,
  destination_location geography(point, 4326) not null,
  estimated_distance_meters integer,
  estimated_duration_seconds integer,
  quoted_fare numeric(14, 2) not null,
  final_fare numeric(14, 2),
  currency char(3) not null default 'ETB',
  pricing_snapshot jsonb not null default '{}'::jsonb,
  requested_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index biloo_trips_customer_idx on public.biloo_trips(customer_id, created_at desc);
create index biloo_trips_driver_idx on public.biloo_trips(driver_id, status, created_at desc);
create index biloo_trips_pickup_location_idx on public.biloo_trips using gist(pickup_location);

create table public.biloo_delivery_jobs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid unique references public.biloo_orders(id) on delete cascade,
  driver_id uuid references public.biloo_driver_profiles(user_id),
  vehicle_id uuid references public.biloo_vehicles(id),
  status public.biloo_job_status not null default 'unassigned',
  pickup_location geography(point, 4326),
  dropoff_location geography(point, 4326),
  offered_at timestamptz,
  offer_expires_at timestamptz,
  accepted_at timestamptz,
  picked_up_at timestamptz,
  completed_at timestamptz,
  proof jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index biloo_delivery_jobs_driver_idx on public.biloo_delivery_jobs(driver_id, status);

create table public.biloo_payments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.biloo_profiles(id),
  order_id uuid references public.biloo_orders(id),
  trip_id uuid references public.biloo_trips(id),
  provider text not null,
  provider_reference text,
  idempotency_key text not null unique,
  method text not null,
  status public.biloo_payment_status not null default 'created',
  amount numeric(14, 2) not null check (amount >= 0),
  refunded_amount numeric(14, 2) not null default 0 check (refunded_amount >= 0),
  currency char(3) not null default 'ETB',
  provider_payload jsonb not null default '{}'::jsonb,
  paid_at timestamptz,
  failed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((order_id is not null)::integer + (trip_id is not null)::integer = 1)
);

create index biloo_payments_order_idx on public.biloo_payments(order_id);
create index biloo_payments_trip_idx on public.biloo_payments(trip_id);
create index biloo_payments_provider_reference_idx on public.biloo_payments(provider, provider_reference);

create table public.biloo_wallets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.biloo_profiles(id),
  currency char(3) not null default 'ETB',
  created_at timestamptz not null default now(),
  unique (owner_id, currency)
);

create table public.biloo_wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  wallet_id uuid not null references public.biloo_wallets(id),
  direction text not null check (direction in ('credit', 'debit')),
  type text not null,
  amount numeric(14, 2) not null check (amount > 0),
  reference_type text,
  reference_id uuid,
  idempotency_key text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create index biloo_wallet_transactions_wallet_idx
  on public.biloo_wallet_transactions(wallet_id, created_at desc);

create table public.biloo_status_events (
  id bigint generated always as identity primary key,
  entity_type text not null check (entity_type in ('order', 'trip', 'delivery_job', 'payment')),
  entity_id uuid not null,
  previous_status text,
  next_status text not null,
  actor_id uuid references public.biloo_profiles(id),
  note text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index biloo_status_events_entity_idx
  on public.biloo_status_events(entity_type, entity_id, created_at);

create table public.biloo_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.biloo_profiles(id) on delete cascade,
  channel text not null check (channel in ('in_app', 'push', 'sms', 'email')),
  template_key text not null,
  title text,
  body text not null,
  data jsonb not null default '{}'::jsonb,
  status text not null default 'queued' check (status in ('queued', 'sent', 'delivered', 'failed', 'read')),
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index biloo_notifications_user_idx on public.biloo_notifications(user_id, created_at desc);

create table public.biloo_reviews (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.biloo_profiles(id),
  order_id uuid references public.biloo_orders(id),
  trip_id uuid references public.biloo_trips(id),
  target_type text not null check (target_type in ('vendor', 'driver', 'product')),
  target_id uuid not null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  check ((order_id is not null)::integer + (trip_id is not null)::integer = 1)
);

create table public.biloo_admin_audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid references public.biloo_profiles(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  before_data jsonb,
  after_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create or replace function public.biloo_set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger biloo_profiles_updated_at before update on public.biloo_profiles for each row execute function public.biloo_set_updated_at();
create trigger biloo_addresses_updated_at before update on public.biloo_addresses for each row execute function public.biloo_set_updated_at();
create trigger biloo_service_zones_updated_at before update on public.biloo_service_zones for each row execute function public.biloo_set_updated_at();
create trigger biloo_vendors_updated_at before update on public.biloo_vendors for each row execute function public.biloo_set_updated_at();
create trigger biloo_products_updated_at before update on public.biloo_products for each row execute function public.biloo_set_updated_at();
create trigger biloo_product_variants_updated_at before update on public.biloo_product_variants for each row execute function public.biloo_set_updated_at();
create trigger biloo_driver_profiles_updated_at before update on public.biloo_driver_profiles for each row execute function public.biloo_set_updated_at();
create trigger biloo_vehicles_updated_at before update on public.biloo_vehicles for each row execute function public.biloo_set_updated_at();
create trigger biloo_orders_updated_at before update on public.biloo_orders for each row execute function public.biloo_set_updated_at();
create trigger biloo_trips_updated_at before update on public.biloo_trips for each row execute function public.biloo_set_updated_at();
create trigger biloo_delivery_jobs_updated_at before update on public.biloo_delivery_jobs for each row execute function public.biloo_set_updated_at();
create trigger biloo_payments_updated_at before update on public.biloo_payments for each row execute function public.biloo_set_updated_at();

create or replace function public.biloo_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.biloo_profiles
    where id = auth.uid()
      and role in ('support', 'operations', 'admin')
      and is_active
  );
$$;

create or replace function public.biloo_is_vendor_user(target_vendor_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.biloo_vendor_users
    where vendor_id = target_vendor_id
      and user_id = auth.uid()
  );
$$;

alter table public.biloo_profiles enable row level security;
alter table public.biloo_addresses enable row level security;
alter table public.biloo_service_zones enable row level security;
alter table public.biloo_vendors enable row level security;
alter table public.biloo_vendor_users enable row level security;
alter table public.biloo_categories enable row level security;
alter table public.biloo_products enable row level security;
alter table public.biloo_product_variants enable row level security;
alter table public.biloo_driver_profiles enable row level security;
alter table public.biloo_vehicles enable row level security;
alter table public.biloo_driver_locations enable row level security;
alter table public.biloo_orders enable row level security;
alter table public.biloo_order_items enable row level security;
alter table public.biloo_trips enable row level security;
alter table public.biloo_delivery_jobs enable row level security;
alter table public.biloo_payments enable row level security;
alter table public.biloo_wallets enable row level security;
alter table public.biloo_wallet_transactions enable row level security;
alter table public.biloo_status_events enable row level security;
alter table public.biloo_notifications enable row level security;
alter table public.biloo_reviews enable row level security;
alter table public.biloo_admin_audit_log enable row level security;

create policy "profiles read own" on public.biloo_profiles for select using (id = auth.uid() or public.biloo_is_admin());
create policy "profiles update own" on public.biloo_profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "addresses own records" on public.biloo_addresses for all using (user_id = auth.uid() or public.biloo_is_admin()) with check (user_id = auth.uid() or public.biloo_is_admin());

create policy "active zones readable" on public.biloo_service_zones for select using (is_active or public.biloo_is_admin());
create policy "admins manage zones" on public.biloo_service_zones for all using (public.biloo_is_admin()) with check (public.biloo_is_admin());

create policy "active vendors readable" on public.biloo_vendors for select using (is_active or public.biloo_is_vendor_user(id) or public.biloo_is_admin());
create policy "vendor users manage vendor" on public.biloo_vendors for update using (public.biloo_is_vendor_user(id) or public.biloo_is_admin()) with check (public.biloo_is_vendor_user(id) or public.biloo_is_admin());

create policy "vendor membership visible" on public.biloo_vendor_users for select using (user_id = auth.uid() or public.biloo_is_admin());

create policy "active categories readable" on public.biloo_categories for select using (is_active or public.biloo_is_admin());
create policy "active products readable" on public.biloo_products for select using (is_available or public.biloo_is_vendor_user(vendor_id) or public.biloo_is_admin());
create policy "vendor users manage products" on public.biloo_products for all using (public.biloo_is_vendor_user(vendor_id) or public.biloo_is_admin()) with check (public.biloo_is_vendor_user(vendor_id) or public.biloo_is_admin());
create policy "active variants readable" on public.biloo_product_variants for select using (is_available or public.biloo_is_admin());

create policy "drivers read own profile" on public.biloo_driver_profiles for select using (user_id = auth.uid() or public.biloo_is_admin());
create policy "drivers update own profile" on public.biloo_driver_profiles for update using (user_id = auth.uid() or public.biloo_is_admin()) with check (user_id = auth.uid() or public.biloo_is_admin());
create policy "drivers manage own vehicles" on public.biloo_vehicles for all using (driver_id = auth.uid() or public.biloo_is_admin()) with check (driver_id = auth.uid() or public.biloo_is_admin());
create policy "drivers manage own location" on public.biloo_driver_locations for all using (driver_id = auth.uid() or public.biloo_is_admin()) with check (driver_id = auth.uid() or public.biloo_is_admin());

create policy "customers read own orders" on public.biloo_orders for select using (customer_id = auth.uid() or public.biloo_is_vendor_user(vendor_id) or public.biloo_is_admin());
create policy "customers create own orders" on public.biloo_orders for insert with check (customer_id = auth.uid());
create policy "customers read own order items" on public.biloo_order_items for select using (exists (select 1 from public.biloo_orders o where o.id = order_id and (o.customer_id = auth.uid() or public.biloo_is_vendor_user(o.vendor_id) or public.biloo_is_admin())));

create policy "trip participants read trips" on public.biloo_trips for select using (customer_id = auth.uid() or driver_id = auth.uid() or public.biloo_is_admin());
create policy "customers create trips" on public.biloo_trips for insert with check (customer_id = auth.uid());

create policy "job participants read jobs" on public.biloo_delivery_jobs for select using (driver_id = auth.uid() or exists (select 1 from public.biloo_orders o where o.id = order_id and (o.customer_id = auth.uid() or public.biloo_is_vendor_user(o.vendor_id))) or public.biloo_is_admin());

create policy "customers read own payments" on public.biloo_payments for select using (customer_id = auth.uid() or public.biloo_is_admin());
create policy "owners read wallets" on public.biloo_wallets for select using (owner_id = auth.uid() or public.biloo_is_admin());
create policy "owners read wallet transactions" on public.biloo_wallet_transactions for select using (exists (select 1 from public.biloo_wallets w where w.id = wallet_id and (w.owner_id = auth.uid() or public.biloo_is_admin())));

create policy "participants read status events" on public.biloo_status_events for select using (public.biloo_is_admin());
create policy "users read notifications" on public.biloo_notifications for select using (user_id = auth.uid() or public.biloo_is_admin());
create policy "users update notification reads" on public.biloo_notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "authors read reviews" on public.biloo_reviews for select using (author_id = auth.uid() or public.biloo_is_admin());
create policy "authors create reviews" on public.biloo_reviews for insert with check (author_id = auth.uid());
create policy "admins read audit log" on public.biloo_admin_audit_log for select using (public.biloo_is_admin());

-- Inserts and sensitive state transitions for orders, trips, payments, jobs,
-- wallet entries, status events, and audit records must be performed through
-- trusted server functions using the service role. Client applications must
-- never be allowed to mark a payment paid, assign a driver, or complete a job.
