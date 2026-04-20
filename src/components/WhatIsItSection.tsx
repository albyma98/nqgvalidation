"use client";

import { useEffect, useRef, useState } from "react";

interface Block {
  text: string;
}

const blocks: Block[] = [
  {
    text: "Cammini per Gallipoli seguendo le indicazioni di un'entità che conosce la città meglio di chi la abita. Ti chiama con il nome che le darai.",
  },
  {
    text: "Ogni tappa è un luogo reale. Ogni domanda va cercata nel posto, non sul telefono. Ogni frase è pensata perché tu la ricordi.",
  },
  {
    text: "Dura circa un'ora e mezza. Si vive camminando, con uno o con gli amici. Alla fine qualcosa resta, anche se non sai spiegare bene cosa.",
  },
];

export default function WhatIsItSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="cos-e"
      className="relative py-32 px-6"
      aria-label="Cos'è NightQuest"
    >
      <div className="mx-auto max-w-[640px]">
        {/* Label */}
        <div
          className={`mb-10 transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <span className="label-ui">Un&apos;esperienza notturna</span>
        </div>

        {/* Main title */}
        <h2
          className={`font-serif font-normal italic text-ink-primary text-balance leading-[1.25] mb-16 transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
            transitionDelay: "150ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Non è un tour. Non è un gioco. È una presenza che ti guida nella
          città, di notte.
        </h2>

        {/* Blocks */}
        <div className="flex flex-col gap-0">
          {blocks.map((block, i) => (
            <div key={i}>
              <p
                className={`text-ink-secondary leading-[1.75] transition-all duration-[1200ms] ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{
                  fontSize: "clamp(0.9375rem, 1.8vw, 1.0625rem)",
                  transitionDelay: `${(i + 2) * 150}ms`,
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {block.text}
              </p>
              {i < blocks.length - 1 && (
                <div className="my-8 w-full h-px bg-night-border opacity-50" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
