import React from "react";

/**
 * Clean, Simple, Cool & Interesting Neo-Brutalist Architecture Background
 * 100% Static - No movement, No animations, No distractions.
 * Features:
 * 1. Warm Architectural Radial Atmospheric Depth (Subtle multi-stop ambient glow at top and bottom)
 * 2. Fine Neo-Brutalist Technical Micro-Grid & Dot-Lattice matrix
 * 3. Minimal Precision Corner Crosshairs (+) for a crisp engineering aesthetic
 * Absolute zero CPU/GPU overhead, crystal clear text and formula readability.
 */
export const MathBackground = React.memo(function MathBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* 1. Atmospheric Static Ambient Gradient Aura (Soft, warm, architectural) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 10%, var(--orb-1) 0%, transparent 45%),
            radial-gradient(circle at 85% 15%, var(--orb-2) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, var(--orb-3) 0%, transparent 50%)
          `,
        }}
      />

      {/* 2. Static Architectural Micro-Dot Matrix & Fine Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.6] dark:opacity-[0.4]"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(120, 130, 150, 0.22) 1px, transparent 1px),
            linear-gradient(to right, rgba(120, 130, 150, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120, 130, 150, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px, 112px 112px, 112px 112px",
        }}
      />

      {/* 3. Subtle Engineering Blueprint Corner Registration Marks (+) */}
      <div className="absolute top-20 start-6 font-mono text-[11px] font-black text-ink/15 dark:text-ink/25 select-none hidden lg:block">
        +
      </div>
      <div className="absolute top-20 end-6 font-mono text-[11px] font-black text-ink/15 dark:text-ink/25 select-none hidden lg:block">
        +
      </div>
      <div className="absolute bottom-16 start-6 font-mono text-[11px] font-black text-ink/15 dark:text-ink/25 select-none hidden lg:block">
        +
      </div>
      <div className="absolute bottom-16 end-6 font-mono text-[11px] font-black text-ink/15 dark:text-ink/25 select-none hidden lg:block">
        +
      </div>

      {/* 4. Soft Vignette Edge Falloff (Centers focus cleanly onto the study content) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 95% 85% at 50% 45%, transparent 45%, var(--bg) 98%)",
        }}
      />
    </div>
  );
});
