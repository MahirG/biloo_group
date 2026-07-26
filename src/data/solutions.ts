export type Solution = {
  slug: string;
  name: string;
  label: string;
  title: string;
  metaDescription: string;
  summary: string;
  overview: string[];
  capabilities: string[];
  outcomes: string[];
  questions: Array<{ question: string; answer: string }>;
};

export const solutions: Solution[] = [
  {
    slug: "artificial-intelligence",
    name: "Biloo AI",
    label: "Artificial intelligence",
    title: "Responsible AI products and workflow automation",
    metaDescription:
      "Biloo AI explores responsible artificial intelligence, multilingual interfaces, business automation, and practical AI products for African organizations.",
    summary:
      "Practical artificial intelligence designed around real workflows, human oversight, and the languages and operating conditions of the people using it.",
    overview: [
      "Biloo AI is a strategic direction within Biloo Group focused on turning artificial intelligence into dependable tools rather than demonstrations. The emphasis is on measurable workflow improvement, clear human accountability, and systems that remain useful after the novelty disappears.",
      "Potential work includes multilingual assistants, document intelligence, internal knowledge search, customer-support automation, forecasting, and decision-support systems. Each opportunity should begin with a defined problem, appropriate data governance, and a realistic plan for evaluation and maintenance.",
      "Biloo AI is not currently presented as a launched standalone product. It is a long-term capability area that will grow only through validated use cases and responsible delivery.",
    ],
    capabilities: [
      "AI product discovery and use-case validation",
      "Workflow automation and human-in-the-loop systems",
      "Multilingual conversational and search experiences",
      "Document processing and organizational knowledge tools",
      "Evaluation, monitoring, privacy, and responsible AI controls",
      "Integration of AI capabilities into existing web and mobile products",
    ],
    outcomes: [
      "Reduce repetitive operational work",
      "Make organizational knowledge easier to access",
      "Improve service quality without removing human accountability",
      "Support local-language and multilingual digital experiences",
    ],
    questions: [
      {
        question: "What kinds of AI systems does Biloo Group intend to build?",
        answer:
          "The priority is practical systems such as multilingual assistants, document intelligence, workflow automation, knowledge search, and decision-support tools tied to clear business or public-service outcomes.",
      },
      {
        question: "How will Biloo approach responsible AI?",
        answer:
          "Biloo intends to use clear data governance, human oversight, evaluation, monitoring, privacy protection, and honest communication about system limitations.",
      },
    ],
  },
  {
    slug: "cloud-platforms",
    name: "Biloo Cloud",
    label: "Cloud platforms",
    title: "Secure cloud architecture for dependable digital services",
    metaDescription:
      "Biloo Cloud is a strategic direction for secure cloud architecture, scalable application platforms, DevOps, observability, and reliable digital infrastructure.",
    summary:
      "Cloud-enabled systems designed for reliability, security, maintainability, and the realities of growing African businesses and institutions.",
    overview: [
      "Biloo Cloud represents the infrastructure and platform-engineering capability needed to support serious digital products. The goal is not to imitate global hyperscale providers. It is to help organizations design, deploy, operate, and improve cloud-enabled systems with discipline.",
      "The focus includes application architecture, managed data platforms, deployment automation, monitoring, resilience, cost awareness, and secure integration. Solutions should be proportionate to the organization: simple where simplicity is sufficient, and more sophisticated only when scale and risk justify it.",
      "This is currently a strategic capability area, not a claim that Biloo operates its own public cloud infrastructure.",
    ],
    capabilities: [
      "Cloud architecture and platform selection",
      "Web and mobile application backends",
      "Continuous integration and deployment automation",
      "Database, storage, caching, and API design",
      "Observability, backups, recovery, and operational readiness",
      "Security reviews and infrastructure hardening",
    ],
    outcomes: [
      "Improve application reliability and release confidence",
      "Create infrastructure that can grow without needless complexity",
      "Reduce avoidable operational and security risk",
      "Make system health and cost easier to understand",
    ],
    questions: [
      {
        question: "Does Biloo Cloud mean Biloo owns data centers?",
        answer:
          "No. At this stage, Biloo Cloud describes a strategic capability for designing and operating secure cloud-enabled systems using appropriate infrastructure providers and open technologies.",
      },
      {
        question: "What organizations could use Biloo Cloud services?",
        answer:
          "Growing businesses, software teams, marketplaces, financial platforms, and public institutions that need dependable applications, secure infrastructure, and stronger delivery practices.",
      },
    ],
  },
  {
    slug: "digital-payments",
    name: "Biloo Pay",
    label: "Financial technology",
    title: "Compliance-first digital payment experiences",
    metaDescription:
      "Biloo Pay is a future fintech direction focused on trusted payment experiences, financial integrations, access, security, and regulatory discipline.",
    summary:
      "Payment and financial technology concepts built around trust, access, security, transparent operations, and compliance from the beginning.",
    overview: [
      "Biloo Pay is a future direction for financial technology and payment experiences. Any work in this area must begin with regulation, licensing, security, consumer protection, and strong operational controls—not simply with an interface or transaction flow.",
      "Potential opportunities include merchant payment experiences, payment integrations, reconciliation tools, financial dashboards, and infrastructure that helps regulated partners serve customers more effectively.",
      "Biloo Pay is not currently a licensed financial institution or launched payment product. The name represents an area for careful future research and partnership with appropriately regulated organizations.",
    ],
    capabilities: [
      "Payment product and user-experience design",
      "Integration with licensed payment providers",
      "Merchant tools and transaction workflows",
      "Reconciliation, reporting, and operational dashboards",
      "Security, fraud-risk, and compliance-oriented architecture",
      "Financial product discovery with regulated partners",
    ],
    outcomes: [
      "Make payment flows clearer and more dependable",
      "Improve merchant visibility into transactions",
      "Reduce manual reconciliation work",
      "Support compliant digital-finance innovation",
    ],
    questions: [
      {
        question: "Is Biloo Pay already a payment service?",
        answer:
          "No. Biloo Pay is a strategic future direction. Any launch would require appropriate licenses, regulated partnerships, security controls, and jurisdiction-specific compliance.",
      },
      {
        question: "Why include fintech in Biloo Group's long-term strategy?",
        answer:
          "Payments are foundational to digital commerce and business operations, but they require exceptional trust and discipline. Biloo will only pursue opportunities where it can meet those standards.",
      },
    ],
  },
  {
    slug: "digital-commerce",
    name: "Biloo Commerce",
    label: "Digital commerce",
    title: "Marketplaces and commerce systems for modern businesses",
    metaDescription:
      "Biloo Commerce explores marketplaces, merchant tools, order operations, dropshipping workflows, inventory systems, and digital commerce for African businesses.",
    summary:
      "Commerce platforms that connect customers, merchants, products, payments, fulfillment, and operational insight in one dependable experience.",
    overview: [
      "Biloo Commerce is the strategic direction most closely connected to marketplaces, e-commerce operations, and the practical systems behind online selling. A successful commerce product is more than a storefront: it must manage catalog quality, orders, payments, fulfillment, customer support, merchant operations, and trustworthy reporting.",
      "Potential solutions include multi-vendor marketplaces, merchant portals, order-management systems, dropshipping operations, inventory visibility, product-information tools, and integrations that help businesses move from fragmented manual work to coordinated digital operations.",
      "Biloo will prioritize focused commerce problems where local market knowledge and strong product engineering can create a meaningful advantage.",
    ],
    capabilities: [
      "Marketplace and multi-vendor platform design",
      "Merchant onboarding and seller operations",
      "Catalog, product, inventory, and order management",
      "Dropshipping and fulfillment workflow systems",
      "Commerce analytics and operational dashboards",
      "Payment, logistics, and customer-service integrations",
    ],
    outcomes: [
      "Help merchants manage online operations more clearly",
      "Create trustworthy buyer and seller experiences",
      "Reduce fragmented order and fulfillment work",
      "Build commerce systems suited to local operating realities",
    ],
    questions: [
      {
        question:
          "Will Biloo Commerce be a marketplace or a software platform?",
        answer:
          "The direction could support either model, but Biloo will begin with a specific validated problem rather than launching a broad marketplace without evidence of demand and operational readiness.",
      },
      {
        question:
          "Does Biloo Group have experience interests in dropshipping and marketplaces?",
        answer:
          "The founder has identified digital commerce, dropshipping operations, and marketplaces as areas of practical interest that can inform future product discovery.",
      },
    ],
  },
  {
    slug: "product-innovation",
    name: "Biloo Labs",
    label: "Product innovation",
    title: "Research, prototypes, and disciplined product discovery",
    metaDescription:
      "Biloo Labs explores software product discovery, rapid prototypes, SaaS concepts, emerging technology, and evidence-based innovation from Ethiopia.",
    summary:
      "A disciplined environment for exploring ideas, testing assumptions, building prototypes, and deciding which opportunities deserve long-term investment.",
    overview: [
      "Biloo Labs is intended to be the product-discovery and research arm of Biloo Group. Its role is to convert broad ambition into testable questions, prototypes, user evidence, and clear investment decisions.",
      "Work may include SaaS concepts, AI-enabled tools, developer products, business software, experiments in new interfaces, and research into technology opportunities relevant to Ethiopia and wider African markets.",
      "The purpose is not to produce endless prototypes. Successful experiments should either become focused products, inform client work, or be stopped with documented learning.",
    ],
    capabilities: [
      "Opportunity research and product discovery",
      "User interviews and problem validation",
      "Rapid prototyping and technical feasibility studies",
      "SaaS product architecture and minimum viable products",
      "Experiment design, measurement, and learning documentation",
      "Incubation of products that earn further investment",
    ],
    outcomes: [
      "Reduce investment in weak or unvalidated ideas",
      "Turn promising problems into testable products",
      "Build reusable knowledge across the Biloo ecosystem",
      "Create a responsible path from experiment to company",
    ],
    questions: [
      {
        question: "Is Biloo Labs a separate company?",
        answer:
          "Not at this stage. Biloo Labs is a strategic operating concept within Biloo Group for research, prototypes, and evidence-based product development.",
      },
      {
        question: "How will Biloo decide which ideas to pursue?",
        answer:
          "Ideas should be evaluated against problem importance, user evidence, technical feasibility, economics, regulatory risk, strategic fit, and Biloo's ability to deliver responsibly.",
      },
    ],
  },
  {
    slug: "public-sector-technology",
    name: "Biloo Gov",
    label: "Public-sector technology",
    title: "Accessible digital systems for public service delivery",
    metaDescription:
      "Biloo Gov is a strategic direction for accessible public portals, case-management systems, government technology, digital services, and resilient civic infrastructure.",
    summary:
      "Public-service technology designed for accessibility, resilience, transparency, operational reality, and measurable improvement in how institutions serve people.",
    overview: [
      "Biloo Gov is a long-term direction for digital public infrastructure and public-service systems. Government technology must work for diverse users, constrained devices, varying connectivity, complex policy rules, and the teams responsible for operating services every day.",
      "Potential work includes public information portals, application and case-management systems, internal administrative tools, service-status communication, data platforms, and accessible digital forms.",
      "Biloo would approach public-sector work through transparent procurement, privacy and security requirements, accessibility, institutional capacity building, and measurable service outcomes.",
    ],
    capabilities: [
      "Digital public-service and portal design",
      "Application, case-management, and workflow systems",
      "Accessible forms and multilingual service experiences",
      "Data integration, reporting, and operational dashboards",
      "Security, privacy, resilience, and continuity planning",
      "Documentation, training, and institutional handover",
    ],
    outcomes: [
      "Make public services easier to understand and access",
      "Reduce avoidable administrative friction",
      "Improve visibility into service operations",
      "Create systems institutions can maintain over time",
    ],
    questions: [
      {
        question: "What principles would guide Biloo Gov projects?",
        answer:
          "Accessibility, privacy, security, transparent governance, multilingual usability, operational resilience, maintainability, and measurable improvement in public service delivery.",
      },
      {
        question: "Is Biloo Group currently a government contractor?",
        answer:
          "The website does not claim current government contracts. Biloo Gov represents a future strategic direction and capability area.",
      },
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
