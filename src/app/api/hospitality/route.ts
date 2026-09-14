import { NextRequest, NextResponse } from 'next/server';
import { sendHospitalityInquiryEmail } from '@/lib/email/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.contactName || !body.companyName || !body.email || !body.projectType) {
      return NextResponse.json(
        { success: false, error: 'Contact Name, Company Name, Email, and Project Type are required' },
        { status: 400 }
      );
    }

    const inquiry = {
      id: `TRD-${Date.now().toString().slice(-6)}`,
      contactName: body.contactName,
      companyName: body.companyName,
      email: body.email,
      phone: body.phone || '',
      projectType: body.projectType,
      projectLocation: body.projectLocation || '',
      estimatedVolume: body.estimatedVolume || '',
      createdAt: new Date().toISOString(),
    };

    // Send VIP trade application acknowledgment email
    try {
      await sendHospitalityInquiryEmail(inquiry);
    } catch (emailErr) {
      console.error('[EmailService] Hospitality email error:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Trade inquiry received successfully. A Silvex Account Director will contact you within 24 hours.',
      data: inquiry,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
