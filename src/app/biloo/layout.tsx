import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BILOO Super App",
  description:
    "Preview the BILOO multi-service platform for food delivery, taxi booking, supermarket shopping, construction materials and car parts.",
  alternates: { canonical: "/biloo" },
  openGraph: {
    title: "BILOO — One App for Everyday Life",
    description:
      "An Ethiopia-first multi-service platform for rides, deliveries, shopping, construction supplies and automotive parts.",
    url: "/biloo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BILOO — One App for Everyday Life",
    description:
      "An Ethiopia-first multi-service platform for rides, deliveries and everyday shopping.",
  },
};

export default function BilooLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
