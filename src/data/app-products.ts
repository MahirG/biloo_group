export type AppProductKey = "mezgeb" | "hisabtech";

export type AppProduct = {
  key: AppProductKey;
  name: string;
  shortName: string;
  platformName: string;
  descriptor: string;
  summary: string;
  status: string;
  pageHref: string;
  appHref: string;
  dashboardHref: string;
  accent: "mezgeb" | "erp";
};

export const appProducts: Record<AppProductKey, AppProduct> = {
  mezgeb: {
    key: "mezgeb",
    name: "Biloo Mezgeb",
    shortName: "Mezgeb",
    platformName: "Mezgeb",
    descriptor: "Mobile business ledger",
    summary:
      "Open the mobile-first ledger for sales, expenses, Dube, receipts, reports, and secure business workspaces.",
    status: "Supabase authentication and protected workspaces connected",
    pageHref: "/mezgeb",
    appHref: "https://www.gulit.shop/app",
    dashboardHref: "https://www.gulit.shop/dashboard",
    accent: "mezgeb",
  },
  hisabtech: {
    key: "hisabtech",
    name: "Biloo ERP",
    shortName: "HisabTech",
    platformName: "HisabTech ERP",
    descriptor: "Business operations platform",
    summary:
      "Open the current HisabTech ERP application for finance, sales, inventory, purchasing, people, and reporting.",
    status: "Existing HisabTech authentication and production workspace",
    pageHref: "/erp",
    appHref: "https://www.hisabtech.com",
    dashboardHref: "https://www.hisabtech.com/auth/login",
    accent: "erp",
  },
};

export const appProductList = [appProducts.mezgeb, appProducts.hisabtech];
