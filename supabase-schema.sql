-- NightQuest — Schema Supabase
-- Esegui questo script nel SQL Editor del tuo progetto Supabase

-- =====================
-- TABELLA: waitlist
-- =====================
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  city_of_interest TEXT DEFAULT 'gallipoli'
);

CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist(created_at);

-- =====================
-- TABELLA: preorders
-- =====================
CREATE TABLE IF NOT EXISTS preorders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'eur',
  status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'refunded')),
  city TEXT DEFAULT 'gallipoli',
  access_code TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE,
  refunded_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS preorders_email_idx ON preorders(email);
CREATE INDEX IF NOT EXISTS preorders_status_idx ON preorders(status);
CREATE INDEX IF NOT EXISTS preorders_stripe_session_idx ON preorders(stripe_session_id);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

-- Abilita RLS su entrambe le tabelle
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE preorders ENABLE ROW LEVEL SECURITY;

-- waitlist: chiunque può inserire (anon key dal frontend), solo service role può leggere/modificare
CREATE POLICY "waitlist_insert_anon"
  ON waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- preorders: solo service role (backend Next.js) gestisce tutto
-- Il frontend non ha accesso diretto a preorders

-- Nota: le letture/aggiornamenti su entrambe le tabelle avvengono
-- esclusivamente via SUPABASE_SERVICE_ROLE_KEY nelle API routes Next.js,
-- che bypassa RLS per design.
