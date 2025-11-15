# PUPITO Email Setup Guide

This guide will help you configure email notifications for newsletter signups on your PUPITO website.

## Quick Setup for Outlook (Recommended)

1. **Create `.env.local` file** in your project root:
```bash
EMAIL_PROVIDER=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-outlook-password
```

2. **Test the configuration** by signing up on your website

## Hostinger Domain Email Setup

When you're ready to use your custom domain email (like contact@pupito.com):

1. **Set up your domain email** in Hostinger control panel
2. **Update `.env.local`**:
```bash
EMAIL_PROVIDER=hostinger
EMAIL_USER=contact@pupito.com
EMAIL_PASSWORD=your-domain-email-password
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

3. **Common Hostinger SMTP Settings**:
   - SMTP Server: `smtp.hostinger.com`
   - Port: `587` (recommended) or `465`
   - Security: STARTTLS for port 587, SSL for port 465

## Email Provider Comparison

| Provider | Setup Difficulty | Professional Look | Cost |
|----------|------------------|-------------------|------|
| **Outlook** | Easy | Good | Free |
| **Hostinger Domain** | Medium | Excellent | ~$1-2/month |
| **Gmail** | Medium | Good | Free |

## Troubleshooting

### Outlook Issues
- **"Authentication failed"**: Double-check email and password
- **"Connection timeout"**: Check if firewall is blocking port 587
- **Enable "Less secure apps"** if prompted (rare with newer accounts)

### Hostinger Issues
- **"Connection refused"**: Verify SMTP settings in Hostinger control panel
- **"Authentication failed"**: Make sure you're using the email password, not cPanel password
- **Port issues**: Try port 465 with `EMAIL_SECURE=true` if 587 doesn't work

### Gmail Issues (if needed)
- **Must use App Password**: Regular password won't work
- **2FA required**: Enable 2-factor authentication first
- **Generate App Password**: Google Account → Security → App passwords

## Testing Your Configuration

1. **Start your development server**:
```bash
npm run dev
```

2. **Visit your website** and try signing up with a test email

3. **Check the terminal** for success/error messages

4. **Check your inbox** for the notification email

## Email Template Customization

The notification email includes:
- ✅ PUPITO branding with neon colors
- ✅ New subscriber details
- ✅ Total subscriber count
- ✅ Professional HTML styling
- ✅ Anime/streetwear theme

## Production Recommendations

1. **Use domain email** (contact@pupito.com) for maximum professionalism
2. **Set up SPF/DKIM records** in your domain DNS for better deliverability
3. **Monitor email delivery** and check spam folders initially
4. **Consider email service upgrades** as your subscriber base grows

## Security Best Practices

- ✅ Never commit `.env.local` to version control
- ✅ Use strong, unique passwords for email accounts
- ✅ Enable 2FA on email accounts when possible
- ✅ Regularly rotate email passwords
- ✅ Monitor for suspicious login activity

## Need Help?

- Check the terminal logs when someone signs up
- Verify all environment variables are set correctly
- Test with a simple email first (like your personal email)
- Check spam/junk folders for notification emails

---

**Ready to launch your anime streetwear empire with professional email notifications!** 🚀