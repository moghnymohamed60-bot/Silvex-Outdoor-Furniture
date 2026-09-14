export interface OrderConfirmationEmailData {
  orderNumber: string;
  customerName?: string;
  email: string;
  createdAt: string;
  items: Array<{
    title: string;
    finish?: string;
    fabric?: string;
    includeCover?: boolean;
    quantity: number;
    price: number;
    image?: string;
  }>;
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
  totalAmount: number;
  shippingMethod: string;
  shippingAddress?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

export function renderOrderConfirmationEmail(data: OrderConfirmationEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Order Confirmed: Silvex Outdoor Furniture (#${data.orderNumber})`;

  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 16px 0; border-bottom: 1px solid #E7E5E4; vertical-align: top;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              ${
                item.image
                  ? `<td width="90" style="vertical-align: top; padding-right: 16px;">
                      <img src="${item.image}" alt="${item.title}" width="80" height="80" style="display: block; border-radius: 8px; object-fit: cover; border: 1px solid #E7E5E4;" />
                    </td>`
                  : ''
              }
              <td style="vertical-align: top;">
                <p style="margin: 0 0 4px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 15px; font-weight: bold; color: #1C1917;">
                  ${item.title}
                </p>
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #78716C;">
                  ${item.finish ? `Finish: <strong>${item.finish}</strong>` : ''}
                  ${item.fabric ? ` | Fabric: <strong>${item.fabric}</strong>` : ''}
                </p>
                ${
                  item.includeCover
                    ? `<p style="margin: 0; font-size: 11px; color: #0E2B1E; font-weight: 600;">
                        + Includes Custom All-Weather Fitted Cover
                      </p>`
                    : ''
                }
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #78716C;">
                  Qty: ${item.quantity} &times; $${item.price.toLocaleString()}
                </p>
              </td>
              <td align="right" style="vertical-align: top; font-size: 14px; font-weight: 700; color: #1C1917;">
                $${(item.price * item.quantity).toLocaleString()}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    `
    )
    .join('');

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
            <td style="background-color: #0E2B1E; padding: 36px 32px; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #D4AF37; font-weight: 700;">
                Architectural Outdoor Living
              </p>
              <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; font-weight: 700;">
                SILVEX
              </h1>
            </td>
          </tr>

          <!-- Confirmation Hero -->
          <tr>
            <td style="padding: 36px 32px 24px 32px; text-align: center; border-bottom: 1px solid #F5F5F4;">
              <div style="display: inline-block; width: 48px; height: 48px; line-height: 48px; border-radius: 50%; background-color: #ECFDF5; color: #059669; font-size: 24px; font-weight: bold; margin-bottom: 16px;">
                &#10003;
              </div>
              <h2 style="margin: 0 0 8px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 22px; color: #1C1917; font-weight: 700;">
                Thank You for Your Order
              </h2>
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #57534E; line-height: 1.5;">
                We have received order <strong style="color: #0E2B1E;">#${data.orderNumber}</strong>. Our master craftsmen and logistics team are now preparing your outdoor living pieces.
              </p>
              <div style="display: inline-block; padding: 6px 14px; background-color: #F5F5F4; border-radius: 9999px; font-size: 12px; color: #44403C; font-weight: 600;">
                Service Tier: ${data.shippingMethod}
              </div>
            </td>
          </tr>

          <!-- Items Ordered Section -->
          <tr>
            <td style="padding: 24px 32px;">
              <h3 style="margin: 0 0 16px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #78716C; font-weight: 700;">
                Order Summary
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                ${itemsHtml}
              </table>
            </td>
          </tr>

          <!-- Financial Breakdown -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAFAF9; border-radius: 12px; padding: 18px; border: 1px solid #F5F5F4;">
                <tr>
                  <td style="padding: 4px 0; font-size: 13px; color: #78716C;">Subtotal</td>
                  <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #1C1917;">$${data.subtotal.toLocaleString()}</td>
                </tr>
                ${
                  data.discountAmount > 0
                    ? `<tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #059669;">Promotional Privilege Discount</td>
                        <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #059669;">-$${data.discountAmount.toLocaleString()}</td>
                      </tr>`
                    : ''
                }
                <tr>
                  <td style="padding: 4px 0; font-size: 13px; color: #78716C;">Delivery & Installation</td>
                  <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #1C1917;">
                    ${data.shippingAmount === 0 ? '<span style="color: #059669;">Complimentary</span>' : `$${data.shippingAmount.toLocaleString()}`}
                  </td>
                </tr>
                ${
                  data.taxAmount > 0
                    ? `<tr>
                        <td style="padding: 4px 0; font-size: 13px; color: #78716C;">Estimated Sales Tax</td>
                        <td align="right" style="padding: 4px 0; font-size: 13px; font-weight: 600; color: #1C1917;">$${data.taxAmount.toLocaleString()}</td>
                      </tr>`
                    : ''
                }
                <tr>
                  <td style="padding: 12px 0 0 0; font-size: 15px; font-weight: 700; color: #1C1917; border-top: 1px solid #E7E5E4;">Total Investment</td>
                  <td align="right" style="padding: 12px 0 0 0; font-size: 18px; font-weight: 800; color: #0E2B1E; border-top: 1px solid #E7E5E4;">$${data.totalAmount.toLocaleString()}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Outdoor White Glove Delivery Advisory -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left: 3px solid #D4AF37; background-color: #FEFCE8; padding: 16px; border-radius: 4px;">
                <tr>
                  <td>
                    <h4 style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #854D0E;">
                      White Glove Outdoor Installation Protocol
                    </h4>
                    <p style="margin: 0; font-size: 12px; color: #713F12; line-height: 1.5;">
                      Our specialized installation crew will contact you 48 hours prior to delivery to verify terrace or garden access pathways, gate clearances, and placement coordinates. All protective packaging will be removed and recycled.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call to Action -->
          <tr>
            <td align="center" style="padding: 0 32px 36px 32px;">
              <a href="http://localhost:3000/order-tracking?orderId=${data.orderNumber}" style="display: inline-block; background-color: #0E2B1E; color: #FFFFFF; text-decoration: none; padding: 14px 32px; border-radius: 9999px; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; box-shadow: 0 4px 12px rgba(14,43,30,0.25);">
                Track Live Order Progress
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1C1917; padding: 28px 32px; text-align: center; color: #A8A29E; font-size: 11px; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; color: #E7E5E4; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                Silvex Outdoor Furniture Concierge
              </p>
              <p style="margin: 0 0 12px 0;">
                Grade-A Indonesian Teak &bull; 316 Marine Stainless Steel &bull; Sunbrella&reg; All-Weather Fabrics
              </p>
              <p style="margin: 0; color: #78716C;">
                Questions about your delivery? Contact our VIP Concierge at concierge@silvexoutdoor.com
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
Order Confirmation: #${data.orderNumber}
--------------------------------------------------
Thank you for your order. We are preparing your outdoor living pieces.

ORDER SUMMARY:
${data.items.map((i) => `- ${i.title} (${i.finish || 'Standard'} / ${i.fabric || 'Standard'}) x ${i.quantity} = $${(i.price * i.quantity).toLocaleString()}`).join('\n')}

Subtotal: $${data.subtotal.toLocaleString()}
Discount: -$${data.discountAmount.toLocaleString()}
Delivery: $${data.shippingAmount.toLocaleString()}
Total Amount: $${data.totalAmount.toLocaleString()}

Track your order: http://localhost:3000/order-tracking?orderId=${data.orderNumber}
Silvex Concierge: concierge@silvexoutdoor.com
  `.trim();

  return { subject, html, text };
}
