# BILOO Super App

## Product objective

BILOO is a modular, Ethiopia-first mobility and commerce platform that combines:

1. Food delivery
2. Taxi booking
3. Supermarket shopping and delivery
4. Construction-material ordering
5. Car-parts ordering

The platform serves four operating roles:

- Customer
- Driver and delivery partner
- Store and vendor
- Platform administrator

The interactive product foundation is available at `/biloo`. It demonstrates the intended information architecture and role-specific operating surfaces. It is not yet connected to live transport, delivery, payment, mapping, or notification infrastructure.

## Product principles

- One customer identity across every service.
- One wallet and payment ledger across orders and trips.
- One address book and location-permission model.
- One real-time tracking layer for transport and delivery.
- Shared ratings, notifications, support, fraud controls, and promotions.
- Separate operational rules for every service vertical.
- Mobile-first behavior for customers and drivers.
- Low-bandwidth tolerance and resilient retries for Ethiopian operating conditions.
- Clear operational truth: prototypes must not be represented as live services.

## Recommended production architecture

### Client applications

- Customer mobile app: Flutter, Android and iOS
- Driver and delivery app: Flutter, Android and iOS
- Vendor operations: responsive Next.js web application, followed by a focused mobile companion where justified
- Admin command center: Next.js and TypeScript

### Backend

Start as a modular monolith with strict domain boundaries. Split services only when scale, reliability, or team ownership requires it.

Recommended components:

- TypeScript application layer using NestJS
- PostgreSQL as the system of record
- PostGIS for geospatial queries and service-zone logic
- Redis for hot location state, rate limiting, dispatch locks, and short-lived sessions
- Durable job queue for notifications, payouts, order events, reconciliation, and webhooks
- Object storage for vendor documents, product media, delivery proof, and support attachments
- WebSocket gateway for trip and order tracking
- Event outbox pattern for reliable domain-event publication

### Core domains

- Identity and access
- Customer profiles and addresses
- Driver onboarding, documents, vehicles, availability, and earnings
- Vendor onboarding, branches, staff, catalogs, inventory, and payouts
- Service zones and geospatial pricing
- Food and supermarket orders
- Construction and car-parts commerce
- Taxi quotes, dispatch, trips, and fares
- Payments, wallet, refunds, commissions, and reconciliation
- Promotions, referrals, loyalty, and subscriptions
- Notifications and communication preferences
- Ratings, reviews, disputes, incidents, and customer support
- Administrative permissions, audit logs, reporting, and risk controls

## Shared order state model

Commerce orders should use a controlled state machine:

`draft → awaiting_payment → confirmed → accepted → preparing → ready_for_pickup → picked_up → in_transit → delivered`

Exception states:

- rejected
- cancelled
- payment_failed
- delivery_failed
- disputed
- refunded
- partially_refunded

Every transition must record:

- actor
- timestamp
- previous state
- next state
- reason code
- location where relevant
- correlation identifier

## Taxi trip state model

`quote_requested → quoted → requested → driver_assigned → driver_arriving → driver_arrived → trip_started → trip_completed`

Exception states:

- no_driver_found
- rider_cancelled
- driver_cancelled
- payment_failed
- safety_incident
- disputed

## Live location and tracking

- Drivers publish throttled location updates while online or assigned.
- The dispatch system stores hot location data in Redis and persists meaningful trip checkpoints in PostgreSQL.
- Customers receive authorized, time-limited location streams only for active orders or trips.
- Location history retention must be minimized and governed by a documented privacy policy.
- Background tracking must respect Android and iOS permission requirements.

## Payments

The payment abstraction must support multiple providers without coupling order logic to a single gateway.

Required payment capabilities:

- Payment intent creation
- Provider callback and webhook verification
- Idempotent confirmation
- Cash-on-delivery recording
- Wallet credit and debit ledger
- Partial and full refunds
- Vendor and driver payable balances
- Commission and fee allocation
- Settlement reconciliation
- Failed-payment recovery

No production payment flow should launch without signed webhook verification, idempotency keys, immutable ledger records, and reconciliation reporting.

## Security and safety baseline

- Phone OTP and optional email authentication
- Role-based and permission-based access control
- Short-lived access tokens and rotating refresh tokens
- Encrypted secrets and sensitive fields
- Administrative audit logs
- Vendor and driver document verification
- Rate limiting and abuse detection
- Payment-webhook signature verification
- Device and session visibility
- Delivery PIN or equivalent proof of handoff
- Emergency and incident reporting for taxi operations
- Data deletion, export, and retention workflows
- Automated backups and restoration testing

## Delivery phases

### Phase 1 — Product and platform foundation

- Interactive customer, driver, vendor, and admin experience
- Shared design system and navigation
- Domain model and API contracts
- Authentication foundation
- Customer profile, address, and location permissions
- Vendor and driver onboarding models
- Initial CI, environments, observability, and security controls

### Phase 2 — Food and supermarket launch slice

- Catalogs, carts, checkout, payments, order state machine
- Vendor acceptance and preparation workflow
- Driver dispatch and delivery proof
- Live order tracking and notifications
- Admin order operations, cancellations, refunds, and support

### Phase 3 — Taxi

- Fare quotation and service zones
- Driver availability and assignment
- Pickup and trip lifecycle
- Live trip tracking
- Driver earnings, rider receipts, cancellation rules, and safety controls

### Phase 4 — Construction materials and car parts

- Bulk quantity and unit handling
- Delivery scheduling and vehicle-capacity rules
- Supplier quotation workflows where needed
- Vehicle make, model, year, engine, and compatibility data
- Part-number and supplier search
- Returns, substitutions, and delivery exceptions

### Phase 5 — Scale and growth

- Wallet, loyalty, referrals, subscriptions, and corporate accounts
- Advanced dispatch and batching
- Multi-city operations
- Fraud scoring and operational automation
- Vendor advertising and sponsored placement
- Fleet and enterprise supplier tools

## Definition of production-ready

A service vertical is production-ready only when:

- End-to-end happy paths and major exception paths pass automated and manual testing.
- Payment and financial records reconcile.
- Permissions and audit logs are verified.
- Monitoring, alerts, backups, and restoration procedures are operational.
- Support and incident workflows have named owners.
- Driver and vendor onboarding requirements are approved.
- Service zones, pricing, cancellation rules, commissions, and payout rules are configured and reviewed.
- Privacy, terms, and safety policies are ready for the intended launch market.
- Android and iOS release requirements are satisfied.
