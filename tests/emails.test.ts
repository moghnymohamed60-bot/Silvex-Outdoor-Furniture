import { describe, it, expect } from 'vitest';
import { renderOrderConfirmationEmail } from '../src/lib/email/templates/orderConfirmation';
import { renderOrderStatusUpdateEmail } from '../src/lib/email/templates/orderStatusUpdate';
import { renderHospitalityInquiryEmail } from '../src/lib/email/templates/hospitalityInquiry';
import { sendEmail, sendOrderConfirmationEmail, getEmailLogs } from '../src/lib/email/service';

describe('Silvex Email Notification System', () => {
  it('renders order confirmation HTML with itemized specifications and white-glove notes', () => {
    const email = renderOrderConfirmationEmail({
      orderNumber: 'SLV-12345',
      customerName: 'Marcus Aurelius',
      email: 'marcus@villa.com',
      createdAt: '2026-09-14T00:00:00.000Z',
      items: [
        {
          title: 'Solara Teak Grand Sectional',
          finish: 'Natural Teak',
          fabric: 'Sunbrella Sand',
          includeCover: true,
          quantity: 1,
          price: 5490,
        },
      ],
      subtotal: 5490,
      discountAmount: 500,
      shippingAmount: 0,
      taxAmount: 300,
      totalAmount: 5290,
      shippingMethod: 'White Glove Delivery & Installation',
    });

    expect(email.subject).toContain('Order Confirmed');
    expect(email.subject).toContain('SLV-12345');
    expect(email.html).toContain('Solara Teak Grand Sectional');
    expect(email.html).toContain('Sunbrella Sand');
    expect(email.html).toContain('Includes Custom All-Weather Fitted Cover');
    expect(email.html).toContain('White Glove Outdoor Installation Protocol');
    expect(email.html).toContain('$5,290');
    expect(email.text).toContain('SLV-12345');
  });

  it('renders order status update email for SHIPPED and DELIVERED states', () => {
    const shippedEmail = renderOrderStatusUpdateEmail({
      orderNumber: 'SLV-99881',
      email: 'client@resort.com',
      status: 'SHIPPED',
      trackingNumber: 'SLX-TRACK-123456',
      carrier: 'Silvex White-Glove Specialized Logistics',
      totalAmount: 4890,
    });

    expect(shippedEmail.subject).toContain('Dispatched for White Glove Delivery');
    expect(shippedEmail.html).toContain('SLX-TRACK-123456');
    expect(shippedEmail.html).toContain('Preparing Your Outdoor Space');

    const deliveredEmail = renderOrderStatusUpdateEmail({
      orderNumber: 'SLV-99881',
      email: 'client@resort.com',
      status: 'DELIVERED',
      totalAmount: 4890,
    });

    expect(deliveredEmail.subject).toContain('Delivered & Installed');
    expect(deliveredEmail.html).toContain('placed and installed in your exterior sanctuary');
  });

  it('renders hospitality trade application inquiry email', () => {
    const inquiryEmail = renderHospitalityInquiryEmail({
      inquiryId: 'TRD-88219',
      contactName: 'Elena Rostova',
      companyName: 'Aman Resorts',
      email: 'elena@amanresorts.com',
      projectType: 'Luxury Hotel / Resort',
      projectLocation: 'Amalfi Coast, Italy',
      createdAt: '2026-09-14T00:00:00.000Z',
    });

    expect(inquiryEmail.subject).toContain('Trade & Contract Application Received: Aman Resorts');
    expect(inquiryEmail.html).toContain('TRD-88219');
    expect(inquiryEmail.html).toContain('Amalfi Coast, Italy');
    expect(inquiryEmail.html).toContain('24 business hours');
  });

  it('successfully dispatches email and records audit log entry', async () => {
    const initialLogCount = getEmailLogs().length;

    const res = await sendEmail({
      to: 'collector@silvex.com',
      subject: 'Test Dispatch',
      html: '<p>Test</p>',
      text: 'Test',
      type: 'TEST_EMAIL',
    });

    expect(res.success).toBe(true);
    expect(['SENT', 'SIMULATED']).toContain(res.status);
    expect(getEmailLogs().length).toBe(initialLogCount + 1);
    expect(getEmailLogs()[0].recipient).toBe('collector@silvex.com');
  });
});
