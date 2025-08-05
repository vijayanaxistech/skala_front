import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
  try {
    const { to, body } = await request.json();

    if (!to || !body) {
      return NextResponse.json(
        { success: false, message: 'Missing "to" or "body".' },
        { status: 400 },
      );
    }

    // Initialize Twilio client
    const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC13b7f9b7eab3bfbc9888ec8eb83b17d0';
    const authToken = process.env.TWILIO_AUTH_TOKEN || '95706861cbb5c694b15dc2e446f33a7d';
    const client = twilio(accountSid, authToken);

    const message = await client.messages.create({
      from: 'whatsapp:+14155238886', // Twilio Sandbox number
      to: `whatsapp:${to}`,
      body,
    });

    console.log('✅ Message sent:', message.sid);

    return NextResponse.json({
      success: true,
      message: 'WhatsApp message sent successfully!',
      sid: message.sid,
    });
  } catch (error: any) {
    console.error('❌ Error sending message:', error.message);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send WhatsApp message.',
        error: error.message,
      },
      { status: 500 },
    );
  }
}
