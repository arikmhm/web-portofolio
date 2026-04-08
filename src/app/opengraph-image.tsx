import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muhammad Ariyanto — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#171717",
          color: "#ffffff",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Muhammad Ariyanto
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a3a3a3",
            marginTop: 16,
          }}
        >
          Software Engineer | Web Developer
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#525252",
            marginTop: 40,
          }}
        >
          arikmhm.dev
        </div>
      </div>
    ),
    { ...size },
  );
}
