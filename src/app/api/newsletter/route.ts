import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Create email list file path
const emailListPath = path.join(process.cwd(), 'data', 'email-list.json');

// Ensure data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read existing email list
async function readEmailList(): Promise<{ emails: string[], signups: Array<{email: string, date: string}> }> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(emailListPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { emails: [], signups: [] };
  }
}

// Save email list
async function saveEmailList(data: { emails: string[], signups: Array<{email: string, date: string}> }) {
  await ensureDataDirectory();
  await fs.writeFile(emailListPath, JSON.stringify(data, null, 2));
}

// Create email transporter with support for multiple providers
function createTransporter() {
  const emailProvider = process.env.EMAIL_PROVIDER || 'outlook';
  
  // Configuration for different email providers
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
      secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for 587
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
    const { email } = await request.json();

    // Validate email format
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Read current email list
    const emailData = await readEmailList();

    // Check if email already exists
    if (emailData.emails.includes(email.toLowerCase())) {
      return NextResponse.json(
        { error: 'Email already subscribed to the Pup Squad!' },
        { status: 409 }
      );
    }

    // Add email to list
    const newSignup = {
      email: email.toLowerCase(),
      date: new Date().toISOString(),
    };
    
    emailData.emails.push(newSignup.email);
    emailData.signups.push(newSignup);

    // Save updated list
    await saveEmailList(emailData);

    // Send notification email to you (if email credentials are configured)
    const provider = process.env.EMAIL_PROVIDER || 'outlook';
    const requiredEnvVars = (provider === 'gmail' || provider === 'outlook') 
      ? ['EMAIL_USER'] 
      : ['EMAIL_USER', 'EMAIL_PASSWORD'];
    
    const hasEmailConfig = requiredEnvVars.every(envVar => process.env[envVar]) && 
      (process.env.EMAIL_APP_PASSWORD || process.env.EMAIL_PASSWORD);
    
    if (hasEmailConfig) {
      try {
        const transporter = createTransporter();
        
        // Verify connection before sending
        await transporter.verify();
        
        const notificationEmail = process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER;
        
        await transporter.sendMail({
          from: `"PUPITO Squad Alerts" <${process.env.EMAIL_USER}>`,
          to: notificationEmail,
          subject: '🎯 New PUPITO Pup Squad Member!',
          html: `
            <div style="background: #0D0D0D; color: white; padding: 20px; font-family: 'Segoe UI', Arial, sans-serif; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #22d3ee; margin: 0; font-size: 24px; text-shadow: 0 0 10px rgba(34,211,238,0.45);">
                  PUPITO Pup Squad Alert! 🚀
                </h1>
              </div>
              
              <div style="background: linear-gradient(135deg, #22d3ee, #1E90FF); padding: 2px; border-radius: 8px; margin: 15px 0;">
                <div style="background: #1A1A1A; padding: 15px; border-radius: 6px;">
                  <h3 style="color: #FFD700; margin-top: 0;">New Squad Member Details:</h3>
                  <p style="margin: 8px 0;"><strong style="color: #00FFFF;">Email:</strong> <span style="color: #22d3ee;">${email}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #00FFFF;">Signup Date:</strong> ${new Date().toLocaleString()}</p>
                  <p style="margin: 8px 0;"><strong style="color: #00FFFF;">Total Squad Members:</strong> <span style="color: #32CD32; font-size: 18px; font-weight: bold;">${emailData.emails.length}</span></p>
                </div>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <p style="color: #32CD32; font-style: italic; font-size: 16px;">
                  Another anime fan joins the streetwear revolution! 🌟
                </p>
                <p style="color: #888; font-size: 12px; margin-top: 15px;">
                  Sent from your PUPITO website newsletter system
                </p>
              </div>
            </div>
          `
        });
        
        console.log('Email notification sent successfully to:', notificationEmail);
        
        // Send welcome email to the subscriber
        await transporter.sendMail({
          from: `"PUPITO Pup Squad" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: '🎉 Welcome to the PUPITO Pup Squad!',
          html: `
            <div style="background: #0D0D0D; color: white; padding: 40px 20px; font-family: 'Lato', 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              
              <!-- Header with Logo and Brand Title -->
              <div style="text-align: center; margin-bottom: 40px;">
                <!-- PUPITO Logo -->
                <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                  <div style="background: linear-gradient(135deg, #22d3ee, #0ea5e9); padding: 12px; border-radius: 12px; box-shadow: 0 0 30px rgba(34,211,238,0.35);">
                    <span style="font-size: 24px; font-weight: 900; color: black; font-family: 'Lato', 'Segoe UI', Arial, sans-serif;">P</span>
                  </div>
                  <div>
                    <h1 style="color: #22d3ee; margin: 0; font-size: 32px; font-weight: 900; font-family: 'Lato', 'Segoe UI', Arial, sans-serif; text-shadow: 0 0 20px rgba(34,211,238,0.45); letter-spacing: 1px;">
                      PUPITO
                    </h1>
                    <p style="color: #FFD700; font-size: 14px; margin: 2px 0 0 0; letter-spacing: 2px; font-weight: 600; font-family: 'Lato', 'Segoe UI', Arial, sans-serif;">
                      ANIME STREETWEAR
                    </p>
                  </div>
                </div>
              </div>

              <!-- Welcome Message -->
              <div style="background: linear-gradient(135deg, #22d3ee, #1E90FF); padding: 3px; border-radius: 16px; margin: 30px 0;">
                <div style="background: #1A1A1A; padding: 30px; border-radius: 13px; text-align: center;">
                  <h2 style="color: #FFD700; margin: 0 0 15px 0; font-size: 28px; font-weight: 900; font-family: 'Lato', 'Segoe UI', Arial, sans-serif; letter-spacing: 1px;">
                    WELCOME TO THE SQUAD! 🚀
                  </h2>
                  <p style="color: #FFFFFF; font-size: 18px; line-height: 1.6; margin: 0;">
                    Your anime streetwear journey starts now. Get ready for exclusive drops and epic designs!
                  </p>
                </div>
              </div>

              <!-- Benefits -->
              <div style="margin: 30px 0;">
                <h3 style="color: #00FFFF; font-size: 22px; margin-bottom: 20px; text-align: center; font-weight: 700;">
                  ✨ What You Get:
                </h3>
                
                <div style="margin: 20px 0;">
                  <div style="background: rgba(34,211,238,0.12); border-left: 4px solid #22d3ee; padding: 20px; margin: 15px 0; border-radius: 8px;">
                    <div style="color: #22d3ee; font-weight: 700; font-size: 16px; margin-bottom: 5px;">🎁 Early Access</div>
                    <div style="color: #CCCCCC; font-size: 14px;">First look at new collections and limited drops</div>
                  </div>
                  
                  <div style="background: rgba(30,144,255,0.1); border-left: 4px solid #1E90FF; padding: 20px; margin: 15px 0; border-radius: 8px;">
                    <div style="color: #00FFFF; font-weight: 700; font-size: 16px; margin-bottom: 5px;">💎 Exclusive Deals</div>
                    <div style="color: #CCCCCC; font-size: 14px;">Member-only discounts and flash sales</div>
                  </div>
                  
                  <div style="background: rgba(255,215,0,0.1); border-left: 4px solid #FFD700; padding: 20px; margin: 15px 0; border-radius: 8px;">
                    <div style="color: #FFD700; font-weight: 700; font-size: 16px; margin-bottom: 5px;">🎨 Design Stories</div>
                    <div style="color: #CCCCCC; font-size: 14px;">Behind-the-scenes content and anime inspirations</div>
                  </div>
                </div>
              </div>

              <!-- Call to Action -->
              <div style="text-align: center; margin: 40px 0;">
                <div style="background: linear-gradient(135deg, #22d3ee, #1E90FF); padding: 3px; border-radius: 30px; display: inline-block;">
                  <div style="background: #0D0D0D; color: white; padding: 18px 35px; border-radius: 27px; font-weight: bold; font-size: 18px;">
                    🛒 Start Shopping
                  </div>
                </div>
                <p style="color: #AAAAAA; font-size: 14px; margin-top: 15px;">
                  Use code <strong style="color: #22d3ee; background: rgba(34,211,238,0.12); padding: 2px 8px; border-radius: 4px;">FIRSTPUP</strong> for 10% off your first order
                </p>
              </div>

              <!-- Footer -->
              <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 1px solid #333333;">
                <p style="color: #888888; font-size: 14px; line-height: 1.5; margin-bottom: 15px;">
                  Thanks for joining the PUPITO Pup Squad!<br>
                  Ready to level up your streetwear game? 🌟
                </p>
                <p style="color: #555555; font-size: 12px;">
                  © ${new Date().getFullYear()} PUPITO • Anime streetwear for every arc of you
                </p>
              </div>
            </div>
          `
        });
        
        console.log('Welcome email sent successfully to subscriber:', email);
        
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the signup if email sending fails
      }
    } else {
      console.log('Email configuration incomplete. Missing environment variables:', 
        requiredEnvVars.filter(envVar => !process.env[envVar]));
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome to the Pup Squad! 🎉',
      totalSubscribers: emailData.emails.length
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const emailData = await readEmailList();
    return NextResponse.json({
      totalSubscribers: emailData.emails.length,
      signups: emailData.signups.slice(-10) // Return last 10 signups
    });
  } catch (error) {
    console.error('Get signups error:', error);
    return NextResponse.json(
      { error: 'Failed to get signup data' },
      { status: 500 }
    );
  }
}