export interface OrderStatusUpdateEmailData {
  orderNumber: string;
  customerName?: string;
  email: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  previousStatus?: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  totalAmount: number;
}

export function renderOrderStatusUpdateEmail(data: OrderStatusUpdateEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const statusTitles: Record<string, { title: string; subtitle: string; color: string; bg: string }> = {
    CONFIRMED: {
      title: 'Order Confirmed',
      subtitle: 'Your architectural outdoor living pieces are queued for production and white-glove inspection.',
      color: '#059669',
      bg: '#ECFDF5',
    },
    PROCESSING: {
      title: 'In Preparation & Quality Inspection',
      subtitle: 'Our master craftsmen are applying marine-grade weatherproof finishing and testing all joinery.',
      color: '#D97706',
      bg: '#FFFBEB',
    },
    SHIPPED: {
      title: 'Dispatched for White Glove Delivery',
      subtitle: 'Your order is en route via specialized climate-controlled furniture transport.',
      color: '#2563EB',
      bg: '#EFF6FF',
    },
    DELIVERED: {
      title: 'Delivered & Installed',
      subtitle: 'Your Silvex outdoor pieces have been placed and installed in your exterior sanctuary.',
      color: '#0E2B1E',
      bg: '#F0FDF4',
    },
    CANCELLED: {
      title: 'Order Cancelled',
      subtitle: 'Your order has been cancelled and any processed funds have been refunded to your original payment method.',
      color: '#DC2626',
      bg: '#FEF2F2',
    },
  };

  const currentInfo = statusTitles[data.status] || {
    title: `Order Status: ${data.status}`,
    subtitle: 'Your order status has been updated.',
    color: '#0E2B1E',
    bg: '#F5F5F4',
  };

  const subject = `Update on Your Silvex Order #${data.orderNumber}: ${currentInfo.title}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F5F5F4; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #E7E5E4;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0E2B1E; padding: 32px; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #D4AF37; font-weight: 700;">
                Order Status Update
              </p>
              <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 26px; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; font-weight: 700;">
                SILVEX
              </h1>
            </td>
          </tr>

          <!-- Status Hero -->
          <tr>
            <td style="padding: 36px 32px 24px 32px; text-align: center; border-bottom: 1px solid #F5F5F4;">
              <div style="display: inline-block; padding: 8px 20px; border-radius: 9999px; background-color: ${currentInfo.bg}; color: ${currentInfo.color}; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">
                ${currentInfo.title}
              </div>
              <h2 style="margin: 0 0 8px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 20px; color: #1C1917; font-weight: 700;">
                Order #${data.orderNumber}
              </h2>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #57534E; line-height: 1.6; max-width: 460px; margin-left: auto; margin-right: auto;">
                ${currentInfo.subtitle}
              </p>
            </td>
          </tr>

          <!-- Tracking / Transit Details (if available) -->
          ${
            data.trackingNumber
              ? `
          <tr>
            <td style="padding: 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAFAF9; border-radius: 12px; padding: 20px; border: 1px solid #E7E5E4;">
                <tr>
                  <td>
                    <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #78716C; font-weight: 700;">
                      Carrier & Tracking Reference
                    </p>
                    <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: 700; color: #0E2B1E; font-family: monospace;">
                      ${data.trackingNumber}
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #57534E;">
                      Dedicated Freight: <strong>${data.carrier || 'Silvex Specialized White-Glove Logistics'}</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `
              : ''
          }

          <!-- Outdoor Care & Protection Reminder -->
          <tr>
            <td style="padding: 12px 32px 28px 32px;">
              <div style="background-color: #F5F5F4; border-radius: 12px; padding: 20px; border: 1px solid #E7E5E4;">
                <h4 style="margin: 0 0 8px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 14px; color: #1C1917; font-weight: 700;">
                  Preparing Your Outdoor Space
                </h4>
                <ul style="margin: 0; padding-left: 20px; font-size: 12px; color: #57534E; line-height: 1.6;">
                  <li>Ensure clear terrace, patio, or garden gate clearance for large-format sectionals and tables.</li>
                  <li>Grade-A SVLK Teak will gracefully develop a silver-grey patina over time, or can be sealed annually to preserve golden tones.</li>
                  <li>Sunbrella&reg; all-weather fabrics are engineered for stain and UV resistance—wipe with mild soap and warm water as needed.</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td align="center" style="padding: 0 32px 36px 32px;">
              <a href="http://localhost:3000/order-tracking?orderId=${data.orderNumber}" style="display: inline-block; background-color: #0E2B1E; color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 9999px; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; box-shadow: 0 4px 12px rgba(14,43,30,0.25);">
                View Full Order Details
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1C1917; padding: 24px 32px; text-align: center; color: #A8A29E; font-size: 11px; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; color: #E7E5E4; font-weight: 600;">
                Silvex Outdoor Furniture Concierge
              </p>
              <p style="margin: 0;">
                Need assistance with your delivery appointment? Email concierge@silvexoutdoor.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const text = `
SILVEX OUTDOOR FURNITURE
Order Update: #${data.orderNumber}
--------------------------------------------------
Status: ${currentInfo.title}
${currentInfo.subtitle}

${data.trackingNumber ? `Tracking Reference: ${data.trackingNumber} (${data.carrier || 'Silvex Logistics'})` : ''}

Track order online: http://localhost:3000/order-tracking?orderId=${data.orderNumber}
Concierge: concierge@silvexoutdoor.com
  `.trim();

  return { subject, html, text };
}
