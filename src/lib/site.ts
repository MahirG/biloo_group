export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://biloogroups.com"
).replace(/\/$/, "");

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
