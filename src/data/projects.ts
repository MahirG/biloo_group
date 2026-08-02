export type Project = {
  slug: string;
  name: string;
  category: string;
  status: string;
  description: string;
  audience: string;
  purpose: string;
  capabilities: readonly string[];
  safeguards: readonly string[];
  plannedDomain?: string;
  prototypePath?: string;
};

export const projects: readonly Project[] = [
  {
    slug: "biloo",
    name: "BILOO",
    category: "Multi-service mobility and commerce platform",
    status: "MVP foundation in development",
    description:
      "A modular super-app project bringing food delivery, taxi booking, supermarket shopping, construction-material ordering, and car-parts commerce into one trusted customer experience.",
    audience:
      "Customers, drivers, delivery partners, restaurants, supermarkets, construction suppliers, automotive-parts vendors, and operations teams beginning in Addis Ababa.",
    purpose:
      "Reduce the friction of using disconnected services by creating one identity, wallet, location, tracking, notification, support, and operations layer across everyday mobility and commerce.",
    capabilities: [
      "Customer application for five service verticals",
      "Driver and delivery-partner dispatch workflows",
      "Vendor order, catalog, inventory, and payout operations",
      "Administrative command center and service-health monitoring",
      "Live order and trip tracking with GPS-based service zones",
      "Online payments, wallet, notifications, ratings, and support",
    ],
    safeguards: [
      "The current route is an interactive product foundation, not a live transportation, delivery, or payment service.",
      "Production launch requires verified payment, mapping, identity, driver-safety, vendor, privacy, and customer-support controls.",
      "Pricing, service coverage, delivery promises, and launch dates must remain provisional until operations are tested.",
    ],
    prototypePath: "/biloo",
  },
  {
    slug: "qabeza-erp",
    name: "Qabeza ERP",
    category: "Enterprise resource planning",
    status: "Validation and development",
    description:
      "An enterprise resource planning project designed to unify finance, procurement, inventory, payroll, operations, and governance across complex organizations.",
    audience:
      "Multi-branch businesses, institutions, and operational teams that need shared controls, reliable records, and coordinated workflows.",
    purpose:
      "Reduce fragmented tools and manual handoffs by creating one accountable operating system for core organizational processes.",
    capabilities: [
      "Multi-branch operations and consolidated visibility",
      "Finance, procurement, inventory, and payroll workflows",
      "Role-based access, approvals, and audit logs",
      "Operational reporting and governance controls",
      "Configurable workflows and integrations",
    ],
    safeguards: [
      "Production readiness must be demonstrated before public launch claims.",
      "Financial, payroll, and employee data require strict access controls and auditability.",
      "Customer names, integrations, and performance results must not be published without verification.",
    ],
  },
  {
    slug: "mezgeb",
    name: "Mezgeb",
    category: "Business ledger for Ethiopia",
    status: "Interactive prototype and early development",
    description:
      "An Ethiopian business-ledger project for sales, expenses, VAT-ready receipts, customer credit, payments, inventory, suppliers, reports, and daily business control.",
    audience:
      "Ethiopian small businesses and operators who need a clearer daily view of money, stock, customer credit, and business activity.",
    purpose:
      "Make everyday record-keeping simpler and more locally relevant while creating a path toward dependable digital business management.",
    capabilities: [
      "Sales and expense recording",
      "VAT-ready receipts and TIN-aware workflows",
      "Dube customer-credit tracking",
      "Payment and mobile-money tracking",
      "Inventory, supplier, and business reports",
      "Backup and synchronization as a future production capability",
    ],
    safeguards: [
      "The current prototype must not be used for real financial records.",
      "Production use requires verified security, privacy, backup, reliability, and support controls.",
      "Pricing, availability, and launch claims must remain provisional until confirmed.",
    ],
    plannedDomain: "mezgeb.com.et",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
