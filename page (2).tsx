import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const memberData = {
      name: session.customer_details?.name || 'Member',
      email: session.customer_details?.email || '',
      address: (session as any).shipping_details?.address || session.customer_details?.address,
      plan: session.mode === 'subscription' ? 'official_member' : 'single_vote',
      stripeCustomerId: session.customer as string,
      joinedAt: new Date().toISOString(),
    }

    console.log('New member:', memberData)

    // TODO: Save to Supabase
    // await supabase.from('members').insert(memberData)

    // TODO: Trigger welcome card fulfilment via The Card Network API
    // await triggerCardFulfilment(memberData)

    // TODO: Send welcome email via Beehiiv
    // await sendWelcomeEmail(memberData)

    console.log(`Welcome card queued for ${memberData.name} at ${JSON.stringify(memberData.address)}`)
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription cancelled:', subscription.customer)
    // TODO: Update member status in Supabase
  }

  return NextResponse.json({ received: true })
}
