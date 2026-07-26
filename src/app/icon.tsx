import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#0f172a",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div style={{ alignItems: "center", display: "flex", marginLeft: "4px" }}>
        <div
          style={{
            border: "5px solid white",
            borderRadius: "999px",
            height: "30px",
            width: "30px",
          }}
        />
        <div
          style={{
            border: "5px solid white",
            borderRadius: "999px",
            height: "30px",
            marginLeft: "-8px",
            width: "30px",
          }}
        />
      </div>
    </div>,
    size,
  );
}
