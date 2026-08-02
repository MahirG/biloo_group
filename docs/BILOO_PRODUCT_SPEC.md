# BILOO Product Specification

## Product statement

BILOO is an Ethiopia-first multi-service marketplace that connects customers, drivers, couriers, restaurants, supermarkets, construction suppliers and automotive-parts vendors through one identity, location, payment and support platform.

The platform contains five service domains:

1. Food delivery
2. Taxi booking
3. Supermarket shopping and delivery
4. Construction materials ordering
5. Car parts ordering

The software must not treat these as five unrelated applications. They share accounts, saved places, payments, notifications, support, promotions, ratings, mapping, fraud controls and operational reporting while preserving service-specific ordering and fulfilment rules.

## Release surfaces

### Customer mobile application

Target platforms: Android and iPhone.

Core capabilities:

- Phone-number and email authentication
- Optional Google and Apple sign-in
- Language-ready interface for English, Amharic and Afaan Oromo
- Home, work and custom saved addresses
- GPS permission and map-based pin selection
- Service discovery and service-area validation
- Restaurant, store and vendor search
- Product modifiers, variants and quantities
- Taxi pickup, destination, ride class and fare estimate
- Basket, promotion, tip and checkout
- Online payment and cash payment methods
- Live driver position and order status
- Push, SMS and in-app notifications
- Order and ride history
- Ratings, complaints, refunds and support tickets
- Favourites and recent purchases
- Low-bandwidth loading states and retry behaviour

### Driver and delivery mobile application

One application supports taxi drivers, couriers and hybrid operators through assigned capabilities.

Core capabilities:

- Registration and identity verification
- Driver licence, vehicle and insurance records
- Admin approval and suspension controls
- Online/offline availability
- Service-zone eligibility
- Job offers with expiry timers
- Accept, reject, arrive, pick up, start and complete states
- Native navigation hand-off
- Background location updates during active work only
- Pickup and delivery PIN verification
- Proof-of-delivery photo when required
- Taxi trip and delivery earnings
- Cash collection and reconciliation
- Wallet, payout and transaction history
- Safety incident and support escalation
- Ratings and performance indicators

### Vendor application and web workspace

Vendor types include restaurants, supermarkets, construction suppliers and automotive-parts sellers.

Core capabilities:

- Business onboarding and document verification
- Multiple branches per vendor
- Opening hours and temporary availability
- Staff accounts and permission levels
- Product, menu, category and variant management
- Inventory and low-stock controls
- Bulk pricing and minimum-order quantities
- Incoming order queue
- Accept, reject and preparation-time updates
- Substitution workflows for supermarket products
- Quote-required workflow for selected construction orders
- Vehicle compatibility attributes for automotive parts
- Sales, commission, tax and payout reports
- Customer review management and support

### Administrative and operations dashboard

Core capabilities:

- Live operations map
- Customer, driver, vendor and staff records
- Document review and approval queues
- Service zones, geofences and city configuration
- Taxi base fare, distance, duration and surge rules
- Delivery fee, distance band and weight rules
- Vendor and driver commission rules
- Order, ride, refund and dispute management
- Driver dispatch intervention
- Payment reconciliation and payout approval
- Promotion and referral campaigns
- Notification campaigns
- Fraud and suspicious-activity review
- Support ticket management
- Audit logs and role-based access
- Operational, financial and marketplace analytics

## Service-specific workflows

### Food delivery

Customer selects a restaurant, creates a basket, chooses delivery details and pays. The restaurant accepts the order and provides a preparation estimate. Dispatch assigns a courier using location, capacity, service zone and current workload. Pickup requires restaurant confirmation; delivery requires customer PIN or approved proof of delivery.

### Taxi booking

Customer selects pickup and destination, receives available ride classes and an estimated fare, and confirms a request. Dispatch ranks eligible nearby drivers. The accepted driver travels to pickup, starts the trip after customer verification, and completes at the destination. Final pricing follows configured distance, duration, waiting and adjustment rules.

### Supermarket shopping

Customer creates a multi-item basket. The store confirms stock and proposes substitutions where enabled. The customer may pre-authorise substitutions within a configured price tolerance. A courier receives the packed order and delivers it with item and payment verification.

### Construction materials

Products may have units, weight, minimum order, bulk price tiers and delivery-equipment requirements. Heavy orders may require scheduling, a supplier quote, vehicle capacity matching or manual operations approval. Delivery status includes loading, dispatched, site arrival and proof of receipt.

