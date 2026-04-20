import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NightQuest",
  description: "",
  robots: { index: false, follow: false },
};

export default function CancelledPage() {
  return (
    <main className="min-h-svh flex flex-col items-center justify-center px-6 text-center">
      {/* Logo */}
      <span
        className="font-serif font-light italic text-ink-tertiary tracking-widest mb-16"
        style={{ fontSize: "1.125rem", letterSpacing: "0.3em" }}
      >
        NightQuest
      </span>

      {/* Message */}
      <div className="max-w-[480px]">
        <p
          className="font-serif font-light italic text-ink-primary text-balance leading-[1.3] mb-8"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
        >
          Hai scelto un&apos;altra notte.
        </p>
        <p
          className="font-serif font-light italic text-ink-secondary leading-[1.7] mb-12"
          style={{ fontSize: "clamp(1rem, 2vw, 1.125rem)" }}
        >
          Va bene. Torner&agrave;.
        </p>

        <div className="w-12 h-px mx-auto mb-12" style={{ background: "var(--night-border)" }} />

        <Link
          href="/"
          className="label-ui hover:text-ink-secondary transition-colors duration-300"
          style={{ color: "var(--ink-tertiary)" }}
        >
          ← torna alla landing
        </Link>
      </div>
    </main>
  );
}
