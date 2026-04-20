import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://nightquest.it";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-03-25.dahlia",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email: string = (body.email ?? "").trim().toLowerCase();

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Email non valida." }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data: preorder, error: insertError } = await supabaseAdmin
      .from("preorders")
      .insert({
        email,
        amount_cents: 100,
        currency: "eur",
        status: "pending",
        city: "gallipoli",
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("[preorder/create] supabase insert", insertError);
      return NextResponse.json({ error: "Errore interno." }, { status: 500 });
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: 100,
            product_data: {
              name: "NightQuest \u2014 Pre-ordine Gallipoli",
              description:
                "Riserva la tua notte. Rimborso garantito entro 48h dalla richiesta.",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${APP_URL}/confermato?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/cancellato`,
      metadata: {
        supabase_preorder_id: preorder.id,
        city: "gallipoli",
      },
    });

    await supabaseAdmin
      .from("preorders")
      .update({ stripe_session_id: session.id })
      .eq("id", preorder.id);

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err) {
    console.error("[preorder/create] unhandled", err);
    return NextResponse.json({ error: "Errore nel checkout." }, { status: 500 });
  }
}
