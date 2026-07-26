import { ImageResponse } from "next/og";

export const alt = "Biloo Group — Technology built for generations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 80% 20%, #1e3a8a 0%, #0f172a 48%, #08101f 100%)",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "34px",
            width: "100%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: "22px" }}>
            <div
              style={{
                alignItems: "center",
                border: "4px solid rgba(255,255,255,0.9)",
                borderRadius: "999px",
                display: "flex",
                fontSize: "38px",
                fontWeight: 700,
                height: "84px",
                justifyContent: "center",
                letterSpacing: "-8px",
                paddingRight: "8px",
                width: "132px",
              }}
            >
              oo
            </div>
            <div style={{ fontSize: "42px", fontWeight: 650 }}>Biloo Group</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 700,
              letterSpacing: "-4px",
              lineHeight: 1.05,
              maxWidth: "980px",
            }}
          >
            Technology built for generations.
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.62)",
              display: "flex",
              fontSize: "26px",
            }}
          >
            Ethiopia-rooted. African context. Global standards.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
