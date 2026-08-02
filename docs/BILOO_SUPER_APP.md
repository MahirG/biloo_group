# BILOO Super App

## Product purpose

BILOO is a location-aware multi-service platform for Ethiopia. A customer uses one identity, wallet, address book, support channel, and order history across five initial verticals:

1. Food delivery
2. Taxi booking
3. Supermarket shopping and delivery
4. Construction-material ordering
5. Car-parts ordering

The platform is designed as a modular super app, not five unrelated applications. Shared capabilities are built once and exposed through role-specific experiences.

## Applications

### Customer application

- Android and iOS from one Flutter codebase
- Phone OTP and optional email authentication
- English, Amharic, and Afaan Oromo localization foundation
- Address book and live GPS location
- Service-specific discovery and search
- Cart, checkout, ETB pricing, promotions, and invoices
- Cash, wallet, and supported Ethiopian payment providers
- Taxi booking and scheduled rides
- Real-time order and driver tracking
- Push, SMS, and in-app notifications
- Reviews, support, disputes, refunds, and order history

### Driver and delivery application

- Driver onboarding and document verification
- Vehicle and service-role management
- Online/offline status
- Dispatch offers with acceptance timeout
- Pickup, trip, and delivery workflow
- Background location updates during active jobs
- Navigation handoff and route visibility
- Delivery PIN, photo, or signature proof
- Earnings, commissions, wallet, and payout requests
- Safety, incident, and support tools

### Store and vendor application

- Restaurant, supermarket, construction supplier, and car-parts seller roles
- Business verification and staff access
- Product, variant, inventory, and price management
- Opening hours and service area management
- Order acceptance, preparation, packing, and handoff
- Bulk pricing and quote requests for construction materials
- Vehicle compatibility and part-number metadata for car parts
- Sales, commissions, settlements, refunds, and analytics

### Admin dashboard

- Customer, vendor, driver, fleet, and employee administration
- Verification queues and document review
- Live operations map
- Order, trip, dispatch, cancellation, refund, and dispute controls
- Service zones, pricing, commissions, promotions, and fees
- Payment reconciliation and settlements
- Notification campaigns and CMS content
- Role-based permissions and immutable audit records
- Operational, financial, and growth analytics

## Recommended repository shape

The existing repository remains the Biloo Group company website. The super-app implementation should evolve into a workspace without breaking the public site:

```text
apps/
  web/                 Biloo Group website and customer web experience
  admin/               Next.js operations dashboard
  customer-mobile/     Flutter customer app
  driver-mobile/       Flutter driver and delivery app
  vendor-mobile/       Flutter vendor app
packages/
  api-client/          Generated typed API client
  contracts/           Shared schemas and event contracts
  design-tokens/       Biloo colors, type, spacing, and icon rules
  localization/        English, Amharic, and Afaan Oromo strings
  observability/       Logging, tracing, and error-reporting helpers
services/
  api/                  NestJS modular API or Supabase Edge Functions
  dispatch/             Driver matching and assignment engine
  notifications/        Push, SMS, and in-app delivery service
supabase/
  migrations/           PostgreSQL schema and RLS policies
```

The current first implementation lives at `/apps/biloo` in the existing Next.js app so product behavior can be validated before repository extraction.

## Core bounded contexts

### Identity and access

- Customer, driver, vendor staff, support staff, and administrator roles
- Authentication through Supabase Auth or a dedicated identity service
- Row-level security for user-owned records
- Explicit permission grants for vendor and admin operations
- Device sessions, OTP throttling, and account-risk controls

### Location and serviceability

- Saved addresses with latitude and longitude
- PostGIS-backed service zones
- Vendor delivery radius and polygon coverage
- Driver live-location stream only during permitted operating states
- Distance, duration, traffic, and route-provider abstraction

### Commerce

- Vendor catalogs, categories, products, variants, modifiers, stock, and availability
- One vendor per standard cart in the launch MVP
- Order snapshots preserve name, price, tax, and configuration at purchase time
- Construction orders support heavy-delivery metadata and quote workflows
- Auto parts support make, model, year, engine, OEM number, and fitment confidence

### Taxi and dispatch

- Ride quote before confirmation
- Vehicle class and fare rules
- Driver availability and geospatial candidate search
- Offer, accept, expire, reassign, arrive, start, complete, and cancel states
- Dispatch service owns assignments; clients never assign drivers directly
- Location updates are rate-limited and retained according to privacy policy

### Payments and wallet

- Payment provider abstraction with idempotent webhooks
- ETB as the launch settlement currency
- Cash and online payment methods are recorded through one payment ledger
- Wallet balance is derived from immutable wallet transactions
- Vendor and driver earnings are ledger entries, not editable balance fields
- Refunds and reversals reference the original payment
- No client application can mark a payment successful

### Notifications

- Event-driven push, SMS, and in-app notifications
- User language and channel preferences
- Templates for order, ride, payment, verification, payout, and support events
- Delivery attempts and provider responses are recorded for support investigation

