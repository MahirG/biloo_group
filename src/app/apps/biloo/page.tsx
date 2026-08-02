import type { Metadata } from "next";

import { BilooCustomerApp } from "@/components/biloo/customer-app-v2";

export const metadata: Metadata = {
  title: "Biloo | Everything you need, delivered",
  description:
    "Book rides and order food, groceries, construction materials, and car parts through Biloo.",
};

export default function BilooAppPage() {
  return <BilooCustomerApp />;
}
