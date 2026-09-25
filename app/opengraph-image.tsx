import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vineet Vardhan — Full-Stack Developer & Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#0B0C0E",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient radial accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201, 149, 82, 0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top bar with status chip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 16px",
              borderRadius: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#35B77A",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#CCCCCC",
                textTransform: "uppercase",
              }}
            >
              Available for 2026 Projects
            </span>
          </div>
          <span style={{ fontSize: "16px", color: "#888884" }}>
            vineetvardhan.dev
          </span>
        </div>

        {/* Center content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#F1F0EC",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Vineet Vardhan
          </h1>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 600,
              color: "#C99552",
              letterSpacing: "-0.01em",
            }}
          >
            Full-Stack Developer & Software Engineer
          </div>
          <p
            style={{
              fontSize: "20px",
              color: "#9A9A96",
              margin: "6px 0 0 0",
              lineHeight: 1.5,
              maxWidth: "850px",
            }}
          >
            Bespoke Websites • Custom PMS • Hospitality Booking Systems • SaaS Platforms
          </p>
        </div>

        {/* Bottom tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {["Next.js 14", "TypeScript", "Custom PMS", "Sanity CMS", "Supabase Postgres", "SEO & AIO"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#E2E1DD",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
