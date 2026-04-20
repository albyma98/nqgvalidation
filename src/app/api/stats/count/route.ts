import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    const [waitlistResult, preordersResult] = await Promise.all([
      supabaseAdmin
        .from("waitlist")
        .select("id", { count: "exact", head: true }),
      supabaseAdmin
        .from("preorders")
        .select("id", { count: "exact", head: true })
        .eq("status", "paid"),
    ]);

    return NextResponse.json(
      {
        waitlist: waitlistResult.count ?? 0,
        preorders: preordersResult.count ?? 0,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (err) {
    console.error("[stats/count]", err);
    return NextResponse.json({ waitlist: 0, preorders: 0 });
  }
}
