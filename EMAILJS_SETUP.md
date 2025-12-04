# EmailJS Setup Instructions

This guide will walk you through setting up EmailJS to receive form submissions from your Contact Form and Audit Form.

## Step 1: Get Your EmailJS Credentials

### 1.1 Get Your Public Key
1. Log in to your EmailJS account at [https://www.emailjs.com](https://www.emailjs.com)
2. Go to **Account** → **General**
3. Find your **Public Key** (it looks like: `abcdefghijklmnop`)
4. Copy this key - you'll need it in Step 3

### 1.2 Create an Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Once connected, you'll see a **Service ID** (e.g., `service_abc123`)
6. Copy this Service ID - you'll need it in Step 3

## Step 2: Create Email Templates

### 2.1 Create Contact Form Template
1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Name it: `Contact Form Template`
4. Set the **Subject** to: `New Contact Form Submission from {{from_name}}`
5. In the **Content** section, use this template:

```
New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Service: {{service}}
Monthly Ad Spend: {{ad_spend}}
Message: {{message}}

---
This email was sent from the Advertio website contact form.
```

6. Click **Save**
7. Copy the **Template ID** (e.g., `template_xyz789`) - you'll need it in Step 3

### 2.2 Create Audit Form Template
1. Click **Create New Template** again
2. Name it: `Audit Form Template`
3. Set the **Subject** to: `New Free Audit Request from {{from_name}}`
4. In the **Content** section, use this template:

```
New Free Audit Request

Full Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Company Name: {{company_name}}
Ad Platform: {{ad_platform}}
Monthly Ad Spend: {{monthly_ad_spend}}
Advertising Goals: {{advertising_goals}}

---
This email was sent from the Advertio website free audit form.
```

5. Click **Save**
6. Copy the **Template ID** (e.g., `template_abc456`) - you'll need it in Step 3

## Step 3: Configure Your Application

1. Open the file: `src/config/emailjs.config.js`
2. Replace the placeholder values with your actual credentials:

```javascript
export const EMAILJS_CONFIG = {
  // Paste your Public Key here
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',
  
  // Paste your Service ID here
  SERVICE_ID: 'YOUR_SERVICE_ID_HERE',
  
  // Paste your Template IDs here
  TEMPLATES: {
    CONTACT: 'YOUR_CONTACT_TEMPLATE_ID_HERE',      // Contact Form Template ID
    AUDIT: 'YOUR_AUDIT_TEMPLATE_ID_HERE',          // Audit Form Template ID
  },
  
  // Change this to your desired recipient email
  TO_EMAIL: 'info@advertio.com',
};
```

**Example:**
```javascript
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'abcdefghijklmnop',
  SERVICE_ID: 'service_abc123',
  TEMPLATES: {
    CONTACT: 'template_xyz789',
    AUDIT: 'template_abc456',
  },
  TO_EMAIL: 'info@advertio.com',
};
```

## Step 4: Test Your Forms

1. Start your development server: `npm run dev`
2. Navigate to the Contact page (`/contact`)
3. Fill out the form and submit
4. Check your email inbox - you should receive the form submission
5. Navigate to the Free Audit page (`/free-audit`)
6. Fill out the audit form and submit
7. Check your email inbox again - you should receive the audit request

## Troubleshooting

### Emails not being received?
1. **Check your EmailJS dashboard** → **Logs** to see if emails are being sent
2. **Verify all credentials** in `emailjs.config.js` are correct
3. **Check spam folder** - emails might be filtered
4. **Verify email service connection** in EmailJS dashboard

### Getting errors in console?
1. Make sure you've installed the package: `npm install @emailjs/browser`
2. Verify all IDs in the config file are correct (no extra spaces)
3. Check that your EmailJS account is active and not on a free tier limit

### Template variables not working?
- Make sure the variable names in your EmailJS templates match exactly:
  - Contact Form: `{{from_name}}`, `{{from_email}}`, `{{company}}`, `{{service}}`, `{{ad_spend}}`, `{{message}}`
  - Audit Form: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{company_name}}`, `{{ad_platform}}`, `{{monthly_ad_spend}}`, `{{advertising_goals}}`

## Security Note

⚠️ **Important**: The `emailjs.config.js` file contains your public key, which is safe to expose in frontend code. However, if you're using version control (Git), make sure this file is committed. The public key is designed to be used in client-side applications.

For production, you might want to use environment variables:
- Create a `.env` file (and add it to `.gitignore`)
- Use `import.meta.env.VITE_EMAILJS_PUBLIC_KEY` instead

## Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
- EmailJS Support: Check their support section in the dashboard

---

**That's it!** Your forms are now connected to EmailJS and will send emails to your specified address when users submit them.

