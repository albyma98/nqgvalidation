"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

type FormState = "idle" | "loading" | "success" | "already" | "error";

export default function WaitlistSection({ title, citySlug, cityName }: { title: string; citySlug: string; cityName: string }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

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

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Inserisci un indirizzo email valido.");
      return;
    }

    setState("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          utm: getUtmParams(),
          city: citySlug,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Errore sconosciuto");

      if (data.alreadyExists) {
        setState("already");
      } else {
        setState("success");
        window.plausible?.("waitlist-submit", { props: { source: "section" } });
      }
    } catch {
      setState("error");
      setError("Qualcosa è andato storto. Riprova tra poco.");
    }
  };

  return (
    <section
      ref={ref}
      id="waitlist"
      className="relative py-32 px-6"
      aria-label="Lista d'attesa"
    >
      <div className="mx-auto max-w-[560px]">
        {/* Label */}
        <div
          className={`mb-8 transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <span className="label-ui">Unirsi alla notte</span>
        </div>

        {/* Title */}
        <h2
          className={`font-serif font-light italic text-ink-primary text-balance leading-[1.2] mb-4 transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            transitionDelay: "150ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {title}
        </h2>

        {/* Subtitle */}
        <p
          className={`text-ink-tertiary mb-10 leading-relaxed transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            fontSize: "0.875rem",
            transitionDelay: "250ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Nessun spam, nessuna newsletter, solo una singola email il 19 giugno.
        </p>

        {/* Form */}
        <div
          className={`transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            transitionDelay: "350ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {state === "success" || state === "already" ? (
            <SuccessMessage state={state} email={email} />
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="waitlist-email" className="sr-only">
                  Il tuo indirizzo email
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua@email.it"
                  className="input-night flex-1"
                  inputMode="email"
                  autoComplete="email"
                  required
                  disabled={state === "loading"}
                  aria-describedby={error ? "waitlist-error" : undefined}
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="btn-primary whitespace-nowrap"
                  style={{ borderColor: "var(--ink-tertiary)" }}
                >
                  {state === "loading" ? (
                    <LoadingDots />
                  ) : (
                    "Lasciami sapere"
                  )}
                </button>
              </div>

              {error && (
                <p
                  id="waitlist-error"
                  role="alert"
                  className="mt-3 text-red-400"
                  style={{ fontSize: "0.8125rem" }}
                >
                  {error}
                </p>
              )}

              {state === "error" && !error && (
                <p
                  role="alert"
                  className="mt-3 text-red-400"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Qualcosa &egrave; andato storto. Riprova tra poco.
                </p>
              )}
            </form>
          )}

          <p
            className="mt-5 text-ink-whisper"
            style={{ fontSize: "0.75rem" }}
          >
            ti avvertiremo quando apriremo a {cityName}
          </p>
        </div>
      </div>
    </section>
  );
}

function SuccessMessage({
  state,
  email,
}: {
  state: "success" | "already";
  email: string;
}) {
  if (state === "already") {
    return (
      <p
        className="font-serif font-light italic text-ink-secondary"
        style={{ fontSize: "1.125rem" }}
      >
        Sei gi&agrave; nella notte.
      </p>
    );
  }

  const name = email.split("@")[0];
  return (
    <p
      className="font-serif font-light italic text-ink-secondary"
      style={{ fontSize: "1.125rem" }}
    >
      Ti abbiamo sentito. A presto, {name}.
    </p>
  );
}

function LoadingDots() {
  return (
    <span className="flex items-center gap-1" aria-label="Caricamento">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-ink-secondary animate-blink"
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </span>
  );
}

function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
  };
}
