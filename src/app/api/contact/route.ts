import { NextResponse } from 'next/server';
import dns from 'dns';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  let name = '';
  let email = '';
  let message = '';
  const files: File[] = [];

  try {
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = (formData.get('name') as string) || '';
      email = (formData.get('email') as string) || '';
      message = (formData.get('message') as string) || '';
      const uploadedFiles = formData.getAll('files');
      for (const entry of uploadedFiles) {
        if (entry instanceof File && entry.size > 0) {
          files.push(entry);
        }
      }
    } else {
      const body = (await request.json()) as ContactRequestBody;
      name = body.name || '';
      email = body.email || '';
      message = body.message || '';
    }
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request body',
      },
      {
        status: 400,
      },
    );
  }

  try {
    if (!name || !email)
      return NextResponse.json(
        {
          success: false,
          error: 'Name and email are required',
        },
        {
          status: 400,
        },
      );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
        },
        {
          status: 400,
        },
      );

    const disposableDomains = [
      'tempmail.com',
      'guerrillamail.com',
      '10minutemail.com',
      'mailinator.com',
      'yopmail.com',
      'throwaway.email',
      'fakeinbox.com',
      'maildrop.cc',
      'temp-mail.org',
      'getnada.com',
      'trashmail.com',
      'sharklasers.com',
      'grr.la',
      'mintemail.com',
      'test.com',
      'example.com',
      'fake.com',
      'spam4.me',
      'emailondeck.com',
    ];
    const domain = email.split('@')[1]?.toLowerCase() || '';
    if (disposableDomains.includes(domain))
      return NextResponse.json(
        {
          success: false,
          error: 'Disposable emails are not allowed',
        },
        {
          status: 400,
        },
      );

    // Name validations
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();
    const escapedName = escapeHtml(trimmedName);
    const escapedEmail = escapeHtml(email.trim());
    const escapedMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br>') || '<em>(No message text provided)</em>';

    // File attachments summary
    const fileSummaryList = files.map((f) => `<li>${escapeHtml(f.name)} (${(f.size / 1024).toFixed(1)} KB)</li>`).join('');
    const fileTextSummary = files.map((f) => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`).join(', ') || 'None';

    // Check if GMAIL_APP_PASSWORD is set
    if (!process.env.GMAIL_APP_PASSWORD) {
      console.error('SMTP Error: GMAIL_APP_PASSWORD env variable is not configured in this environment!');
      if (process.env.NODE_ENV === 'development') {
        try {
          const logDir = process.cwd();
          const logFile = path.join(logDir, 'messages.txt');
          const timestamp = new Date().toLocaleString('en-US');
          const logEntry = `\n======================================\nDate: ${timestamp}\nName: ${trimmedName}\nEmail: ${email}\nMessage: ${trimmedMessage}\nAttachments: ${fileTextSummary}\n======================================\n`;
          fs.appendFileSync(logFile, logEntry, 'utf8');
          console.log('Saved message to messages.txt fallback successfully.');

          return NextResponse.json({
            success: true,
            message: 'Message saved locally (check messages.txt)! Set GMAIL_APP_PASSWORD in .env.local to send live emails.',
          });
        } catch (fsError) {
          console.error('Failed to write message to fallback file:', fsError);
        }
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Email configuration error. GMAIL_APP_PASSWORD is not set in environment.',
        },
        {
          status: 500,
        },
      );
    }

    // Process attachments for Nodemailer
    const attachments = [];
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER || 'subhashadireddy@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      lookup: (
        hostname: string,
        options: dns.LookupOneOptions,
        callback: (err: NodeJS.ErrnoException | null, address: string, family: number) => void
      ) => {
        dns.lookup(hostname, { family: 4 }, callback);
      },
    } as any);

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER || 'subhashadireddy@gmail.com'}>`,
      to: process.env.GMAIL_TO || 'subhashadireddy@gmail.com',
      replyTo: escapedEmail,
      subject: `New message from ${escapedName}`,
      html: `
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${escapedMessage}</p>
        ${files.length > 0 ? `<p><strong>Attached Files (${files.length}):</strong></p><ul>${fileSummaryList}</ul>` : ''}
      `,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: 'Message and attachments sent successfully!',
    });
  } catch (error: any) {
    console.error('Contact form SMTP error:', error);

    if (process.env.NODE_ENV === 'development') {
      try {
        const logDir = process.cwd();
        const logFile = path.join(logDir, 'messages.txt');
        const timestamp = new Date().toLocaleString('en-US');
        const logEntry = `\n======================================\nDate: ${timestamp}\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n======================================\n`;
        fs.appendFileSync(logFile, logEntry, 'utf8');
        console.log('Saved message to messages.txt fallback successfully.');

        return NextResponse.json({
          success: true,
          message: 'Message saved locally to messages.txt!',
        });
      } catch (fsError) {
        console.error('Failed to write message to fallback file:', fsError);
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send message: ' + (error.message || 'Unknown error'),
      },
      {
        status: 500,
      },
    );
  }
}
