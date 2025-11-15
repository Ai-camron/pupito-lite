import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    console.log('Testing email configuration...');
    console.log('EMAIL_PROVIDER:', process.env.EMAIL_PROVIDER);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('Has EMAIL_APP_PASSWORD:', !!process.env.EMAIL_APP_PASSWORD);
    console.log('Has EMAIL_PASSWORD:', !!process.env.EMAIL_PASSWORD);

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Test connection
    await transporter.verify();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Gmail configuration is working!' 
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