import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at top right, rgba(255,36,51,0.28), transparent 26%), linear-gradient(180deg, #111111 0%, #050505 100%)",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#ff616d",
            }}
          >
            Red Power Garage
          </div>
          <div
            style={{
              maxWidth: 860,
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 700,
            }}
          >
            Premium automotive performance and specialist service.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#d4d4d8",
          }}
        >
          <div>Performance • Precision • Trust</div>
          <div style={{ color: "#ffffff" }}>redpowergarage.com</div>
        </div>
      </div>
    ),
    size
  );
}
