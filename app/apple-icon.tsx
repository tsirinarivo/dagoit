import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0a1628",
          borderRadius: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontWeight: 900,
          fontSize: 88,
          color: "#00E5FF",
          letterSpacing: "-4px",
        }}
      >
        D
      </div>
    ),
    { ...size }
  );
}
