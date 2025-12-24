import { NextResponse } from 'next/server';
import { createEmailTransporter, resolveEmailEnv } from '@/lib/env';

export async function GET() {
  try {
    const emailEnv = resolveEmailEnv();
    console.log('Testing email configuration...');
    console.log('EMAIL_PROVIDER:', emailEnv.provider);
    console.log('EMAIL_USER:', emailEnv.user);
    console.log('Has EMAIL_APP_PASSWORD:', !!emailEnv.appPassword);
    console.log('Has EMAIL_PASSWORD:', !!emailEnv.password);

    if (!emailEnv.hasEmailConfig) {
      return NextResponse.json({
        success: false,
        error: 'Email configuration is incomplete',
        missingEnvVars: emailEnv.missingEnvVars
      }, { status: 503 });
    }

    const transporter = createEmailTransporter(emailEnv);

    await transporter.verify();
    
    return NextResponse.json({ 
      success: true, 
      message: `${emailEnv.provider} configuration is working!` 
    });

  } catch (error) {
    console.error('Email test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      code: error && typeof error === 'object' && 'code' in error ? String(error.code) : undefined
    }, { status: 500 });
  }
}
