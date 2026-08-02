import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "BILOO — Everything, Delivered",
  description:
    "BILOO is a multi-service platform for food delivery, taxi booking, supermarket shopping, construction materials, and car parts.",
};

export default function BilooLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
