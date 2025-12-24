import { NextRequest, NextResponse } from 'next/server';
import { createEmailTransporter, resolveEmailEnv } from '@/lib/env';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Please provide a more detailed message (at least 10 characters)' },
        { status: 400 }
      );
    }

    // Check if email system is configured
    const emailEnv = resolveEmailEnv();
    
    if (!emailEnv.hasEmailConfig) {
      console.error('Email configuration incomplete. Missing environment variables:', emailEnv.missingEnvVars);
      return NextResponse.json(
        { error: 'Email service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    try {
      const transporter = createEmailTransporter(emailEnv);
      
      // Verify connection before sending
      await transporter.verify();
      
      const notificationEmail = emailEnv.notificationEmail;
      
      // Get subject category icon
      const subjectIcons = {
        'order': '📦',
        'sizing': '📏',
        'returns': '↩️',
        'product': '👕',
        'feedback': '💭',
        'other': '💬'
      };
      
      const subjectIcon = subjectIcons[subject as keyof typeof subjectIcons] || '💬';
      
      // Send notification email to you
      await transporter.sendMail({
        from: `"PUPITO Contact Form" <${emailEnv.user}>`,
        to: notificationEmail,
        subject: `${subjectIcon} PUPITO Contact: ${subject.charAt(0).toUpperCase() + subject.slice(1)}`,
        replyTo: email,
        html: `
          <div style="background: #0D0D0D; color: white; padding: 30px 20px; font-family: 'Lato', 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; border-radius: 12px;">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                <div style="background: linear-gradient(135deg, #FF69B4, #FF1493); padding: 10px; border-radius: 10px; box-shadow: 0 0 25px rgba(255,105,180,0.4);">
                  <span style="font-size: 20px; font-weight: 900; color: black;">P</span>
                </div>
                <h1 style="color: #FF69B4; margin: 0; font-size: 24px; font-weight: 900; text-shadow: 0 0 15px rgba(255,105,180,0.5);">
                  PUPITO
                </h1>
              </div>
              <h2 style="color: #FFD700; margin: 0; font-size: 22px; font-weight: 700;">
                ${subjectIcon} New Contact Form Submission
              </h2>
            </div>

            <!-- Customer Info -->
            <div style="background: linear-gradient(135deg, #FF69B4, #1E90FF); padding: 2px; border-radius: 12px; margin: 25px 0;">
              <div style="background: #1A1A1A; padding: 25px; border-radius: 10px;">
                <h3 style="color: #00FFFF; margin: 0 0 20px 0; font-size: 18px; font-weight: 700;">Customer Details:</h3>
                
                <div style="display: grid; gap: 15px;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: #FF69B4; font-weight: 600; min-width: 80px;">👤 Name:</span>
                    <span style="color: white; font-size: 16px;">${name}</span>
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: #FF69B4; font-weight: 600; min-width: 80px;">📧 Email:</span>
                    <a href="mailto:${email}" style="color: #00FFFF; text-decoration: none; font-size: 16px;">${email}</a>
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: #FF69B4; font-weight: 600; min-width: 80px;">📂 Topic:</span>
                    <span style="color: #FFD700; font-size: 16px; font-weight: 600;">${subject.charAt(0).toUpperCase() + subject.slice(1)}</span>
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: #FF69B4; font-weight: 600; min-width: 80px;">🕒 Time:</span>
                    <span style="color: white; font-size: 14px;">${new Date().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Content -->
            <div style="background: linear-gradient(135deg, #FFD700, #FF6B6B); padding: 2px; border-radius: 12px; margin: 25px 0;">
              <div style="background: #1A1A1A; padding: 25px; border-radius: 10px;">
                <h3 style="color: #FFD700; margin: 0 0 15px 0; font-size: 18px; font-weight: 700;">💬 Message:</h3>
                <div style="background: #0D0D0D; padding: 20px; border-radius: 8px; border-left: 4px solid #FF69B4;">
                  <p style="color: white; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:${email}?subject=Re: ${subject.charAt(0).toUpperCase() + subject.slice(1)} - PUPITO Support" 
                 style="display: inline-block; background: linear-gradient(135deg, #FF69B4, #FF1493); color: black; padding: 15px 30px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 16px; margin: 0 10px; box-shadow: 0 0 20px rgba(255,105,180,0.4);">
                📧 Reply to Customer
              </a>
            </div>

            <!-- Priority Indicator -->
            ${subject === 'returns' || subject === 'order' ? `
              <div style="background: rgba(255,69,0,0.1); border: 2px solid #FF4500; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
                <span style="color: #FF4500; font-weight: bold; font-size: 16px;">⚠️ HIGH PRIORITY</span>
                <p style="color: #FFA500; margin: 5px 0 0 0; font-size: 14px;">Customer needs urgent assistance with order/return issue</p>
              </div>
            ` : ''}

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                Sent from PUPITO Contact Form • ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `
      });
      
      // Send auto-reply confirmation to customer
      await transporter.sendMail({
        from: `"PUPITO Support" <${emailEnv.user}>`,
        to: email,
        subject: `✅ We got your message! - PUPITO Support`,
        html: `
          <div style="background: #0D0D0D; color: white; padding: 30px 20px; font-family: 'Lato', 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 12px;">
            
            <!-- Header with Logo -->
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 15px;">
                <div style="background: linear-gradient(135deg, #FF69B4, #FF1493); padding: 12px; border-radius: 12px; box-shadow: 0 0 30px rgba(255,105,180,0.4);">
                  <span style="font-size: 24px; font-weight: 900; color: black;">P</span>
                </div>
                <div>
                  <h1 style="color: #FF69B4; margin: 0; font-size: 28px; font-weight: 900; text-shadow: 0 0 20px rgba(255,105,180,0.5);">
                    PUPITO
                  </h1>
                  <p style="color: #FFD700; font-size: 12px; margin: 2px 0 0 0; letter-spacing: 2px; font-weight: 600;">
                    ANIME STREETWEAR
                  </p>
                </div>
              </div>
            </div>

            <!-- Confirmation Message -->
            <div style="background: linear-gradient(135deg, #32CD32, #00FF00); padding: 3px; border-radius: 16px; margin: 25px 0;">
              <div style="background: #1A1A1A; padding: 25px; border-radius: 13px; text-align: center;">
                <h2 style="color: #32CD32; margin: 0 0 15px 0; font-size: 24px; font-weight: 900;">
                  ✅ Message Received!
                </h2>
                <p style="color: white; font-size: 16px; line-height: 1.6; margin: 0;">
                  Hey <strong style="color: #FFD700;">${name}</strong>! Thanks for reaching out to the PUPITO squad.
                </p>
              </div>
            </div>

            <!-- What's Next -->
            <div style="margin: 25px 0;">
              <h3 style="color: #00FFFF; font-size: 18px; margin-bottom: 15px; text-align: center;">What happens next:</h3>
              
              <div style="background: rgba(255,105,180,0.1); border-left: 4px solid #FF69B4; padding: 15px; margin: 10px 0; border-radius: 8px;">
                <div style="color: #FF69B4; font-weight: 700; margin-bottom: 5px;">📧 We'll Review Your Message</div>
                <div style="color: #CCCCCC; font-size: 14px;">Our team will carefully read through your message about: <strong style="color: #FFD700;">${subject.charAt(0).toUpperCase() + subject.slice(1)}</strong></div>
              </div>
              
              <div style="background: rgba(30,144,255,0.1); border-left: 4px solid #1E90FF; padding: 15px; margin: 10px 0; border-radius: 8px;">
                <div style="color: #00FFFF; font-weight: 700; margin-bottom: 5px;">⏱️ Quick Response Time</div>
                <div style="color: #CCCCCC; font-size: 14px;">Expect a personalized response within 4 hours (usually much faster!)</div>
              </div>
              
              <div style="background: rgba(255,215,0,0.1); border-left: 4px solid #FFD700; padding: 15px; margin: 10px 0; border-radius: 8px;">
                <div style="color: #FFD700; font-weight: 700; margin-bottom: 5px;">🎯 Human Support</div>
                <div style="color: #CCCCCC; font-size: 14px;">A real person (not a bot!) will personally handle your inquiry</div>
              </div>
            </div>

            <!-- Quick Links -->
            <div style="background: rgba(50,50,50,0.3); padding: 20px; border-radius: 12px; margin: 25px 0;">
              <h3 style="color: #FFD700; font-size: 16px; margin: 0 0 15px 0; text-align: center;">While you wait, check out:</h3>
              <div style="text-align: center;">
                <a href="http://localhost:3000/help/faq" style="display: inline-block; color: #FF69B4; text-decoration: none; margin: 5px 10px; font-weight: 600;">🤔 FAQ</a>
                <a href="http://localhost:3000/help/shipping" style="display: inline-block; color: #00FFFF; text-decoration: none; margin: 5px 10px; font-weight: 600;">📦 Shipping Info</a>
                <a href="http://localhost:3000/help/size-guide" style="display: inline-block; color: #FFD700; text-decoration: none; margin: 5px 10px; font-weight: 600;">📏 Size Guide</a>
              </div>
            </div>

            <!-- Message Summary -->
            <div style="background: #1A1A1A; padding: 20px; border-radius: 8px; border: 1px solid #333; margin: 25px 0;">
              <h4 style="color: #FF69B4; margin: 0 0 10px 0; font-size: 14px;">Your Message Summary:</h4>
              <p style="color: #999; font-size: 13px; margin: 5px 0;"><strong>Topic:</strong> ${subject.charAt(0).toUpperCase() + subject.slice(1)}</p>
              <p style="color: #999; font-size: 13px; margin: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              <p style="color: #999; font-size: 13px; margin: 5px 0;"><strong>Reference ID:</strong> #${Date.now().toString().slice(-8)}</p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
              <p style="color: #888; font-size: 14px; margin-bottom: 10px;">
                Thanks for being part of the PUPITO family! 🌟
              </p>
              <p style="color: #555; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} PUPITO • Anime streetwear for every arc of you
              </p>
            </div>
          </div>
        `
      });
      
      console.log('Contact form emails sent successfully');
      
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully! We\'ll get back to you within 4 hours.',
        referenceId: `#${Date.now().toString().slice(-8)}`
      });

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return NextResponse.json(
        { error: 'Failed to send message. Please try again or contact us directly at hello@pupito.com' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
