export interface HospitalityInquiryEmailData {
  inquiryId: string;
  contactName: string;
  companyName: string;
  email: string;
  phone?: string;
  projectType: string;
  projectLocation?: string;
  estimatedVolume?: string;
  createdAt: string;
}

export function renderHospitalityInquiryEmail(data: HospitalityInquiryEmailData): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `Silvex Trade & Contract Application Received: ${data.companyName}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F5F4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F5F5F4; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #E7E5E4;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #0E2B1E; padding: 36px 32px; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #D4AF37; font-weight: 700;">
                Contract & Hospitality Division
              </p>
              <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 26px; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; font-weight: 700;">
                SILVEX
              </h1>
            </td>
          </tr>

          <!-- Confirmation Hero -->
          <tr>
            <td style="padding: 36px 32px 24px 32px; text-align: center; border-bottom: 1px solid #F5F5F4;">
              <h2 style="margin: 0 0 8px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 22px; color: #1C1917; font-weight: 700;">
                Trade Application Confirmed
              </h2>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #57534E; line-height: 1.5;">
                Dear <strong>${data.contactName}</strong>, thank you for submitting a Trade & Contract partnership inquiry for <strong>${data.companyName}</strong>.
              </p>
              <p style="margin: 0; font-size: 13px; color: #78716C;">
                Reference ID: <strong style="color: #0E2B1E;">#${data.inquiryId}</strong>
              </p>
            </td>
          </tr>

          <!-- Inquiry Details Section -->
          <tr>
            <td style="padding: 24px 32px;">
              <h3 style="margin: 0 0 16px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #78716C; font-weight: 700;">
                Project Dossier Summary
              </h3>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #FAFAF9; border-radius: 12px; padding: 18px; border: 1px solid #E7E5E4; font-size: 13px;">
                <tr>
                  <td style="padding: 6px 0; color: #78716C; width: 40%;">Project Typology:</td>
                  <td style="padding: 6px 0; font-weight: 600; color: #1C1917;">${data.projectType}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #78716C;">Design Firm / Group:</td>
                  <td style="padding: 6px 0; font-weight: 600; color: #1C1917;">${data.companyName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #78716C;">Direct Email:</td>
                  <td style="padding: 6px 0; font-weight: 600; color: #1C1917;">${data.email}</td>
                </tr>
                ${
                  data.projectLocation
                    ? `<tr>
                        <td style="padding: 6px 0; color: #78716C;">Location / Scope:</td>
                        <td style="padding: 6px 0; font-weight: 600; color: #1C1917;">${data.projectLocation}</td>
                      </tr>`
                    : ''
                }
              </table>
            </td>
          </tr>

          <!-- Trade Privileges -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-left: 3px solid #D4AF37; background-color: #FEFCE8; padding: 16px; border-radius: 4px;">
                <tr>
                  <td>
                    <h4 style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #854D0E;">
                      What to Expect Next
                    </h4>
                    <p style="margin: 0; font-size: 12px; color: #713F12; line-height: 1.5;">
                      A dedicated Silvex Hospitality Account Director will contact you within <strong>24 business hours</strong> to deliver our complete Trade Specifier Catalog, commercial tiered pricing structure, and 3D CAD/Revit BIM model library.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1C1917; padding: 24px 32px; text-align: center; color: #A8A29E; font-size: 11px; line-height: 1.6;">
              <p style="margin: 0 0 6px 0; color: #E7E5E4; font-weight: 600;">
                Silvex Outdoor Furniture — Contract & Hospitality
              </p>
              <p style="margin: 0;">
                Direct Trade Desk: trade@silvexoutdoor.com | +1 (800) 555-SILVEX
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
SILVEX OUTDOOR FURNITURE — TRADE & CONTRACT
Application Reference: #${data.inquiryId}
--------------------------------------------------
Dear ${data.contactName},

Thank you for your inquiry on behalf of ${data.companyName} (${data.projectType}).
A dedicated Silvex Hospitality Director will review your project details and respond within 24 hours with trade pricing and CAD assets.

Trade Desk: trade@silvexoutdoor.com
  `.trim();

  return { subject, html, text };
}
