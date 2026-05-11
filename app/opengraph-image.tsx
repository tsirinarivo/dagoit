import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 50%, #0b3a6f 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,229,255,0.1)",
            border: "1px solid rgba(0,229,255,0.3)",
            borderRadius: 24,
            padding: "6px 16px",
            marginBottom: 32,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00E5FF" }} />
          <span style={{ color: "#00E5FF", fontSize: 18, fontWeight: 600 }}>DAGO IT — Madagascar</span>
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.05,
            marginBottom: 24,
            maxWidth: 800,
          }}
        >
          Géolocalisation GPS &{" "}
          <span style={{ color: "#00E5FF" }}>Solutions Tech</span>
        </div>
        {/* Description */}
        <div style={{ fontSize: 28, color: "rgba(255,255,255,0.6)", maxWidth: 700, lineHeight: 1.4 }}>
          Suivez votre flotte en temps réel. Hébergement web. Alarmes. Antananarivo, Madagascar.
        </div>
        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            fontSize: 22,
            color: "rgba(255,255,255,0.35)",
            fontFamily: "monospace",
          }}
        >
          dago-it.com
        </div>
      </div>
    ),
    { ...size }
  );
}
