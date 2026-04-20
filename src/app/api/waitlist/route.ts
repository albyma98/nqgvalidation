import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: string = (body.email ?? "").trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Email non valida." }, { status: 400 });
    }

    const utm = body.utm ?? {};
    const userAgent = req.headers.get("user-agent") ?? undefined;
    const referrer = req.headers.get("referer") ?? undefined;

    const { error, data } = await getSupabaseAdmin()
      .from("waitlist")
      .insert({
        email,
        user_agent: userAgent,
        referrer,
        utm_source: utm.source ?? null,
        utm_medium: utm.medium ?? null,
        utm_campaign: utm.campaign ?? null,
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ success: true, alreadyExists: true });
      }
      console.error("[waitlist]", error);
      return NextResponse.json({ error: "Errore interno." }, { status: 500 });
    }

    return NextResponse.json({ success: true, alreadyExists: false, id: data.id });
  } catch (err) {
    console.error("[waitlist] unhandled", err);
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }
}
