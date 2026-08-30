import { ImageResponse } from "next/og";

export const size = {
  width: 256,
  height: 256,
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "18px",
            borderRadius: "42px",
            border: "3px solid rgba(255,255,255,0.14)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "190px",
            height: "190px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(255,66,77,0.45) 0%, rgba(255,66,77,0) 72%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "6px",
            color: "#ffffff",
            fontWeight: 800,
            letterSpacing: "-0.06em",
          }}
        >
          <span style={{ fontSize: 112, color: "#ff4a54" }}>R</span>
          <span style={{ fontSize: 112 }}>P</span>
        </div>
      </div>
    ),
    size
  );
}
