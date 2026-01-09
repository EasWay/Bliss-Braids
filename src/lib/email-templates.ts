import { BookingFormData } from './validation';

/**
 * Generates a professional HTML email template for booking notifications
 * Sent to the salon owner when a customer submits a booking request
 */
export function generateBookingEmailHTML(data: BookingFormData): string {
  // Format add-ons list
  const addOnsHTML = data.addOns.length > 0 
    ? data.addOns.map(addon => `
        <li style="margin: 5px 0; color: #374151;">
          ${addon.name} <span style="color: #F50057; font-weight: 600;">+${addon.price} GHS</span>
        </li>
      `).join('')
    : '<li style="color: #6B7280;">None selected</li>';

  // Calculate deposit amount (50 GHS fixed)
  const depositAmount = 50;

  // Format WhatsApp message for pre-filled link
  const whatsappMessage = encodeURIComponent(
    `Hi ${data.customerInfo.name}! Your booking request for ${data.serviceName} has been received. Please send ${depositAmount} GHS deposit via Mobile Money to confirm your appointment on ${data.date} at ${data.time}.`
  );

  // WhatsApp link with pre-filled message
  const whatsappLink = `https://wa.me/${data.customerInfo.whatsapp}?text=${whatsappMessage}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Booking Request - Bliss Braids</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  
  <!-- Email Container -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F3F4F6;">
    <tr>
      <td style="padding: 40px 20px;">
        
        <!-- Main Content Card -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #F50057 0%, #C51162 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                💅 New Booking Request
              </h1>
              <p style="margin: 10px 0 0 0; color: #FFFFFF; font-size: 16px; opacity: 0.95;">
                Bliss Braids Appointment System
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Alert Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #FEF2F7; border-left: 4px solid #F50057; border-radius: 6px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0; color: #831843; font-size: 14px; font-weight: 600;">
                      ⚡ Action Required: Contact customer to confirm availability
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Customer Details Section -->
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: 700; border-bottom: 2px solid #F50057; padding-bottom: 10px;">
                👤 Customer Details
              </h2>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 40%; color: #6B7280; font-size: 14px; font-weight: 600;">Name:</td>
                        <td style="color: #111827; font-size: 14px; font-weight: 500;">${data.customerInfo.name}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 40%; color: #6B7280; font-size: 14px; font-weight: 600;">WhatsApp:</td>
                        <td style="color: #F50057; font-size: 14px; font-weight: 600;">
                          <a href="${whatsappLink}" style="color: #F50057; text-decoration: none;">
                            ${data.customerInfo.whatsapp}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 40%; color: #6B7280; font-size: 14px; font-weight: 600;">Email:</td>
                        <td style="color: #111827; font-size: 14px;">
                          <a href="mailto:${data.customerInfo.email}" style="color: #111827; text-decoration: none;">
                            ${data.customerInfo.email}
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Service Details Section -->
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: 700; border-bottom: 2px solid #F50057; padding-bottom: 10px;">
                ✨ Service Details
              </h2>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 40%; color: #6B7280; font-size: 14px; font-weight: 600;">Style:</td>
                        <td style="color: #111827; font-size: 14px; font-weight: 600;">${data.serviceName}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 40%; color: #6B7280; font-size: 14px; font-weight: 600;">Size:</td>
                        <td style="color: #111827; font-size: 14px;">${data.sizeLabel}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 40%; color: #6B7280; font-size: 14px; font-weight: 600;">Length:</td>
                        <td style="color: #111827; font-size: 14px;">${data.lengthLabel}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 40%; color: #6B7280; font-size: 14px; font-weight: 600; vertical-align: top; padding-top: 4px;">Add-ons:</td>
                        <td style="color: #111827; font-size: 14px;">
                          <ul style="margin: 0; padding: 0 0 0 20px; list-style-type: disc;">
                            ${addOnsHTML}
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 40%; color: #6B7280; font-size: 14px; font-weight: 600;">Date & Time:</td>
                        <td style="color: #111827; font-size: 14px; font-weight: 600;">
                          📅 ${data.date} at ${data.time}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 40%; color: #6B7280; font-size: 14px; font-weight: 600;">Duration:</td>
                        <td style="color: #111827; font-size: 14px;">⏱️ ${data.estimatedDuration} hours</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${data.customerInfo.specialRequests ? `
                <tr>
                  <td style="padding: 12px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="width: 40%; color: #6B7280; font-size: 14px; font-weight: 600; vertical-align: top; padding-top: 4px;">Special Requests:</td>
                        <td style="color: #111827; font-size: 14px; background-color: #FEF2F7; padding: 12px; border-radius: 6px; border-left: 3px solid #F50057;">
                          ${data.customerInfo.specialRequests}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
              </table>
              
              <!-- Pricing Section -->
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: 700; border-bottom: 2px solid #F50057; padding-bottom: 10px;">
                💰 Pricing
              </h2>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F9FAFB; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6B7280; font-size: 16px; font-weight: 600;">Total Price:</td>
                              <td style="text-align: right; color: #F50057; font-size: 32px; font-weight: 700;">
                                ${data.totalPrice} GHS
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="border-top: 2px dashed #E5E7EB; padding-top: 12px;">
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                            <tr>
                              <td style="color: #6B7280; font-size: 14px;">Deposit Required:</td>
                              <td style="text-align: right; color: #111827; font-size: 18px; font-weight: 600;">
                                ${depositAmount} GHS
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- WhatsApp CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                <tr>
                  <td style="text-align: center; padding: 20px 0;">
                    <a href="${whatsappLink}" 
                       style="display: inline-block; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); color: #FFFFFF; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-size: 16px; font-weight: 700; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">
                      💬 Contact via WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Instructions Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F0FDF4; border: 1px solid #86EFAC; border-radius: 8px; margin-top: 20px;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 8px 0; color: #166534; font-size: 14px; font-weight: 700;">
                      📋 Next Steps:
                    </p>
                    <ol style="margin: 0; padding: 0 0 0 20px; color: #166534; font-size: 13px; line-height: 1.6;">
                      <li>Contact customer via WhatsApp to confirm availability</li>
                      <li>Send Mobile Money details for ${depositAmount} GHS deposit</li>
                      <li>Once deposit is received, share exact studio location</li>
                      <li>Add appointment to your calendar</li>
                    </ol>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0 0 8px 0; color: #6B7280; font-size: 13px;">
                This email was sent from your Bliss Braids booking system
              </p>
              <p style="margin: 0; color: #9CA3AF; font-size: 12px;">
                Booking ID: ${data.serviceId}-${Date.now()}
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
  `.trim();
}

/**
 * Generates a plain text version of the booking email
 * Used as fallback for email clients that don't support HTML
 */
export function generateBookingEmailText(data: BookingFormData): string {
  const addOnsList = data.addOns.length > 0
    ? data.addOns.map(addon => `  - ${addon.name} (+${addon.price} GHS)`).join('\n')
    : '  - None selected';

  const depositAmount = 50;

  return `
NEW BOOKING REQUEST - BLISS BRAIDS
===================================

CUSTOMER DETAILS
----------------
Name: ${data.customerInfo.name}
WhatsApp: ${data.customerInfo.whatsapp}
Email: ${data.customerInfo.email}

SERVICE DETAILS
---------------
Style: ${data.serviceName}
Size: ${data.sizeLabel}
Length: ${data.lengthLabel}
Add-ons:
${addOnsList}

APPOINTMENT
-----------
Date & Time: ${data.date} at ${data.time}
Duration: ${data.estimatedDuration} hours

${data.customerInfo.specialRequests ? `SPECIAL REQUESTS
----------------
${data.customerInfo.specialRequests}

` : ''}PRICING
-------
Total Price: ${data.totalPrice} GHS
Deposit Required: ${depositAmount} GHS

NEXT STEPS
----------
1. Contact customer via WhatsApp to confirm availability
2. Send Mobile Money details for ${depositAmount} GHS deposit
3. Once deposit is received, share exact studio location
4. Add appointment to your calendar

Contact customer: https://wa.me/${data.customerInfo.whatsapp}

---
Bliss Braids Booking System
Booking ID: ${data.serviceId}-${Date.now()}
  `.trim();
}
