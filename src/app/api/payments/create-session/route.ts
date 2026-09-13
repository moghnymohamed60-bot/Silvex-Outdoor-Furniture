import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd', orderId, customerEmail } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid payment amount' }, { status: 400 });
    }

    // In a live production environment with valid STRIPE_SECRET_KEY, we initialize Stripe:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
    // const paymentIntent = await stripe.paymentIntents.create({ amount: Math.round(amount * 100), currency, metadata: { orderId } });

    // Mock Client Secret for seamless sandbox testing
    const mockClientSecret = `pi_mock_silvex_${Date.now()}_secret_${Math.random().toString(36).substring(2, 15)}`;

    return NextResponse.json({
      success: true,
      clientSecret: mockClientSecret,
      paymentIntentId: `pi_mock_${Date.now()}`,
      amount,
      currency,
      status: 'requires_payment_method',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