### Car parts

Products support part number, manufacturer, compatible makes, models, years, engines and variants. Vendors may mark fitment as verified, unverified or confirmation-required. Customer orders preserve vehicle details so incorrect-fit disputes can be investigated accurately.

## Shared order state model

All commerce services use a shared order lifecycle with domain-specific optional states:

- draft
- awaiting_payment
- placed
- vendor_review
- accepted
- preparing
- ready_for_pickup
- driver_assigned
- picked_up
- in_transit
- delivered
- completed
- cancelled
- refund_pending
- refunded
- disputed

Taxi trips use:

- requested
- searching
- driver_assigned
- driver_arriving
- driver_waiting
- in_progress
- completed
- cancelled
- disputed

State changes must be validated server-side and recorded in an immutable event history.

## Technical architecture

### Mobile

Recommended implementation: Expo and React Native with TypeScript.

- Customer and driver applications use separate app identifiers and release pipelines.
- Shared packages contain design tokens, API types, validation, localisation and telemetry.
- Device capabilities include push notifications, secure storage, foreground/background location and deep linking.

### Web

Recommended implementation: Next.js with TypeScript.

- Vendor workspace and admin dashboard are independent permission surfaces.
- Server-side authorization is mandatory for privileged operations.
- Responsive layout supports mobile vendor use while preserving dense desktop operations views.

### Backend

Recommended foundation: PostgreSQL with Supabase Auth, Realtime and Storage, plus server-side application services and Edge Functions where appropriate.

Primary domains:

- identity and roles
- vendors and branches
- catalogues and inventory
- baskets, orders and fulfilment
- drivers, vehicles and dispatch
- taxi rides
- payments, wallets and payouts
- notifications
- support and disputes
- promotions
- audit and analytics events

### Realtime and tracking

- Driver location is transmitted only while the driver is available or fulfilling an active job, according to privacy rules.
- High-frequency location data should use a short retention period and a dedicated access path.
- Customers can access location only for their active assigned order or ride.
- Operations staff access is role-controlled and audited.
- Order and ride state events are durable; map movement events are ephemeral.

### Payment abstraction

BILOO must use a payment-provider abstraction rather than embedding one gateway throughout the codebase.

Supported payment intents:

- customer charge
- cash collection
- partial or full refund
- driver payout
- vendor payout
- wallet credit or debit
- promotion contribution
- commission and platform fee

Every external payment callback must be signature-verified, idempotent and reconciled against an internal ledger.

## Security requirements

- Row-level security on all exposed database tables
- No service-role or payment secret in mobile or browser code
- Authorization based on server-controlled role records, not editable user metadata
- Multi-factor authentication for privileged administrators
- Immutable audit records for sensitive changes
- Encrypted document storage with time-limited access
- Rate limiting on authentication, checkout, dispatch and promotion endpoints
- Idempotency keys for order creation, payment and state transitions
- Session revocation for suspended drivers, vendors and staff
- Data minimisation for location, identity and payment information

## Delivery phases

### Phase 1 — Foundation and clickable vertical slice

- Product specification and information architecture
- Shared visual language
- Responsive customer web prototype
- Core data contracts
- Authentication and role design
- Initial repository structure

### Phase 2 — Commercial MVP

- Customer mobile application
- Driver and delivery application
- Vendor workspace
- Admin operations dashboard
- Food, taxi and supermarket workflows
- Payment gateway integration
- Push notifications
- Live tracking
- Pilot-city configuration

### Phase 3 — Extended marketplace

- Construction materials
- Automotive parts and fitment
- Scheduled and bulk logistics
- Quotes and substitutions
- Wallet, loyalty and referrals
- Advanced reporting

### Phase 4 — Scale and resilience

- Automated dispatch optimisation
- Multi-city and multi-country configuration
- Fraud scoring
- Corporate accounts
- Fleet operators
- High-availability architecture and disaster recovery

## Current implementation status

The repository branch `agent/biloo-super-app-foundation` contains:

- A new `/biloo` product route
- Responsive BILOO customer experience
- Five service selectors
- Searchable product catalogues
- Interactive basket
- Taxi pickup, destination and ride-class flow
- Browser location permission handling
- Simulated order and ride tracking
- Platform architecture and product documentation

The current checkout, tracking and location data are demonstrative. Production credentials, merchant accounts, maps, dispatch and database services must be connected in subsequent implementation phases.
