"use client";

import { useState } from "react";

const WALLPAPER = "/images/homeopathy-wallpaper.png";

/**
 * Full-viewport photo background with overlay. If the image is missing from `/public`,
 * the gradient base still shows so the site never breaks.
 */
export function WallpaperBackground() {
  const [showPhoto, setShowPhoto] = useState(true);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-clinic-cream via-clinic-paper to-[#e8e0d6]"
      aria-hidden
    >
      {showPhoto && (
        <div className="absolute inset-0">
          {/* Native img so a missing /public file fails gracefully (next/image errors hard in dev). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={WALLPAPER}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setShowPhoto(false)}
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfcfa]/90 via-[#f7f4ef]/78 to-[#efe9e0]/88" />
      <div className="absolute inset-0 bg-clinic-sage/[0.03]" />
    </div>
  );
}
