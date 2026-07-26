export type ProductAppDestination = {
  id: "hisabtech" | "mezgeb";
  name: string;
  productLabel: string;
  description: string;
  hubHref: string;
  websiteHref: string;
  appHref: string;
  dashboardHref: string;
  signInHref: string;
};

export const productAppDestinations: ProductAppDestination[] = [
  {
    id: "hisabtech",
    name: "HisabTech",
    productLabel: "ERP workspace",
    description:
      "Finance, sales, inventory, purchasing, reporting, people, approvals, and governance.",
    hubHref: "/erp",
    websiteHref: "https://www.hisabtech.com",
    appHref:
      "https://www.hisabtech.com/auth/login?next=%2Fworkspace-home",
    dashboardHref: "https://www.hisabtech.com/workspace-home",
    signInHref:
      "https://www.hisabtech.com/auth/login?next=%2Fworkspace-home",
  },
  {
    id: "mezgeb",
    name: "Biloo Mezgeb",
    productLabel: "Mobile business ledger",
    description:
      "Sales, expenses, Dube credit, receipts, daily records, and business reporting.",
    hubHref: "/mezgeb",
    websiteHref: "https://www.gulit.shop",
    appHref: "https://www.gulit.shop/app",
    dashboardHref: "https://www.gulit.shop/dashboard",
    signInHref:
      "https://www.gulit.shop/auth/sign-in?next=%2Fdashboard",
  },
];

export function getProductAppDestination(id: ProductAppDestination["id"]) {
  const destination = productAppDestinations.find((item) => item.id === id);

  if (!destination) {
    throw new Error(`Unknown product app destination: ${id}`);
  }

  return destination;
}
