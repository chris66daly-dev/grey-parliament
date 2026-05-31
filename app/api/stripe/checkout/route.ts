import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getSupabaseServerAuth } from "@/lib/supabase-server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" })

export async function POST(req: NextRequest) {
  const supabase = await getSupabaseServerAuth()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
  }

  const { questionId, vote } = await req.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "gbp",
        product_data: {
          name: "Grey Parliament — Cast Your Verdict",
          description: "80p goes to BBC Children in Need. 20p funds the platform. Once revenues are secured, 100% goes to Children in Need.",
        },
        unit_amount: 100,
      },
      quantity: 1,
    }],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/vote/success?question=${questionId}&vote=${vote}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/vote/${questionId}`,
    metadata: { userId: user.id, questionId, vote },
  })

  return NextResponse.json({ url: session.url })
}
