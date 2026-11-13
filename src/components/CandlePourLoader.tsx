"use client";

import React, { useState, useEffect } from "react";

export function CandlePourLoader() {
  const [phase, setPhase] = useState<"pouring" | "setting" | "lighting" | "complete">("pouring");
  const [fillProgress, setFillProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  // Manage 2D animation progression
  useEffect(() => {
    // Keep returning visits instant
    const hasSeen = sessionStorage.getItem("aomira_intro_seen");
    if (hasSeen === "true") {
      setIsMounted(false);
      return;
    }

    // Freeze scroll while preloader is active
    document.body.style.overflow = "hidden";

    let start: number | null = null;
    const duration = 1350; // 1.35s pour fill

    let animFrame: number;
    const animateFill = (time: number) => {
      if (!start) start = time;
      const elapsed = time - start;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setFillProgress(progress);

      if (progress < 100) {
        animFrame = requestAnimationFrame(animateFill);
      } else {
        setPhase("setting");
      }
    };

    animFrame = requestAnimationFrame(animateFill);

    const timer1 = setTimeout(() => {
      setPhase("lighting");
    }, 1600);

    const timer2 = setTimeout(() => {
      setPhase("complete");
      setIsFadingOut(true);
      sessionStorage.setItem("aomira_intro_seen", "true");
    }, 2400);

    const timer3 = setTimeout(() => {
      setIsMounted(false);
      document.body.style.overflow = "";
    }, 2950);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    sessionStorage.setItem("aomira_intro_seen", "true");
    setIsFadingOut(true);
    setTimeout(() => {
      setIsMounted(false);
      document.body.style.overflow = "";
    }, 350);
  };

  if (!isMounted) return null;

  // Geometry calculations for 2D candle fill (inner height 115px, bottom at y=249)
  const maxWaxHeight = 115;
  const currentWaxHeight = (fillProgress / 100) * maxWaxHeight;
  const waxY = 249 - currentWaxHeight;
  const isPouring = phase === "pouring" && fillProgress < 98;
  const isFlameLit = phase === "lighting" || phase === "complete";

  // Formatted counter string: "001" to "100"
  const counterNumber = Math.round(fillProgress);
  const formattedCounter =
    counterNumber < 10
      ? `00${counterNumber}`
      : counterNumber < 100
      ? `0${counterNumber}`
      : "100";

  return (
    <div
      role="progressbar"
      aria-label="Aomira Atelier candle preparation sequence"
      aria-valuenow={counterNumber}
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-[#0a0a0a] text-white p-6 sm:p-10 select-none overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut ? "opacity-0 pointer-events-none scale-[1.02]" : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle tactile grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Architectural Corner Crosshair Crop Marks */}
      <div className="pointer-events-none absolute top-4 left-4 font-mono text-[11px] text-neutral-600 leading-none">
        +
      </div>
      <div className="pointer-events-none absolute top-4 right-4 font-mono text-[11px] text-neutral-600 leading-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[11px] text-neutral-600 leading-none">
        +
      </div>
      <div className="pointer-events-none absolute bottom-4 right-4 font-mono text-[11px] text-neutral-600 leading-none">
        +
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400">
        <div className="flex items-center space-x-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-white font-medium">AOMIRA ATELIER</span>
          <span className="text-neutral-600 hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline text-neutral-500">STUDIO BATCH NO. 04</span>
        </div>

        <button
          type="button"
          onClick={handleSkip}
          className="px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white text-neutral-300 hover:text-white transition-colors duration-200 text-[10px] tracking-widest uppercase focus:outline-none focus:ring-1 focus:ring-white"
        >
          [ ESC &bull; SKIP ]
        </button>
      </header>

      {/* Center 2D Aesthetic Vector Canvas */}
      <main className="relative z-10 my-auto flex flex-col items-center justify-center">
        <div className="relative w-64 h-72 sm:w-72 sm:h-80 flex items-center justify-center">
          <svg
            viewBox="0 0 260 300"
            className="w-full h-full select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Clip path matching the interior of the 2D glass tumbler */}
              <clipPath id="candleInner2D">
                <path d="M 76 111 L 76 242 C 76 247 80 249 86 249 L 174 249 C 180 249 184 247 184 242 L 184 111 Z" />
              </clipPath>
            </defs>

            {/* Calibration measurement tick marks (Apothecary volume scale) */}
            <g className="text-neutral-500 font-mono" stroke="#444444" strokeWidth="0.8">
              {/* 240g mark (100%) */}
              <line x1="64" y1="134" x2="74" y2="134" />
              <text x="58" y="136" textAnchor="end" fill="#666666" fontSize="6.5" stroke="none" fontFamily="monospace">
                240G
              </text>

              {/* 180g mark (75%) */}
              <line x1="66" y1="162" x2="74" y2="162" />
              <text x="58" y="164" textAnchor="end" fill="#666666" fontSize="6.5" stroke="none" fontFamily="monospace">
                180G
              </text>

              {/* 120g mark (50%) */}
              <line x1="64" y1="191" x2="74" y2="191" />
              <text x="58" y="193" textAnchor="end" fill="#666666" fontSize="6.5" stroke="none" fontFamily="monospace">
                120G
              </text>

              {/* 60g mark (25%) */}
              <line x1="66" y1="220" x2="74" y2="220" />
              <text x="58" y="222" textAnchor="end" fill="#666666" fontSize="6.5" stroke="none" fontFamily="monospace">
                60G
              </text>
            </g>

            {/* 2D Minimalist Pour Spout & Molten Stream */}
            {isPouring && (
              <g className="transition-opacity duration-300">
                {/* 2D Crucible / Pouring Pitcher Silhouette */}
                <path
                  d="M 50 48 L 78 44 L 86 78 L 46 78 Z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M 78 44 L 98 52 L 86 60 Z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <path
                  d="M 48 54 C 36 56 34 72 46 76"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />

                {/* 2D Animated Flow Stream */}
                <path
                  d="M 98 52 Q 118 78 130 134"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                  strokeDasharray="5 3"
                  className="animate-stream-2d"
                />
              </g>
            )}

            {/* Center Timber Wick (Crisp vertical axis) */}
            <line
              x1="130"
              y1="92"
              x2="130"
              y2="248"
              stroke="#555555"
              strokeWidth="1.5"
              strokeLinecap="square"
            />

            {/* Rising 2D Wax Pool (Monochromatic solid white fill with clean meniscus) */}
            <g clipPath="url(#candleInner2D)">
              {fillProgress > 0 && (
                <g>
                  {/* Rising liquid wax body */}
                  <rect
                    x="70"
                    y={waxY}
                    width="120"
                    height={currentWaxHeight + 10}
                    fill="#FFFFFF"
                  />
                  {/* Top meniscus line */}
                  <line
                    x1="76"
                    y1={waxY}
                    x2="184"
                    y2={waxY}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                </g>
              )}
            </g>

            {/* 2D Vessel Outline (Stark white architectural hairlines) */}
            <path
              d="M 75 110 L 75 242 C 75 248 80 250 86 250 L 174 250 C 180 250 185 248 185 242 L 185 110 Z"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />

            {/* Top rim line */}
            <line
              x1="72"
              y1="110"
              x2="188"
              y2="110"
              stroke="#FFFFFF"
              strokeWidth="1.4"
            />

            {/* 2D Minimalist Architectural Label on Vessel */}
            <g>
              <rect
                x="93"
                y="175"
                width="74"
                height="44"
                fill="#0A0A0A"
                stroke="#FFFFFF"
                strokeWidth="1"
                rx="2"
              />
              <text
                x="130"
                y="193"
                textAnchor="middle"
                fill="#FFFFFF"
                fontFamily="Georgia, serif"
                fontSize="8"
                letterSpacing="3"
                fontWeight="bold"
              >
                AOMIRA
              </text>
              <line
                x1="106"
                y1="198"
                x2="154"
                y2="198"
                stroke="#444444"
                strokeWidth="0.8"
              />
              <text
                x="130"
                y="209"
                textAnchor="middle"
                fill="#888888"
                fontFamily="system-ui, sans-serif"
                fontSize="5.5"
                letterSpacing="1.2"
              >
                SLOW FLAME
              </text>
            </g>

            {/* 2D Continuous Vector Line-Art Flame */}
            {isFlameLit && (
              <g className="animate-flame-2d" style={{ transformOrigin: "130px 92px" }}>
                {/* 2D Teardrop Outline Flame */}
                <path
                  d="M 130 58 C 121 73 121 84 125 89 C 127 91.5 130 92 130 92 C 130 92 133 91.5 135 89 C 139 84 139 73 130 58 Z"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                {/* 2D Inner Core Hairline */}
                <line
                  x1="130"
                  y1="75"
                  x2="130"
                  y2="86"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Brand Typographic Heading */}
        <div className="text-center mt-3">
          <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.3em] text-white uppercase font-light">
            A O M I R A
          </h2>
          <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase mt-2">
            {phase === "pouring" && "01 / POURING SUSTAINABLE SOY-COCONUT BLEND"}
            {phase === "setting" && "02 / SETTING PURE BOTANICAL MATRIX"}
            {phase === "lighting" && "03 / IGNITING CRACKLING TIMBER WICK"}
            {phase === "complete" && "04 / ATELIER AMBIANCE READY"}
          </p>
        </div>
      </main>

      {/* Bottom Telemetry Bar */}
      <footer className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-[11px] font-mono text-neutral-400">
        <div className="flex items-center space-x-2 tracking-widest text-[10px]">
          <span>45.5152° N, 122.6784° W</span>
          <span className="text-neutral-700">&bull;</span>
          <span>PORTLAND ATELIER</span>
        </div>

        {/* Minimalist 1px Precision Progress Line */}
        <div className="w-52 sm:w-72 h-[1px] bg-neutral-800 relative overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${fillProgress}%` }}
          />
        </div>

        {/* 3-Digit Monospace Counter */}
        <div className="tracking-widest text-neutral-300 font-medium">
          [ {formattedCounter}% CURATED ]
        </div>
      </footer>
    </div>
  );
}
