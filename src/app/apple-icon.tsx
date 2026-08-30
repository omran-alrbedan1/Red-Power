import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(180deg, #171717 0%, #050505 100%)",
          borderRadius: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "14px",
            borderRadius: "30px",
            border: "2px solid rgba(255,255,255,0.14)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "132px",
            height: "132px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(255,66,77,0.45) 0%, rgba(255,66,77,0) 72%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "4px",
            color: "#ffffff",
            fontWeight: 800,
            letterSpacing: "-0.06em",
          }}
        >
          <span style={{ fontSize: 78, color: "#ff4a54" }}>R</span>
          <span style={{ fontSize: 78 }}>P</span>
        </div>
      </div>
    ),
    size
  );
}
