export type InsightSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  introduction: string;
  sections: InsightSection[];
};

export const insights: Insight[] = [
  {
    slug: "building-software-for-african-operating-conditions",
    title: "Building software for African operating conditions",
    description:
      "A practical framework for designing reliable digital products around connectivity, devices, payments, language, trust, and operational capacity.",
    category: "Product engineering",
    publishedAt: "2026-07-26",
    readTime: "7 min read",
    introduction:
      "African markets are not one environment, and good product teams should resist treating them as one. The useful question is not whether a product is built for Africa in the abstract. It is whether the product understands the specific people, infrastructure, institutions, and operating constraints of the market it intends to serve.",
    sections: [
      {
        heading: "Start with the operating system around the software",
        paragraphs: [
          "A digital product is only one part of a wider service. Customers may discover it through social channels, pay through a separate provider, receive support through messaging, and depend on a human operator to resolve exceptions. Product discovery should map that complete journey before the team decides which screens or features to build.",
          "This wider view exposes the real dependencies: identity, payment confirmation, delivery, language, data quality, customer support, regulation, and the capacity of the organization operating the product. Ignoring these dependencies creates elegant interfaces that fail in ordinary use.",
        ],
      },
      {
        heading: "Design for variable connectivity and devices",
        paragraphs: [
          "Performance is a product feature. Pages should remain understandable before every decorative asset loads, core actions should use modest data, and error states should explain what happened without forcing the user to begin again. Mobile-first should describe the information architecture and task flow, not only responsive CSS.",
        ],
        points: [
          "Render important content as accessible HTML.",
          "Keep critical workflows short and recoverable.",
          "Compress media and avoid unnecessary client-side JavaScript.",
          "Preserve user input when a request fails.",
          "Test on ordinary devices and constrained networks.",
        ],
      },
      {
        heading: "Treat trust as infrastructure",
        paragraphs: [
          "Users assess whether a product is legitimate through details: clear ownership, recognizable contact information, transparent prices, understandable policies, accurate status updates, and consistent support. Trust cannot be repaired by visual polish after the operational system has been designed poorly.",
          "For marketplaces and financial products, trust also depends on dispute handling, merchant quality, audit trails, security controls, and the ability to explain a transaction. These systems should be designed before growth campaigns begin.",
        ],
      },
      {
        heading: "Build multilingual systems deliberately",
        paragraphs: [
          "Translation is not a final layer placed over an English product. Labels expand, grammar changes, dates and numbers vary, and some concepts require different explanations. A multilingual architecture should separate content from components, support editorial review, and test complete journeys in each language.",
          "Local-language support can expand access, but only when the terminology is clear and maintained. Automated translation may accelerate drafts; accountable human review remains essential for high-impact services.",
        ],
      },
      {
        heading: "Match architecture to institutional capacity",
        paragraphs: [
          "The most advanced architecture is not automatically the most responsible one. A system that requires a large specialist team, complex observability, and constant intervention may be a poor fit for an organization that needs a dependable service with a small operating team.",
          "Start with the simplest architecture that meets the risk, scale, and availability requirements. Document decisions, automate repeatable work, and add complexity only when evidence justifies it. Long-term maintainability is part of the user experience because every operational failure eventually reaches the user.",
        ],
      },
      {
        heading: "A useful product standard",
        paragraphs: [
          "Software designed for African operating conditions should not mean lower standards. It should mean higher situational awareness: global engineering quality combined with specific knowledge of local systems, behavior, constraints, and opportunity. That combination is where durable products are built.",
        ],
      },
    ],
  },
  {
    slug: "responsible-ai-for-multilingual-markets",
    title: "Responsible AI for multilingual markets",
    description:
      "How teams can evaluate language coverage, data governance, human oversight, and real operational value when building AI systems.",
    category: "Artificial intelligence",
    publishedAt: "2026-07-26",
    readTime: "8 min read",
    introduction:
      "Artificial intelligence can make information and services easier to access, but multilingual markets expose weaknesses that broad demonstrations often hide. A model may sound fluent while misunderstanding terminology, switching languages unpredictably, or producing confident answers that an organization cannot defend. Responsible deployment starts with the service being improved, not with the model being promoted.",
    sections: [
      {
        heading: "Define the decision and the accountable human",
        paragraphs: [
          "Every AI feature should have a clear role. Is it drafting, retrieving, classifying, recommending, translating, or deciding? The closer the system moves toward decisions that affect money, eligibility, safety, employment, or public services, the stronger the need for human review, auditability, and escalation.",
          "Accountability should be assigned to a role inside the organization. Saying that the model made a mistake is not an operating model. Someone must own the policy, evaluation, monitoring, incident response, and user remedy.",
        ],
      },
      {
        heading: "Evaluate each language as its own product experience",
        paragraphs: [
          "Average model performance can hide severe language gaps. Teams should create evaluation sets for the actual languages, dialects, code-switching patterns, terminology, and tasks users will bring to the system. Native speakers and domain experts should review outputs for accuracy, tone, completeness, and harmful ambiguity.",
        ],
        points: [
          "Test real user questions rather than translated benchmark prompts alone.",
          "Measure retrieval quality separately from generated wording.",
          "Check names, numbers, dates, legal terms, and local terminology.",
          "Include refusal, uncertainty, and escalation behavior in evaluation.",
          "Repeat evaluation after model, prompt, or knowledge-base changes.",
        ],
      },
      {
        heading: "Build the knowledge boundary",
        paragraphs: [
          "An organizational assistant should know where its answers come from. Retrieval systems can ground responses in approved documents, but only when those documents are current, permissioned, and structured well enough to retrieve. The product should distinguish verified organizational information from general model knowledge.",
          "Users should be able to see sources when the task requires confidence. When reliable information is unavailable, the system should say so and direct the user to a person or authoritative process.",
        ],
      },
      {
        heading: "Protect data throughout the workflow",
        paragraphs: [
          "AI governance includes more than model selection. Teams should determine what data enters the system, where it is processed, how long it is retained, who can access logs, whether prompts are used for provider training, and how sensitive information is redacted or separated.",
          "Access controls should follow the source systems. An assistant must not reveal a document merely because it can retrieve it. Privacy and authorization failures can be more damaging than an incorrect sentence.",
        ],
      },
      {
        heading: "Measure operational value, not conversation volume",
        paragraphs: [
          "Usage is not proof of value. A useful measurement plan might track time saved, first-contact resolution, retrieval accuracy, correction rate, escalation quality, cost per completed task, and user trust. It should also track failure modes and the burden placed on humans reviewing the system.",
          "If a simpler search interface, workflow rule, or well-designed form solves the problem more reliably, that may be the better technology. Responsible AI includes knowing when not to use AI.",
        ],
      },
      {
        heading: "Earn trust gradually",
        paragraphs: [
          "Start with bounded tasks where errors can be detected and corrected. Run pilots with representative users, publish limitations, create feedback loops, and expand scope only when evidence supports it. Multilingual AI can become meaningful infrastructure, but only when language inclusion is matched by engineering and institutional accountability.",
        ],
      },
    ],
  },
  {
    slug: "designing-digital-public-services-that-people-can-use",
    title: "Designing digital public services that people can use",
    description:
      "Principles for accessible forms, clear eligibility, resilient workflows, privacy, status communication, and maintainable government technology.",
    category: "Public-sector technology",
    publishedAt: "2026-07-26",
    readTime: "7 min read",
    introduction:
      "A digital public service succeeds when a person can understand what the service is, determine whether it applies to them, complete the required process, and know what happens next. The technology matters, but the public experience is shaped equally by policy language, evidence requirements, institutional workflow, support, and accountability.",
    sections: [
      {
        heading: "Design the service, not only the portal",
        paragraphs: [
          "Digitizing a confusing process can make confusion move faster without removing it. Teams should map the full service from discovery to final outcome, including offline steps, internal reviews, exceptions, appeals, notifications, and support. Policy and operations teams must participate alongside designers and engineers.",
          "The strongest opportunity is often simplification: remove unnecessary questions, reuse information the institution already has lawfully, explain why evidence is required, and reduce handoffs that create delay without improving control.",
        ],
      },
      {
        heading: "Make eligibility and evidence understandable",
        paragraphs: [
          "People should not need to complete a long form before learning that they are ineligible. Services should explain who can apply, what documents are needed, likely processing stages, fees, deadlines, and available support in plain language before the application begins.",
          "Examples and checklists are often more useful than policy text copied into an interface. Important information should be visible in accessible HTML and available in the languages needed by the service population.",
        ],
      },
      {
        heading: "Build forms that recover from real life",
        paragraphs: [
          "Public forms may involve many fields, evidence uploads, family information, or information gathered over time. Users should be able to save progress, return safely, review answers, correct mistakes, and understand validation messages. Sessions and upload limits must reflect the actual task.",
        ],
        points: [
          "Ask one coherent group of questions at a time.",
          "Explain errors next to the field and in a summary.",
          "Accept realistic file formats and clearly state size limits.",
          "Provide a confirmation and reference after submission.",
          "Design assisted-digital and offline alternatives for people who need them.",
        ],
      },
      {
        heading: "Communicate status and responsibility",
        paragraphs: [
          "Silence creates repeat visits, phone calls, and distrust. A service should show the current stage, actions required from the applicant, expected next step, and a route for help or correction. Internal teams need the same operational visibility through queues, ownership, service-level measures, and audit trails.",
          "Notifications should avoid exposing sensitive information and should not rely on one channel. The service should remain understandable even when a message is delayed or never delivered.",
        ],
      },
      {
        heading:
          "Treat accessibility, privacy, and security as service quality",
        paragraphs: [
          "Accessibility enables people with disabilities and also improves use on small screens, older devices, and difficult environments. Privacy requires data minimization, clear purpose, retention rules, access controls, and a way to correct information. Security requires threat modeling, secure development, monitoring, incident response, and operational ownership.",
          "These are not compliance decorations. A service that excludes users, exposes information, or cannot recover from failure is not a successful digital service.",
        ],
      },
      {
        heading: "Plan for institutional ownership",
        paragraphs: [
          "A public system should be maintainable after the initial project team leaves. That requires documented architecture, clear source-code and data ownership, training, support processes, accessible content governance, dependency management, backups, and realistic budgets for operation and improvement.",
          "Government technology becomes durable when it strengthens the institution operating it. The goal is not a launch event; it is a service that continues to work, improve, and earn public trust.",
        ],
      },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
