"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroSection({ subtitle, heroVideo, heroPoster }: { subtitle: string; heroVideo: string; heroPoster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-svh min-h-[600px] flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster}
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,5,7,0.55) 0%, rgba(5,5,7,0.62) 60%, rgba(5,5,7,0.85) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(5,5,7,0.72) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Top-right waitlist link */}
      <div className="absolute top-8 right-8 z-20">
        <a
          href="#waitlist"
          onClick={scrollToWaitlist}
          className="label-ui text-ink-tertiary hover:text-ink-secondary transition-colors duration-400 tracking-widest"
        >
          lista d&apos;attesa →
        </a>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo wordmark */}
        <div
          className={`mb-10 transition-all duration-1200 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <span
            className="font-serif font-light italic text-ink-primary tracking-widest"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", letterSpacing: "0.35em" }}
          >
            NightQuest
          </span>
        </div>

        {/* Main headline */}
        <h1
          className={`font-serif font-light italic text-ink-primary text-balance transition-all duration-1200 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            lineHeight: "1.08",
            transitionDelay: "200ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          &#8220;La notte ha occhi.&#8221;
          <TypingCursor visible={mounted} />
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 font-serif font-light italic text-ink-secondary transition-all duration-1200 ${
            mounted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            letterSpacing: "0.08em",
            transitionDelay: "500ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-all duration-1200 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transitionDelay: "900ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-hidden="true"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-ink-whisper" />
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          className="animate-scroll-bounce text-ink-whisper"
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}

function TypingCursor({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <span
      className="inline-block w-0.5 h-[0.85em] bg-ink-secondary ml-1 align-middle animate-blink"
      aria-hidden="true"
    />
  );
}
