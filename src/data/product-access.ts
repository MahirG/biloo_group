export type ProductAccessId = "mezgeb" | "hisabtech";

export type ProductAccess = {
  id: ProductAccessId;
  name: string;
  shortName: string;
  description: string;
  productHref: string;
  appHref: string;
  dashboardHref: string;
  appLabel: string;
  dashboardLabel: string;
  platforms: readonly string[];
};

export const productAccess: readonly ProductAccess[] = [
  {
    id: "mezgeb",
    name: "Biloo Mezgeb",
    shortName: "Mezgeb",
    description:
      "A mobile-first Ethiopian business ledger for sales, expenses, Dube, receipts, inventory, and daily reporting.",
    productHref: "/mezgeb",
    appHref: "https://www.gulit.shop/app",
    dashboardHref: "https://www.gulit.shop/dashboard",
    appLabel: "Open Mezgeb app",
    dashboardLabel: "Mezgeb dashboard",
    platforms: ["Mobile web app", "Windows browser"],
  },
  {
    id: "hisabtech",
    name: "HisabTech ERP",
    shortName: "HisabTech",
    description:
      "The live finance and operations workspace for accounting, sales, inventory, purchasing, people, and reporting.",
    productHref: "/erp",
    appHref: "https://www.hisabtech.com",
    dashboardHref: "https://www.hisabtech.com/auth/login",
    appLabel: "Open HisabTech app",
    dashboardLabel: "HisabTech dashboard",
    platforms: ["Responsive web app", "Windows browser"],
  },
] as const;

export function getProductAccess(id: ProductAccessId) {
  const product = productAccess.find((item) => item.id === id);

  if (!product) {
    throw new Error(`Unknown product access id: ${id}`);
  }

  return product;
}
