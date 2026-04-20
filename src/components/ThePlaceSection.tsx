"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ThePlaceSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="il-luogo"
      className="relative py-28 px-6"
      aria-label="Il luogo"
    >
      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <h2
          className={`font-serif font-light italic text-ink-primary mb-12 transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          A Gallipoli, d&apos;estate.
        </h2>

        <div className="grid md:grid-cols-[1fr_220px] gap-10 items-start">
          {/* Photo + caption */}
          <div
            className={`transition-all duration-[1200ms] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{
              transitionDelay: "150ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src="/images/gallipoli-night.jpg"
                alt="Vicolo notturno del centro storico di Gallipoli, muri bianchi illuminati"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 70vw"
                priority={false}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 60%, rgba(5,5,7,0.4) 100%)",
                }}
                aria-hidden="true"
              />
            </div>
            <p
              className="mt-4 text-ink-tertiary leading-relaxed"
              style={{ fontSize: "0.8125rem" }}
            >
              L&apos;esperienza si svolge tra la Fontana Greca, il Castello, i
              vicoli del centro storico e il lungomare. Si gioca dal tramonto in
              poi.
            </p>
          </div>

          {/* Coming soon cities */}
          <div
            className={`transition-all duration-[1200ms] md:pt-2 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
            style={{
              transitionDelay: "300ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div
              className="border-l pl-6"
              style={{ borderColor: "var(--night-border)" }}
            >
              <p
                className="label-ui mb-3"
                style={{ color: "var(--ink-tertiary)" }}
              >
                Prossime citt&agrave;
              </p>
              <p
                className="font-serif font-light italic text-ink-tertiary mb-2"
                style={{ fontSize: "1.0625rem" }}
              >
                Roma &middot; Ortigia &middot; Matera
              </p>
              <p className="label-ui" style={{ color: "var(--ink-whisper)" }}>
                in arrivo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
