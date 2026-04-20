import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — NightQuest",
  description: "Informativa sulla privacy di NightQuest.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-svh px-6 py-20">
      <div className="mx-auto max-w-[680px]">
        {/* Back link */}
        <Link
          href="/"
          className="label-ui hover:text-ink-secondary transition-colors duration-300 block mb-16"
          style={{ color: "var(--ink-tertiary)" }}
        >
          ← nightquest.it
        </Link>

        {/* Logo */}
        <span
          className="font-serif font-light italic text-ink-tertiary tracking-widest block mb-12"
          style={{ fontSize: "1.125rem", letterSpacing: "0.3em" }}
        >
          NightQuest
        </span>

        <h1
          className="font-serif font-normal italic text-ink-primary mb-3"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
        >
          Privacy Policy
        </h1>
        <p
          className="text-ink-tertiary mb-12"
          style={{ fontSize: "0.8125rem" }}
        >
          Ultimo aggiornamento: aprile 2026
        </p>

        <div
          className="flex flex-col gap-10 text-ink-secondary leading-[1.75]"
          style={{ fontSize: "clamp(0.9375rem, 1.8vw, 1.0625rem)" }}
        >
          <Section title="Titolare del trattamento">
            <p>
              NightQuest, gestito da Alberto Marra, con indirizzo email{" "}
              <a
                href="mailto:hello@nightquest.it"
                className="text-ink-primary underline underline-offset-2 hover:text-ink-secondary transition-colors"
              >
                hello@nightquest.it
              </a>
              .
            </p>
          </Section>

          <Section title="Dati raccolti">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>Indirizzo email (per la lista d&apos;attesa e il pre-ordine)</li>
              <li>Timestamp di iscrizione</li>
              <li>Informazioni anonime sul browser (user agent)</li>
              <li>Pagina di provenienza (referrer) e parametri UTM</li>
              <li>
                Informazioni di pagamento — gestite interamente da Stripe, non
                archiviate dai nostri sistemi
              </li>
            </ul>
          </Section>

          <Section title="Finalità del trattamento">
            <p>
              I dati vengono raccolti esclusivamente per: notificare il lancio
              del prodotto (una singola email il 19 giugno 2026); gestire i
              pre-ordini simbolici; validare l&apos;interesse di mercato in forma
              aggregata e anonima.
            </p>
          </Section>

          <Section title="Base giuridica">
            <p>
              Il trattamento si basa sul consenso esplicito dell&apos;utente
              (opt-in volontario tramite il form). L&apos;utente pu&ograve; revocare il
              consenso in qualsiasi momento scrivendo a{" "}
              <a
                href="mailto:hello@nightquest.it"
                className="text-ink-primary underline underline-offset-2 hover:text-ink-secondary transition-colors"
              >
                hello@nightquest.it
              </a>
              .
            </p>
          </Section>

          <Section title="Conservazione dei dati">
            <p>
              I dati vengono conservati fino alla revoca del consenso da parte
              dell&apos;utente, o al termine della campagna di pre-lancio (31 dicembre
              2026), dopodiché vengono eliminati.
            </p>
          </Section>

          <Section title="Diritti degli interessati">
            <p>
              Hai diritto di accesso, rettifica, cancellazione, portabilità e
              opposizione al trattamento dei tuoi dati. Per esercitare questi
              diritti scrivi a{" "}
              <a
                href="mailto:hello@nightquest.it"
                className="text-ink-primary underline underline-offset-2 hover:text-ink-secondary transition-colors"
              >
                hello@nightquest.it
              </a>
              . Risponderemo entro 30 giorni.
            </p>
          </Section>

          <Section title="Responsabili esterni del trattamento">
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong className="text-ink-primary font-normal">Supabase</strong> — hosting del database (PostgreSQL). Dati
                conservati in EU.
              </li>
              <li>
                <strong className="text-ink-primary font-normal">Stripe</strong> — gestione dei pagamenti. I dati della carta
                non transitano per i nostri server.
              </li>
              <li>
                <strong className="text-ink-primary font-normal">Vercel</strong> — hosting dell&apos;applicazione web. Dati server
                in EU o USA con adeguate garanzie.
              </li>
              <li>
                <strong className="text-ink-primary font-normal">Plausible Analytics</strong> — analytics privacy-friendly,
                senza cookie, senza profilazione. Nessun dato personale
                trasferito a Plausible.
              </li>
            </ul>
          </Section>

          <Section title="Cookie">
            <p>
              Questo sito non utilizza cookie di profilazione o di tracciamento.
              Vengono utilizzati esclusivamente cookie tecnici necessari al
              funzionamento del servizio. Non è quindi richiesto il banner di
              consenso ai cookie ai sensi del GDPR.
            </p>
          </Section>

          <Section title="Trasferimento internazionale">
            <p>
              Alcuni dati potrebbero essere trasferiti al di fuori dell&apos;Unione
              Europea (es. server Vercel negli USA). In tali casi ci assicuriamo
              che il trasferimento avvenga nel rispetto delle clausole
              contrattuali standard approvate dalla Commissione Europea.
            </p>
          </Section>
        </div>

        <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--night-border)" }}>
          <Link
            href="/"
            className="label-ui hover:text-ink-secondary transition-colors duration-300"
            style={{ color: "var(--ink-tertiary)" }}
          >
            ← torna alla landing
          </Link>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2
        className="font-serif font-normal italic text-ink-primary mb-3"
        style={{ fontSize: "1.125rem" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