## Primary lifecycle states

### Commerce order

```text
DRAFT
→ PENDING_PAYMENT
→ PLACED
→ ACCEPTED
→ PREPARING
→ READY_FOR_PICKUP
→ PICKED_UP
→ IN_TRANSIT
→ DELIVERED
```

Terminal or exceptional states:

```text
CANCELLED
REJECTED
PAYMENT_FAILED
REFUND_PENDING
REFUNDED
DISPUTED
```

### Taxi trip

```text
REQUESTED
→ SEARCHING
→ DRIVER_ASSIGNED
→ DRIVER_ARRIVING
→ DRIVER_ARRIVED
→ IN_PROGRESS
→ COMPLETED
```

Terminal or exceptional states:

```text
NO_DRIVER_FOUND
CANCELLED_BY_CUSTOMER
CANCELLED_BY_DRIVER
CANCELLED_BY_OPERATIONS
PAYMENT_FAILED
DISPUTED
```

## API principles

- Versioned endpoints under `/v1`
- Idempotency key required for order creation, ride requests, payments, and refunds
- Cursor pagination for operational lists
- Server-calculated prices and fees
- Signed upload URLs for documents and delivery evidence
- Optimistic UI only for reversible client-local state
- WebSocket or Supabase Realtime channels for order, trip, and location updates
- Webhooks are acknowledged quickly and processed through durable jobs

## Launch architecture

### Frontend

- Flutter for customer, driver, and vendor mobile apps
- Next.js for admin and operational web tools
- Shared design tokens and generated API contracts

### Backend

A practical MVP can use Supabase PostgreSQL, Auth, Storage, Realtime, and Edge Functions. Business-critical workflows should remain behind server-side functions. A NestJS API can be introduced immediately or as the operational complexity grows.

Recommended modules:

- Auth and profiles
- Vendors and catalogs
- Cart and checkout
- Orders
- Taxi and trips
- Dispatch
- Driver operations
- Payments and wallet
- Notifications
- Support and disputes
- Admin and audit
- Reporting

### Infrastructure

- Managed PostgreSQL with point-in-time recovery
- Object storage for product media and verification documents
- Queue for payment, notification, dispatch, and settlement jobs
- Redis for short-lived dispatch state, throttling, and cache
- Centralized logs, traces, metrics, and error reporting
- Separate development, staging, and production environments

## Security requirements

- RLS enabled on all user-facing tables
- Secrets never exposed through mobile or browser bundles
- Payment webhook signatures verified before processing
- Sensitive driver and vendor documents stored in private buckets
- Document access through short-lived signed URLs
- Administrator actions written to an append-only audit log
- Location data collected only for a defined purpose and retention period
- Rate limits on OTP, login, search, pricing, ride request, and checkout endpoints
- Device and account-risk signals for fraud review
- Dependency scanning, static analysis, and protected production branches

## Ethiopia launch defaults

- Currency: ETB
- Initial geography: Addis Ababa, expanded by configured service zones
- Initial languages: English, Amharic, Afaan Oromo
- Payment abstraction prepared for Telebirr, M-PESA, CBE Birr, cards, wallet, and cash; providers are enabled only after commercial and technical approval
- Low-bandwidth behavior: compressed media, pagination, cached catalogs, retryable requests, and resilient order-state recovery

## Delivery plan

### Foundation — current branch

- Customer web product route at `/apps/biloo`
- Five service selectors
- Product discovery and basket interaction
- Taxi request interaction
- GPS permission flow
- Live-tracking presentation
- ETB pricing and wallet surface
- PostgreSQL foundation migration
- Product and system architecture

### Phase 1 — launch MVP

- Authentication and profiles
- Customer address book
- Vendor onboarding and catalogs
- Driver onboarding and availability
- Food and supermarket ordering
- Taxi quote, dispatch, and trip lifecycle
- Cash plus one approved online payment provider
- Push notifications
- Admin operations dashboard
- Production observability and support workflows

### Phase 2 — specialized commerce

- Construction supplier catalogs, bulk units, truck delivery, and quote requests
- Auto-part fitment, OEM numbers, vehicle garage, and compatibility validation
- Vendor settlements and driver payouts
- Promotions, referrals, and loyalty

### Phase 3 — scale

- Multi-city operations
- Advanced dispatch and batching
- Corporate and fleet accounts
- Biloo Plus subscription
- Fraud scoring and automated risk controls
- Data warehouse and experimentation platform

## Definition of launch readiness

BILOO is launch-ready only when:

- Payment and refund reconciliation pass end-to-end tests
- Every order and trip state has an operations recovery path
- Location and notification behavior is tested on real Android and iOS devices
- Vendor and driver verification procedures are documented
- Support can inspect a complete order, trip, payment, and notification timeline
- Backups and restoration are tested
- Security and privacy reviews are completed
- App-store requirements and production credentials are finalized
