import { NextRequest, NextResponse } from 'next/server';
import {
  getEmailLogs,
  sendEmail,
  sendOrderConfirmationEmail,
  sendOrderStatusUpdateEmail,
  sendHospitalityInquiryEmail,
} from '@/lib/email/service';
import { renderOrderConfirmationEmail } from '@/lib/email/templates/orderConfirmation';
import { renderOrderStatusUpdateEmail } from '@/lib/email/templates/orderStatusUpdate';
import { renderHospitalityInquiryEmail } from '@/lib/email/templates/hospitalityInquiry';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const previewType = searchParams.get('preview');

    const sampleOrder = {
      id: 'ord_sample_preview',
      orderNumber: 'SLV-94821',
      createdAt: new Date().toISOString(),
      email: 'client@resortestate.com',
      shippingAddress: {
        fullName: 'Alexander Wright',
        street: '1240 Ocean Drive, Penthouse Suite',
        city: 'Miami Beach',
        state: 'FL',
        postalCode: '33139',
        country: 'United States',
      },
      shippingMethod: 'White Glove Delivery & Professional Installation',
      items: [
        {
          title: 'Solara Teak Grand Outdoor Sectional',
          finish: 'Natural SVLK Indonesian Teak',
          fabric: 'Sunbrella Cast Sand All-Weather',
          includeCover: true,
          quantity: 1,
          price: 5490,
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
        },
        {
          title: 'Terra Mediterranean 8-Seater Dining Set',
          finish: 'Aged Weathered Grey Teak',
          fabric: 'Sunbrella Charcoal Linen',
          includeCover: true,
          quantity: 1,
          price: 4890,
          image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop',
        },
      ],
      subtotal: 10380,
      discountAmount: 1038,
      shippingAmount: 0,
      taxAmount: 654,
      totalAmount: 9996,
      status: 'SHIPPED',
      trackingNumber: 'SLX-FREIGHT-884920-US',
    };

    const sampleInquiry = {
      inquiryId: 'TRD-90214',
      contactName: 'Elena Rostova',
      companyName: 'Aman Resorts & Villas Design',
      email: 'elena.rostova@amanresorts.com',
      projectType: 'Luxury Hotel / Resort Rooftop & Poolside',
      projectLocation: 'Amalfi Coast, Italy — 36 Terrace Daybeds & 120 Dining Suites',
      estimatedVolume: 'Over $250,000 Contract',
      createdAt: new Date().toISOString(),
    };

    if (previewType === 'ORDER_CONFIRMATION') {
      const { html } = renderOrderConfirmationEmail(sampleOrder as any);
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    if (previewType === 'ORDER_STATUS_UPDATE') {
      const { html } = renderOrderStatusUpdateEmail(sampleOrder as any);
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    if (previewType === 'HOSPITALITY_INQUIRY') {
      const { html } = renderHospitalityInquiryEmail(sampleInquiry);
      return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
    }

    // Default: return email dispatch history logs and provider status
    const logs = getEmailLogs();
    const hasSmtp = Boolean((process.env.SMTP_USER && process.env.SMTP_PASS) || (process.env.SMTP_HOST && process.env.SMTP_USER));
    const hasResend = Boolean(process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('mock'));

    let activeProvider = 'Simulation Mode (Logged in Console/UI)';
    if (hasSmtp) {
      activeProvider = `SMTP (${process.env.SMTP_SERVICE || process.env.SMTP_HOST || 'Custom SMTP'})`;
    } else if (hasResend) {
      activeProvider = 'Resend API';
    }

    return NextResponse.json({
      success: true,
      count: logs.length,
      providerInfo: {
        activeProvider,
        hasSmtp,
        hasResend,
        fromAddress: process.env.EMAIL_FROM || process.env.SMTP_USER || 'concierge@silvex-outdoor.com',
      },
      data: logs,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, toEmail } = body;

    if (!toEmail) {
      return NextResponse.json(
        { success: false, error: 'Recipient email is required' },
        { status: 400 }
      );
    }

    let result;
    if (type === 'ORDER_CONFIRMATION') {
      result = await sendOrderConfirmationEmail({
        id: 'ord_test_dispatch',
        orderNumber: `SLV-${Math.floor(10000 + Math.random() * 90000)}`,
        createdAt: new Date().toISOString(),
        email: toEmail,
        shippingAddress: {
          fullName: 'Test VIP Collector',
          street: '742 Evergreen Terrace',
          city: 'Beverly Hills',
          state: 'CA',
          postalCode: '90210',
          country: 'United States',
        },
        shippingMethod: 'White Glove Delivery & Installation',
        items: [
          {
            title: 'Solara Teak Grand Outdoor Sectional',
            finish: 'Natural Grade-A Teak',
            fabric: 'Sunbrella Cast Sand All-Weather',
            includeCover: true,
            quantity: 1,
            price: 5490,
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
          },
        ],
        subtotal: 5490,
        discountAmount: 549,
        shippingAmount: 0,
        taxAmount: 345,
        totalAmount: 5286,
      });
    } else if (type === 'ORDER_STATUS_UPDATE') {
      result = await sendOrderStatusUpdateEmail({
        id: 'ord_test_dispatch',
        orderNumber: `SLV-${Math.floor(10000 + Math.random() * 90000)}`,
        email: toEmail,
        status: body.status || 'SHIPPED',
        trackingNumber: 'SLX-FREIGHT-992014-US',
        totalAmount: 5286,
      });
    } else if (type === 'HOSPITALITY_INQUIRY') {
      result = await sendHospitalityInquiryEmail({
        inquiryId: `TRD-${Math.floor(10000 + Math.random() * 90000)}`,
        contactName: 'Trade Specifier',
        companyName: 'Bespoke Outdoor Architects Studio',
        email: toEmail,
        projectType: 'Luxury Penthouse Terrace & Pool Deck',
        projectLocation: 'London, UK — High-rise Terrace Dining',
      });
    } else {
      result = await sendEmail({
        to: toEmail,
        subject: 'Silvex Outdoor Furniture: Direct Test Dispatch',
        html: `<p>This is a test email dispatched from the Silvex Executive Email Studio.</p>`,
        text: 'This is a test email dispatched from the Silvex Executive Email Studio.',
        type: 'TEST_EMAIL',
      });
    }

    if (!result.success && result.status === 'FAILED') {
      return NextResponse.json({
        success: false,
        error: `Delivery failed: ${result.error || 'Check your SMTP credentials or API key'}`,
        data: result,
      }, { status: 422 });
    }

    return NextResponse.json({
      success: true,
      message: result.status === 'SENT'
        ? `Email sent to ${toEmail} via ${result.provider || 'SMTP'}`
        : `Email simulation recorded for ${toEmail} (Configure SMTP in .env.local for inbox delivery)`,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
