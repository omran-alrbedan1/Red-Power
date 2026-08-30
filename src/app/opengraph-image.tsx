import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const runtime = "nodejs";
export const alt = "Red Power Garage social preview image";

const backgroundData = await readFile(
  join(process.cwd(), "public/images/red-power/brand/og-share-background.png"),
  "base64"
);
const backgroundSrc = `data:image/png;base64,${backgroundData}`;

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
          position: "relative",
          padding: "56px",
          background: "#060606",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        <img
          src={backgroundSrc}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(4,4,4,0.92) 0%, rgba(4,4,4,0.82) 42%, rgba(4,4,4,0.34) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.16)",
                background:
                  "linear-gradient(180deg, rgba(255,68,78,0.95) 0%, rgba(143,10,20,0.95) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              RP
            </div>
            <div
              style={{
                fontSize: 26,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "#ff7a84",
              }}
            >
              {siteConfig.name}
            </div>
          </div>
          <div
            style={{
              maxWidth: 650,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div
              style={{
                fontSize: 72,
                lineHeight: 1.02,
                fontWeight: 800,
              }}
            >
              American Car Service, Diagnostics & Performance
            </div>
            <div
              style={{
                maxWidth: 620,
                fontSize: 28,
                lineHeight: 1.4,
                color: "#dedee3",
              }}
            >
              Premium workshop care for diagnostics, maintenance, mechanical,
              electrical, and Mopar-focused performance service.
            </div>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: "#ff7a84",
              }}
            >
              {siteConfig.arabicName}
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#d4d4d8",
              }}
            >
              {siteConfig.tagline}
            </div>
          </div>
          <div
            style={{
              padding: "12px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(12,12,12,0.52)",
              fontSize: 22,
              color: "#ffffff",
            }}
          >
            red-power.vercel.app
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: "44px",
            top: "42px",
            width: "180px",
            height: "180px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(255,82,94,0.32) 0%, rgba(255,82,94,0) 72%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-120px",
            bottom: "-120px",
            width: "420px",
            height: "420px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(163,16,28,0.42) 0%, rgba(163,16,28,0) 72%)",
          }}
        />
      </div>
    ),
    size
  );
}
