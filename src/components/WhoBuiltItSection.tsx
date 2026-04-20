"use client";

import { useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@nightquest.it";

export default function WhoBuiltItSection() {
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
      id="chi-siamo"
      className="relative py-28 px-6"
      aria-label="Dietro NightQuest"
    >
      {/* Horizontal rule */}
      <div className="mx-auto max-w-[640px]">
        <div className="w-full h-px mb-20" style={{ background: "var(--night-border)" }} />

        {/* Label */}
        <div
          className={`mb-8 transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <span className="label-ui">Dietro NightQuest</span>
        </div>

        {/* Paragraphs */}
        <blockquote
          className={`transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            transitionDelay: "150ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <p
            className="font-serif font-normal italic text-ink-secondary leading-[1.75] mb-6"
            style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
          >
            &#8220;Sto costruendo NightQuest perché le città che amo perdono magia
            quando le vivo come turista. Volevo un modo di riscoprirle che fosse
            insieme narrativo, tecnologico e fisico. Non è un&apos;app, è un tentativo.&#8221;
          </p>

          <footer className="flex items-center gap-4">
            <cite
              className="font-serif font-light italic text-ink-tertiary"
              style={{ fontSize: "0.9375rem" }}
            >
              — Alberto
            </cite>
            <span
              className="text-ink-whisper"
              style={{ fontSize: "0.75rem" }}
              aria-hidden="true"
            >
              &middot;
            </span>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="label-ui hover:text-ink-secondary transition-colors duration-300"
              style={{ color: "var(--ink-tertiary)" }}
            >
              scrivimi
            </a>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
