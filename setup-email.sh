#!/bin/bash

# PUPITO Email Configuration Helper
echo "🎯 PUPITO Email Setup Helper"
echo "=============================="
echo

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Backup created as .env.local.backup"
    cp .env.local .env.local.backup
fi

echo "Choose your email provider:"
echo "1) Outlook/Hotmail (Recommended for quick setup)"
echo "2) Hostinger Domain Email (Professional)"
echo "3) Gmail (Requires app password)"
echo

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo
        echo "📧 Setting up Outlook configuration..."
        read -p "Enter your Outlook email: " email
        read -s -p "Enter your Outlook password: " password
        echo
        
        cat > .env.local << EOF
# PUPITO Email Configuration - Outlook
EMAIL_PROVIDER=outlook
EMAIL_USER=$email
EMAIL_PASSWORD=$password
NOTIFICATION_EMAIL=$email
EOF
        echo "✅ Outlook configuration saved to .env.local"
        ;;
    2)
        echo
        echo "🌐 Setting up Hostinger domain email..."
        read -p "Enter your domain email (e.g., contact@pupito.com): " email
        read -s -p "Enter your domain email password: " password
        echo
        read -p "Enter SMTP host (default: smtp.hostinger.com): " host
        host=${host:-smtp.hostinger.com}
        read -p "Enter SMTP port (default: 587): " port
        port=${port:-587}
        
        cat > .env.local << EOF
# PUPITO Email Configuration - Hostinger Domain
EMAIL_PROVIDER=hostinger
EMAIL_USER=$email
EMAIL_PASSWORD=$password
EMAIL_HOST=$host
EMAIL_PORT=$port
EMAIL_SECURE=false
NOTIFICATION_EMAIL=$email
EOF
        echo "✅ Hostinger configuration saved to .env.local"
        ;;
    3)
        echo
        echo "📧 Setting up Gmail configuration..."
        echo "⚠️  You need to generate an App Password first!"
        echo "Visit: https://myaccount.google.com/apppasswords"
        echo
        read -p "Enter your Gmail address: " email
        read -s -p "Enter your Gmail App Password (16 characters): " password
        echo
        
        cat > .env.local << EOF
# PUPITO Email Configuration - Gmail
EMAIL_PROVIDER=gmail
EMAIL_USER=$email
EMAIL_APP_PASSWORD=$password
NOTIFICATION_EMAIL=$email
EOF
        echo "✅ Gmail configuration saved to .env.local"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo
echo "🚀 Email configuration complete!"
echo
echo "Next steps:"
echo "1. Start your development server: npm run dev"
echo "2. Test the signup form on your website"
echo "3. Check your email for notifications"
echo
echo "Need help? Check EMAIL_SETUP.md for detailed instructions."