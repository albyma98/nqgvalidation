"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

type State = "idle" | "loading" | "error";

export default function PreorderSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [count, setCount] = useState<number | null>(null);

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

  useEffect(() => {
    fetch("/api/stats/count")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.preorders === "number") setCount(d.preorders);
      })
      .catch(() => {});
  }, []);

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());

  const handlePreorder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Inserisci un indirizzo email valido per continuare.");
      return;
    }

    setState("loading");
    window.plausible?.("preorder-click", { props: { source: "section" } });

    try {
      const res = await fetch("/api/preorder/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Errore nel checkout");

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error ? err.message : "Qualcosa è andato storto. Riprova."
      );
    }
  };

  return (
    <section
      ref={ref}
      id="pre-ordine"
      className="relative py-32 px-6"
      aria-label="Pre-ordine"
    >
      {/* Top separator */}
      <div
        className="mx-auto max-w-[640px] mb-20 h-px"
        style={{ background: "var(--night-border)" }}
      />

      <div className="mx-auto max-w-[640px]">
        {/* Label */}
        <div
          className={`mb-8 transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <span className="label-ui">Pre-ordine</span>
        </div>

        {/* Title */}
        <h2
          className={`font-serif font-light italic text-ink-primary text-balance leading-[1.2] mb-8 transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            transitionDelay: "150ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Vuoi essere tra i primi?
        </h2>

        {/* Body text */}
        <p
          className={`text-ink-secondary leading-[1.75] mb-10 transition-all duration-[1200ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            fontSize: "clamp(0.9375rem, 1.8vw, 1.0625rem)",
            transitionDelay: "250ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Con 1€ ti riserviamo una notte a Gallipoli. Quando apriremo,
          riceverai una email con un codice personale: potrai usarlo per accedere
          all&apos;esperienza a 6,90€ invece di 9,90€. Se cambi idea, l&apos;euro ti
          viene rimborsato. Nessuna trappola.
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
          <form onSubmit={handlePreorder} noValidate>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <label htmlFor="preorder-email" className="sr-only">
                Il tuo indirizzo email
              </label>
              <input
                id="preorder-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="la-tua@email.it"
                className="input-night flex-1"
                inputMode="email"
                autoComplete="email"
                required
                disabled={state === "loading"}
                aria-describedby={error ? "preorder-error" : undefined}
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="btn-cta whitespace-nowrap"
                aria-label="Riserva la mia notte per 1 euro"
              >
                {state === "loading" ? (
                  <LoadingDots />
                ) : (
                  "Riserva la mia notte — 1€"
                )}
              </button>
            </div>

            {error && (
              <p
                id="preorder-error"
                role="alert"
                className="mt-2 text-red-400"
                style={{ fontSize: "0.8125rem" }}
              >
                {error}
              </p>
            )}
          </form>

          {/* Social proof counter */}
          {count !== null && count >= 5 && (
            <p
              className="mt-4 text-ink-tertiary"
              style={{ fontSize: "0.8125rem" }}
            >
              già riservata da{" "}
              <span className="text-ink-secondary">{count}</span>{" "}
              {count === 1 ? "persona" : "persone"}
            </p>
          )}

          {/* Trust signals */}
          <p
            className="mt-5 text-ink-whisper"
            style={{ fontSize: "0.75rem" }}
          >
            Pagamento sicuro tramite Stripe. Rimborso garantito entro 48h dalla
            richiesta.
          </p>
        </div>
      </div>
    </section>
  );
}

function LoadingDots() {
  return (
    <span className="flex items-center gap-1" aria-label="Caricamento">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1 h-1 rounded-full bg-ink-primary animate-blink"
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </span>
  );
}
