const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@nightquest.it";
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#";
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL ?? "#";

export default function FooterSection({ cityName }: { cityName: string }) {
  return (
    <footer
      className="relative py-20 px-6 border-t"
      style={{ borderColor: "var(--night-border)" }}
      aria-label="Footer"
    >
      <div className="mx-auto max-w-5xl flex flex-col items-center text-center gap-8">
        {/* Logo */}
        <span
          className="font-serif font-light italic text-ink-tertiary tracking-widest"
          style={{ fontSize: "1.125rem", letterSpacing: "0.3em" }}
        >
          NightQuest
        </span>

        {/* Tagline */}
        <p
          className="font-serif font-light italic text-ink-whisper"
          style={{ fontSize: "0.9375rem" }}
        >
          In costruzione. A {cityName}. Estate 2026.
        </p>

        {/* Links */}
        <nav
          aria-label="Link footer"
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          <a
            href="/privacy"
            className="label-ui hover:text-ink-secondary transition-colors duration-300"
            style={{ color: "var(--ink-tertiary)" }}
          >
            privacy
          </a>
          <span className="label-ui" style={{ color: "var(--ink-whisper)" }} aria-hidden="true">
            &middot;
          </span>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="label-ui hover:text-ink-secondary transition-colors duration-300"
            style={{ color: "var(--ink-tertiary)" }}
          >
            scrivimi
          </a>
          <span className="label-ui" style={{ color: "var(--ink-whisper)" }} aria-hidden="true">
            &middot;
          </span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label-ui hover:text-ink-secondary transition-colors duration-300"
            style={{ color: "var(--ink-tertiary)" }}
          >
            instagram
          </a>
          <span className="label-ui" style={{ color: "var(--ink-whisper)" }} aria-hidden="true">
            &middot;
          </span>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label-ui hover:text-ink-secondary transition-colors duration-300"
            style={{ color: "var(--ink-tertiary)" }}
          >
            tiktok
          </a>
        </nav>

        {/* Copyright */}
        <p
          className="label-ui"
          style={{ color: "var(--ink-whisper)", fontSize: "0.6875rem" }}
        >
          &copy; 2026 NightQuest &mdash; ogni notte ha occhi
        </p>
      </div>
    </footer>
  );
}
