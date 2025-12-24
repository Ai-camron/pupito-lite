import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ChatMessage {
  message: string;
  userEmail?: string;
  userName?: string;
  requestHuman?: boolean;
}

// Create email transporter (reusing config from other routes)
function createTransporter() {
  const emailProvider = process.env.EMAIL_PROVIDER || 'outlook';
  
  const emailConfigs = {
    gmail: {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    },
    outlook: {
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false,
        starttls: true,
      },
      requireTLS: true,
      authMethod: 'PLAIN',
    },
    'outlook-basic': {
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
    hostinger: {
      host: process.env.EMAIL_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  };

  const config = emailConfigs[emailProvider as keyof typeof emailConfigs];
  
  if (!config) {
    throw new Error(`Unsupported email provider: ${emailProvider}`);
  }

  return nodemailer.createTransport(config);
}

export async function POST(request: NextRequest) {
  try {
    const { message, userEmail, userName, requestHuman }: ChatMessage = await request.json();

    // Validate message
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // If user requests human help, send email notification
    if (requestHuman) {
      const provider = process.env.EMAIL_PROVIDER || 'outlook';
      const requiredEnvVars = (provider === 'gmail' || provider === 'outlook') 
        ? ['EMAIL_USER'] 
        : ['EMAIL_USER', 'EMAIL_PASSWORD'];
      
      const hasEmailConfig = requiredEnvVars.every(envVar => process.env[envVar]) && 
        (process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD);
      
      if (hasEmailConfig) {
        try {
          const transporter = createTransporter();
          await transporter.verify();
          
          const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER;
          
          await transporter.sendMail({
            from: `"PUPITO Chat Alert" <${process.env.EMAIL_USER}>`,
            to: notificationEmail,
            subject: '🤖➡️👨 PUPITO Chat: Human Assistance Requested',
            replyTo: userEmail || undefined,
            html: `
              <div style="background: #0D0D0D; color: white; padding: 30px 20px; font-family: 'Lato', 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px;">
                
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 25px;">
                  <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                    <div style="background: linear-gradient(135deg, #22d3ee, #0ea5e9); padding: 10px; border-radius: 10px; box-shadow: 0 0 25px rgba(34,211,238,0.35);">
                      <span style="font-size: 20px; font-weight: 900; color: black;">P</span>
                    </div>
                    <h1 style="color: #22d3ee; margin: 0; font-size: 24px; font-weight: 900; text-shadow: 0 0 15px rgba(34,211,238,0.45);">
                      PUPITO
                    </h1>
                  </div>
                  <h2 style="color: #FFD700; margin: 0; font-size: 20px; font-weight: 700;">
                    🤖➡️👨 Human Assistance Request
                  </h2>
                </div>

                <!-- Alert Box -->
                <div style="background: linear-gradient(135deg, #14b8a6, #FF8E53); padding: 3px; border-radius: 12px; margin: 25px 0;">
                  <div style="background: #1A1A1A; padding: 20px; border-radius: 9px; text-align: center;">
                    <h3 style="color: #14b8a6; margin: 0 0 10px 0; font-size: 18px;">⚠️ Priority Chat Request</h3>
                    <p style="color: white; margin: 0; font-size: 14px;">A customer has requested to speak with a human team member</p>
                  </div>
                </div>

                <!-- Customer Info -->
                <div style="background: linear-gradient(135deg, #22d3ee, #1E90FF); padding: 2px; border-radius: 12px; margin: 25px 0;">
                  <div style="background: #1A1A1A; padding: 20px; border-radius: 10px;">
                    <h3 style="color: #00FFFF; margin: 0 0 15px 0; font-size: 16px;">Customer Details:</h3>
                    
                    <div style="display: grid; gap: 10px;">
                      ${userName ? `
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <span style="color: #22d3ee; font-weight: 600;">👤 Name:</span>
                          <span style="color: white;">${userName}</span>
                        </div>
                      ` : ''}
                      
                      ${userEmail ? `
                        <div style="display: flex; align-items: center; gap: 10px;">
                          <span style="color: #22d3ee; font-weight: 600;">📧 Email:</span>
                          <a href="mailto:${userEmail}" style="color: #00FFFF; text-decoration: none;">${userEmail}</a>
                        </div>
                      ` : ''}
                      
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="color: #22d3ee; font-weight: 600;">🕒 Time:</span>
                        <span style="color: white; font-size: 14px;">${new Date().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Message Content -->
                <div style="background: linear-gradient(135deg, #FFD700, #14b8a6); padding: 2px; border-radius: 12px; margin: 25px 0;">
                  <div style="background: #1A1A1A; padding: 20px; border-radius: 10px;">
                    <h3 style="color: #FFD700; margin: 0 0 15px 0; font-size: 16px;">💬 Customer's Message:</h3>
                    <div style="background: #0D0D0D; padding: 15px; border-radius: 8px; border-left: 4px solid #22d3ee;">
                      <p style="color: white; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                    </div>
                  </div>
                </div>

                <!-- Action Required -->
                <div style="background: rgba(50,205,50,0.1); border: 2px solid #32CD32; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
                  <span style="color: #32CD32; font-weight: bold; font-size: 16px;">✨ ACTION REQUIRED</span>
                  <p style="color: #98FB98; margin: 8px 0 0 0; font-size: 14px;">Customer is waiting for human assistance in the chat</p>
                </div>

                <!-- Response Options -->
                <div style="text-align: center; margin: 25px 0;">
                  ${userEmail ? `
                    <a href="mailto:${userEmail}?subject=Re: PUPITO Chat Support" 
                       style="display: inline-block; background: linear-gradient(135deg, #22d3ee, #0ea5e9); color: black; padding: 12px 25px; border-radius: 20px; text-decoration: none; font-weight: bold; margin: 5px; box-shadow: 0 0 20px rgba(34,211,238,0.35);">
                      📧 Reply via Email
                    </a>
                  ` : ''}
                  
                  <p style="color: #888; font-size: 12px; margin-top: 15px;">
                    💡 Tip: Respond quickly to maintain that legendary PUPITO customer experience!
                  </p>
                </div>

                <!-- Footer -->
                <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #333;">
                  <p style="color: #888; font-size: 12px; margin: 0;">
                    Sent from PUPITO Chat System • ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            `
          });
          
          console.log('Human assistance request sent to:', notificationEmail);
          
        } catch (emailError) {
          console.error('Failed to send human assistance notification:', emailError);
        }
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: requestHuman 
        ? 'Human assistance request sent! Our team will be with you shortly.' 
        : 'Message received',
      botResponse: requestHuman 
        ? "Perfect! I've notified our human team and they'll be with you in just a moment. In the meantime, feel free to tell me more about what you need help with! 🤝"
        : undefined
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}