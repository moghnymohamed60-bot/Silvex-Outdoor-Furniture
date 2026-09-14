import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getEmailConfig, saveEmailConfig } from '@/lib/email/config';

export async function GET() {
  try {
    const config = getEmailConfig();
    return NextResponse.json({
      success: true,
      data: {
        provider: config.provider,
        smtpService: config.smtpService || 'gmail',
        smtpHost: config.smtpHost || '',
        smtpPort: config.smtpPort || 587,
        smtpUser: config.smtpUser || '',
        smtpPassConfigured: Boolean(config.smtpPass),
        resendApiKeyConfigured: Boolean(config.resendApiKey),
        emailFrom: config.emailFrom || 'Silvex Outdoor <concierge@silvex-outdoor.com>',
        isVerified: config.isVerified || false,
        lastVerifiedAt: config.lastVerifiedAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      provider,
      smtpService,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass,
      resendApiKey,
      emailFrom,
    } = body;

    // 1. If provider is Gmail or custom SMTP, verify with Nodemailer
    if (provider === 'gmail' || smtpService === 'gmail') {
      if (!smtpUser || !smtpPass) {
        return NextResponse.json(
          { success: false, error: 'Gmail address and 16-character App Password are required.' },
          { status: 400 }
        );
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser.trim(),
          pass: smtpPass.trim().replace(/\s+/g, ''), // Strip spaces in 16-char app password
        },
      });

      try {
        await transporter.verify();
      } catch (verifyErr: any) {
        return NextResponse.json(
          {
            success: false,
            error: `Gmail verification failed: ${verifyErr.message}. Ensure 2-Step Verification is enabled and use an App Password (not your normal account password).`,
          },
          { status: 400 }
        );
      }

      const saved = saveEmailConfig({
        provider: 'gmail',
        smtpService: 'gmail',
        smtpUser: smtpUser.trim(),
        smtpPass: smtpPass.trim().replace(/\s+/g, ''),
        emailFrom: emailFrom || `Silvex Outdoor <${smtpUser.trim()}>`,
        isVerified: true,
        lastVerifiedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: `Gmail SMTP connected and verified! Real emails will now be delivered to recipient inboxes from ${smtpUser.trim()}.`,
        data: saved,
      });
    }

    if (provider === 'custom_smtp') {
      if (!smtpHost || !smtpUser || !smtpPass) {
        return NextResponse.json(
          { success: false, error: 'SMTP Host, User, and Password are required.' },
          { status: 400 }
        );
      }

      const port = smtpPort ? parseInt(smtpPort, 10) : 587;
      const transporter = nodemailer.createTransport({
        host: smtpHost.trim(),
        port,
        secure: port === 465,
        auth: {
          user: smtpUser.trim(),
          pass: smtpPass.trim(),
        },
      });

      try {
        await transporter.verify();
      } catch (verifyErr: any) {
        return NextResponse.json(
          { success: false, error: `SMTP verification failed: ${verifyErr.message}` },
          { status: 400 }
        );
      }

      const saved = saveEmailConfig({
        provider: 'custom_smtp',
        smtpHost: smtpHost.trim(),
        smtpPort: port,
        smtpUser: smtpUser.trim(),
        smtpPass: smtpPass.trim(),
        emailFrom: emailFrom || `Silvex Outdoor <${smtpUser.trim()}>`,
        isVerified: true,
        lastVerifiedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: 'Custom SMTP connected and verified successfully!',
        data: saved,
      });
    }

    if (provider === 'resend') {
      if (!resendApiKey) {
        return NextResponse.json(
          { success: false, error: 'Resend API Key is required.' },
          { status: 400 }
        );
      }

      const saved = saveEmailConfig({
        provider: 'resend',
        resendApiKey: resendApiKey.trim(),
        emailFrom: emailFrom || 'Silvex Outdoor <concierge@silvex-outdoor.com>',
        isVerified: true,
        lastVerifiedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        message: 'Resend API configuration saved successfully!',
        data: saved,
      });
    }

    if (provider === 'auto_test') {
      const saved = saveEmailConfig({
        provider: 'auto_test',
        isVerified: false,
      });
      return NextResponse.json({
        success: true,
        message: 'Switched to Auto-Provisioned Sandbox mode.',
        data: saved,
      });
    }

    return NextResponse.json({ success: false, error: 'Unknown provider' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
