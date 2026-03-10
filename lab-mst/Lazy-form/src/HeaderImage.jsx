import { useMemo } from "react";

// A small decorative image loaded lazily via React.lazy / Suspense.
// Uses a stable remote image for demo purposes.
export default function HeaderImage() {
  const src = useMemo(
    () =>
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80",
    []
  );

  return (
    <div className="headerImage">
      <img
        src={src}
        alt="Abstract blurred portal background"
        loading="lazy"
        style={{
          width: "100%",
          borderRadius: 14,
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.1)",
        }}
      />
      <div className="headerImageOverlay">Portal</div>
    </div>
  );
}
