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
          position: "relative",
        }}
      >
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
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00E5FF", display: "flex" }} />
          <span style={{ color: "#00E5FF", fontSize: 18, fontWeight: 600 }}>DAGO IT — Madagascar</span>
        </div>

        {/* Title line 1 */}
        <div style={{ fontSize: 68, fontWeight: 900, color: "#ffffff", lineHeight: 1.05, marginBottom: 8, display: "flex" }}>
          Géolocalisation GPS
        </div>

        {/* Title line 2 */}
        <div style={{ fontSize: 68, fontWeight: 900, color: "#00E5FF", lineHeight: 1.05, marginBottom: 28, display: "flex" }}>
          & Solutions Tech
        </div>

        {/* Description */}
        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.6)", maxWidth: 700, lineHeight: 1.4, display: "flex" }}>
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
            display: "flex",
          }}
        >
          dago-it.com
        </div>
      </div>
    ),
    { ...size }
  );
}
