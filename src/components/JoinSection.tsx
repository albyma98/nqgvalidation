"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

type State = "idle" | "loading-waitlist" | "loading-preorder" | "done-waitlist" | "already" | "error";

interface Props {
  waitlistTitle: string;
  citySlug: string;
  cityName: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function JoinSection({ waitlistTitle, citySlug, cityName }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/api/stats/count")
      .then((r) => r.json())
      .then((d) => { if (typeof d.preorders === "number") setCount(d.preorders); })
      .catch(() => {});
  }, []);

  const validate = () => {
    if (!EMAIL_RE.test(email.trim())) {
      setError("Inserisci un indirizzo email valido.");
      return false;
    }
    setError("");
    return true;
  };

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState("loading-waitlist");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), city: citySlug, utm: getUtmParams() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setState(data.alreadyExists ? "already" : "done-waitlist");
      window.plausible?.("waitlist-submit", { props: { source: "join-section" } });
    } catch {
      setState("error");
      setError("Qualcosa è andato storto. Riprova.");
    }
  };

  const handlePreorder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState("loading-preorder");
    window.plausible?.("preorder-click", { props: { source: "join-section" } });

    try {
      const res = await fetch("/api/preorder/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), city: citySlug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Errore nel checkout. Riprova.");
    }
  };

  const isLoading = state === "loading-waitlist" || state === "loading-preorder";
  const isDone = state === "done-waitlist" || state === "already";

  return (
    <section
      ref={ref}
      id="waitlist"
      className="relative py-32 px-6"
      aria-label="Unirsi alla notte"
    >
      <div
        className="mx-auto max-w-[640px] pt-20 border-t"
        style={{ borderColor: "var(--night-border)" }}
      >
        {/* Label */}
        <div
          className={`mb-8 transition-all duration-[1200ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <span className="label-ui">Unirsi alla notte</span>
        </div>

        {/* Title */}
        <h2
          className={`font-serif font-light italic text-ink-primary text-balance leading-[1.2] mb-4 transition-all duration-[1200ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", transitionDelay: "150ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {waitlistTitle}
        </h2>

        {/* Subtitle */}
        <p
          className={`text-ink-tertiary mb-10 leading-relaxed transition-all duration-[1200ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ fontSize: "0.875rem", transitionDelay: "250ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          Nessun spam, nessuna newsletter, solo una singola email quando apriremo a {cityName}.
        </p>

        {/* Form */}
        <div
          className={`transition-all duration-[1200ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{ transitionDelay: "350ms", transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {isDone ? (
            <DoneMessage state={state} email={email} />
          ) : (
            <form noValidate>
              {/* Email input */}
              <div className="mb-4">
                <label htmlFor="join-email" className="sr-only">Il tuo indirizzo email</label>
                <input
                  id="join-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="la-tua@email.it"
                  className="input-night"
                  inputMode="email"
                  autoComplete="email"
                  required
                  disabled={isLoading}
                  aria-describedby={error ? "join-error" : undefined}
                />
              </div>

              {error && (
                <p id="join-error" role="alert" className="mb-4 text-red-400" style={{ fontSize: "0.8125rem" }}>
                  {error}
                </p>
              )}

              {/* Two buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <button
                    type="submit"
                    onClick={handleWaitlist}
                    disabled={isLoading}
                    className="btn-primary w-full"
                  >
                    {state === "loading-waitlist" ? <Dots /> : "Lasciami sapere"}
                  </button>
                  <p className="text-center text-ink-whisper" style={{ fontSize: "0.6875rem", letterSpacing: "0.05em" }}>
                    gratuito · una sola email
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <button
                    type="submit"
                    onClick={handlePreorder}
                    disabled={isLoading}
                    className="btn-cta w-full"
                    aria-label="Riserva la mia notte per 1 euro"
                  >
                    {state === "loading-preorder" ? <Dots /> : "Riserva la mia notte — 1€"}
                  </button>
                  <p className="text-center text-ink-whisper" style={{ fontSize: "0.6875rem", letterSpacing: "0.05em" }}>
                    accesso anticipato · rimborso garantito
                  </p>
                </div>
              </div>

              {/* Counter */}
              {count !== null && count >= 5 && (
                <p className="mt-5 text-ink-tertiary" style={{ fontSize: "0.8125rem" }}>
                  già riservata da <span className="text-ink-secondary">{count}</span> {count === 1 ? "persona" : "persone"}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function DoneMessage({ state, email }: { state: State; email: string }) {
  if (state === "already") {
    return (
      <p className="font-serif font-light italic text-ink-secondary" style={{ fontSize: "1.125rem" }}>
        Sei già nella notte.
      </p>
    );
  }
  const name = email.split("@")[0];
  return (
    <p className="font-serif font-light italic text-ink-secondary" style={{ fontSize: "1.125rem" }}>
      Ti abbiamo sentito. A presto, {name}.
    </p>
  );
}

function Dots() {
  return (
    <span className="flex items-center justify-center gap-1" aria-label="Caricamento">
      {[0, 1, 2].map((i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-current animate-blink" style={{ animationDelay: `${i * 200}ms` }} />
      ))}
    </span>
  );
}

function getUtmParams() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return { source: p.get("utm_source") ?? undefined, medium: p.get("utm_medium") ?? undefined, campaign: p.get("utm_campaign") ?? undefined };
}
