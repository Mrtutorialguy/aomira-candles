"use client";

import React, { useState, useEffect } from "react";

export function CandlePourLoader() {
  const [phase, setPhase] = useState<"pouring" | "setting" | "lighting" | "complete">("pouring");
  const [fillProgress, setFillProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  // Manage animation progression
  useEffect(() => {
    // Check if user already saw intro this session to keep returning visits fast
    const hasSeen = sessionStorage.getItem("aomira_intro_seen");
    if (hasSeen === "true") {
      setIsMounted(false);
      return;
    }

    // Disable background scroll during loader
    document.body.style.overflow = "hidden";

    // Progress pour fill
    let start: number | null = null;
    const duration = 1200; // 1.2s to fill

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

    // Timeline steps
    const timer1 = setTimeout(() => {
      setPhase("lighting");
    }, 1500);

    const timer2 = setTimeout(() => {
      setPhase("complete");
      setIsFadingOut(true);
      sessionStorage.setItem("aomira_intro_seen", "true");
    }, 2300);

    const timer3 = setTimeout(() => {
      setIsMounted(false);
      document.body.style.overflow = "";
    }, 2850);

    // Escape key to skip immediately
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
    }, 400);
  };

  if (!isMounted) return null;

  // Calculate wax pool height in SVG units (max height 88px, bottom at y=260)
  const maxWaxHeight = 84;
  const currentWaxHeight = (fillProgress / 100) * maxWaxHeight;
  const waxY = 260 - currentWaxHeight;
  const isPouring = phase === "pouring" && fillProgress < 95;
  const isFlameLit = phase === "lighting" || phase === "complete";

  return (
    <div
      role="progressbar"
      aria-label="Pouring handcrafted candle"
      aria-valuenow={Math.round(fillProgress)}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fbf8f2] transition-opacity duration-500 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Subtle organic background grain */}
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />

      {/* Skip button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full border border-[#382c22]/15 bg-white/70 backdrop-blur-xs text-[11px] font-medium text-[#6b635c] hover:bg-[#f4eee3] hover:text-[#231f1c] transition-colors"
      >
        Skip Intro
      </button>

      {/* Animation Canvas */}
      <div className="relative w-72 h-80 flex items-center justify-center">
        <svg
          viewBox="0 0 320 340"
          className="w-full h-full drop-shadow-sm select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Molten wax stream gradient */}
            <linearGradient id="moltenStream" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FCD34D" />
              <stop offset="45%" stop-color="#F59E0B" />
              <stop offset="85%" stop-color="#D97706" />
              <stop offset="100%" stop-color="#C4682B" />
            </linearGradient>

            {/* Filled wax pool gradient */}
            <linearGradient id="waxPool" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FCE7B2" />
              <stop offset="25%" stop-color="#F5B963" />
              <stop offset="70%" stop-color="#D97736" />
              <stop offset="100%" stop-color="#9A4518" />
            </linearGradient>

            {/* Amber glass vessel gradient */}
            <linearGradient id="vesselGlass" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#6E3816" stop-opacity="0.35" />
              <stop offset="20%" stop-color="#A55420" stop-opacity="0.15" />
              <stop offset="80%" stop-color="#A55420" stop-opacity="0.15" />
              <stop offset="100%" stop-color="#6E3816" stop-opacity="0.35" />
            </linearGradient>

            {/* Flame gradients */}
            <radialGradient id="loaderFlameInner" cx="50%" cy="65%" r="50%">
              <stop offset="0%" stop-color="#FFFDF0" />
              <stop offset="35%" stop-color="#FDE047" />
              <stop offset="75%" stop-color="#EA580C" />
              <stop offset="100%" stop-color="#B91C1C" stop-opacity="0" />
            </radialGradient>

            <radialGradient id="loaderAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FDE68A" stop-opacity="0.6" />
              <stop offset="60%" stop-color="#FDE68A" stop-opacity="0.2" />
              <stop offset="100%" stop-color="#FDE68A" stop-opacity="0" />
            </radialGradient>

            {/* Clip path inside the tumbler vessel */}
            <clipPath id="tumblerInterior">
              <path d="M 116 166 L 119 256 C 119 264 127 270 137 270 L 183 270 C 193 270 201 264 201 256 L 204 166 Z" />
            </clipPath>
          </defs>

          {/* Candlelight warm glowing aura */}
          {isFlameLit && (
            <circle
              cx="160"
              cy="125"
              r="75"
              fill="url(#loaderAura)"
              className="animate-aura-pulse"
            />
          )}

          {/* Glass Vessel Base Shadow */}
          <ellipse
            cx="160"
            cy="274"
            rx="46"
            ry="7"
            fill="#231F1C"
            opacity="0.08"
          />

          {/* Molten Wax Pouring Pitcher (Tilting smoothly) */}
          <g
            className="transition-transform duration-500 ease-out"
            style={{
              transform: isPouring
                ? "translate(0px, 0px) rotate(26deg)"
                : "translate(-8px, -14px) rotate(0deg)",
              transformOrigin: "70px 60px",
            }}
          >
            {/* Pitcher body (Warm burnished brass) */}
            <path
              d="M 45 42 L 85 42 L 80 84 C 80 88 74 92 65 92 C 56 92 50 88 50 84 Z"
              fill="#9C6B30"
              stroke="#5C3B14"
              stroke-width="1.5"
            />
            {/* Pitcher Spout */}
            <path
              d="M 83 44 L 104 54 L 84 62 Z"
              fill="#B8803B"
              stroke="#5C3B14"
              stroke-width="1.2"
            />
            {/* Pitcher Handle */}
            <path
              d="M 46 50 C 30 50 30 76 48 80"
              fill="none"
              stroke="#5C3B14"
              stroke-width="2.5"
              stroke-linecap="round"
            />
          </g>

          {/* Molten Wax Stream (Pouring down) */}
          {isPouring && (
            <g className="animate-molten-shimmer">
              {/* Core golden stream */}
              <path
                d="M 103 62 Q 138 95 160 170 L 160 260 L 158 260 Q 135 98 101 64 Z"
                fill="url(#moltenStream)"
                opacity="0.95"
              />
              {/* Highlight stream accent */}
              <path
                d="M 103 63 Q 137 96 159 180"
                fill="none"
                stroke="#FFFBEB"
                stroke-width="1.2"
                stroke-linecap="round"
                opacity="0.8"
              />
            </g>
          )}

          {/* Glass Tumbler Vessel (Outer Wall) */}
          <path
            d="M 112 162 L 116 258 C 117 268 126 274 137 274 L 183 274 C 194 274 203 268 204 258 L 208 162 Z"
            fill="url(#vesselGlass)"
            stroke="#8A471C"
            stroke-width="1.8"
            stroke-linejoin="round"
          />

          {/* Liquid Wax Rising Inside Jar (Clipped to interior) */}
          <g clipPath="url(#tumblerInterior)">
            {/* Liquid Wax Body */}
            <rect
              x="110"
              y={waxY}
              width="100"
              height={currentWaxHeight + 20}
              fill="url(#waxPool)"
              className="transition-all duration-75 ease-linear"
            />

            {/* Liquid Meniscus / Wax Surface Ellipse */}
            {fillProgress > 4 && (
              <ellipse
                cx="160"
                cy={waxY}
                rx="42"
                ry="5"
                fill="#FEF3C7"
                stroke="#D97706"
                stroke-width="0.8"
              />
            )}
          </g>

          {/* Tumbler Glass Rim */}
          <ellipse
            cx="160"
            cy="162"
            rx="48"
            ry="9"
            fill="none"
            stroke="#6E3816"
            stroke-width="2"
          />
          <ellipse
            cx="160"
            cy="162"
            rx="45"
            ry="7.5"
            fill="none"
            stroke="#E69C5C"
            stroke-width="1"
            opacity="0.6"
          />

          {/* Wooden Timber Wick in the center */}
          <rect
            x="157"
            y="142"
            width="6"
            height="115"
            rx="1"
            fill="#3F2618"
            stroke="#26170E"
            stroke-width="0.75"
          />
          {/* Timber wick grain lines */}
          <line x1="159" y1="144" x2="159" y2="162" stroke="#5E3821" stroke-width="0.75" />
          <line x1="161" y1="144" x2="161" y2="162" stroke="#26170E" stroke-width="0.75" />

          {/* Flame (Ignites once wax is poured) */}
          {isFlameLit && (
            <g
              className="animate-flame-flicker"
              style={{
                transformOrigin: "160px 144px",
              }}
            >
              {/* Flame Outer & Core */}
              <path
                d="M 160 102 C 172 120 174 135 160 144 C 146 135 148 120 160 102 Z"
                fill="url(#loaderFlameInner)"
              />
              {/* Inner blue-white oxygen root */}
              <ellipse cx="160" cy="142" rx="3.5" ry="3" fill="#60A5FA" opacity="0.8" />
              <ellipse cx="160" cy="141" rx="2" ry="2" fill="#FFFFFF" />
            </g>
          )}

          {/* Vessel Label "AOMIRA" */}
          <rect
            x="132"
            y="198"
            width="56"
            height="46"
            rx="2"
            fill="#FDFBF7"
            stroke="#6E3816"
            stroke-width="0.8"
            opacity="0.95"
          />
          <text
            x="160"
            y="215"
            text-anchor="middle"
            font-family="Georgia, serif"
            font-size="7"
            letter-spacing="2.5"
            fill="#5A3215"
            font-weight="bold"
          >
            AOMIRA
          </text>
          <line x1="142" y1="220" x2="178" y2="220" stroke="#C4682B" stroke-width="0.6" />
          <text
            x="160"
            y="232"
            text-anchor="middle"
            font-family="sans-serif"
            font-size="4.8"
            letter-spacing="0.8"
            fill="#80624E"
          >
            NO. 01 / BOTANICAL
          </text>
        </svg>
      </div>

      {/* Brand & Progress Text */}
      <div className="mt-4 text-center space-y-2">
        <h2 className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-[#231f1c] uppercase font-semibold">
          Aomira
        </h2>
        <p className="text-xs tracking-wider uppercase text-[#8c7462] h-4 transition-opacity duration-300">
          {phase === "pouring" && "Tempering Botanical Soy Wax..."}
          {phase === "setting" && "Setting Crackling Timber Wick..."}
          {(phase === "lighting" || phase === "complete") && "Lighting First Burn..."}
        </p>

        {/* Minimalist progress bar */}
        <div className="w-40 mx-auto h-0.5 bg-[#e8ded3] rounded-full overflow-hidden mt-3">
          <div
            className="h-full bg-[#c4682b] transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${Math.min(100, fillProgress)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
