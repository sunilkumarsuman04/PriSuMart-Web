/**
 * PriSu AI — Knowledge Base
 *
 * Single source of truth for everything the chatbot is allowed to know
 * about PriSuMart. Kept separate from components/prompts on purpose so
 * non-developers can update facts without touching any chatbot logic.
 *
 * IMPORTANT: This file is bundled into the serverless function at
 * /api/chat.ts (server-side only). It is NOT shipped to the browser.
 */

import { APP_CONFIG } from '../config/app.config.js';

export const KNOWLEDGE_BASE = `
# About PriSuMart
PriSuMart is a grocery delivery platform that delivers fresh fruits, vegetables, dairy,
snacks, beverages, household essentials, medicine, and beauty items to customers' doorsteps.
Tagline: "Fresh Groceries Delivered Fast". Delivery window: 10–20 minutes from nearby
local "dark stores" in the customer's neighbourhood, with most orders also described as
arriving in 30–40 minutes depending on the section of the site.

PriSuMart is LIVE. The customer app is available now on Google Play (Android):
${APP_CONFIG.playStoreUrl}
Customers can download the app, browse products, place orders and track deliveries in the app.
PriSuMart is starting in Jhajha, Bihar and growing city by city across India, so service
availability depends on the customer's delivery area — if unsure, suggest checking in the app
or contacting support. The website itself is a marketing website: orders are placed in the
app, not on the website. The chatbot has no access to any customer's account or orders.

# Product Categories
Vegetables, Fruits, Dairy, Snacks, Beverages, Household essentials, Medicine, Beauty.

# How It Works
1. Browse Products — explore fresh produce, dairy, snacks and daily essentials organised into categories.
2. Add To Cart — pick items, adjust quantities, see the basket total update instantly.
3. Place Order — confirm address, choose a payment method, and place the order in seconds.
4. Get Fast Delivery — track the order live as it makes its way to the doorstep, typically in 30–40 minutes.

# Features
- Fast Delivery: most orders reach the doorstep in 30–40 minutes from nearby dark stores.
- Fresh Products: daily-sourced fruits, vegetables and dairy, quality-checked before leaving the store.
- Secure Payments: UPI, card, wallet, or cash on delivery — transactions encrypted end to end.
- Easy Ordering: a simple checkout flow — search, add to cart, done.
- Live Tracking: track the delivery partner on a live map once they leave the store.
- 24/7 Support: support for order issues, refunds, or other questions, any time of day.

# Payment Methods
- UPI
- QR code payment
- Credit/debit card
- Bank transfer
- Digital wallet
- Cash on Delivery (COD)
All transactions are described as being processed securely with end-to-end encryption through
third-party payment gateways. PriSuMart does not store raw card details.

# Why Choose PriSuMart
- Best Prices: transparent pricing with regular deals, no hidden markups on everyday essentials.
- Fresh Quality: every batch checked for freshness before reaching the customer's basket.
- Fast Delivery: local dark stores mean orders travel a short distance.
- Trusted Platform: secure payments and verified delivery partners.
- Local Store Support: partnerships with neighbourhood stores to help local businesses grow.
- Customer Satisfaction: easy returns and responsive support.

# Returns & Refunds Policy (from Terms & Conditions)
If a customer receives damaged, expired, or incorrect items, they should contact the support
team within 24 hours of delivery for a replacement or refund.

# Orders & Delivery (from Terms & Conditions)
Delivery time estimates (typically 10–20 minutes, described elsewhere as 30–40 minutes) may
vary due to weather, traffic, or store availability. Reasonable efforts are made to meet
stated delivery windows, but they are not guaranteed.

# Pricing & Payments (from Terms & Conditions)
Prices displayed are inclusive of applicable taxes unless stated otherwise, and are subject to
change without prior notice. Payments are processed securely through payment partners.

# User Conduct (from Terms & Conditions)
Users agree not to misuse the platform, including placing fraudulent orders or attempting to
access accounts that are not their own.

# Limitation of Liability (from Terms & Conditions)
PriSuMart is not liable for indirect or consequential damages arising from use of the
platform, to the extent permitted by applicable law.

# Privacy Policy Summary
- Information collected may include name, email, phone number, delivery address, order
  history, and payment details (the latter processed through secure third-party gateways).
- This information is used to process orders, provide customer support, improve services, and
  send updates about the customer's account or deliveries.
- PriSuMart does not sell personal data. Information is shared only with delivery partners and
  payment processors as necessary to fulfil orders, or as required by law.
- Industry-standard encryption and security practices protect customer information.
- Customers can request access to, correction of, or deletion of their personal data at any
  time by contacting PriSuMart.

# Contact Details
- Email: prisumart26@gmail.com
- Phone: +91 62055 26823
- Address: BTM Layout, Bangalore, India
- Instagram: https://www.instagram.com/prisu_mart

# Frequently Asked Questions
Q: Is the PriSuMart app available now?
A: Yes — PriSuMart is live on Google Play for Android. Search "PriSuMart" on the Play Store or
   use the Download App button on the website: ${APP_CONFIG.playStoreUrl}

Q: Is there an iPhone (iOS) app?
A: The app is currently available on Google Play for Android. No iOS listing is announced on
   the website yet.

Q: How fast is delivery?
A: PriSuMart aims to deliver most orders within 10–20 minutes (also described as
   30–40 minutes for some categories) from a nearby local dark store.

Q: What payment methods are supported?
A: UPI, QR code payment, credit/debit cards, bank transfer, digital wallets, and Cash on
   Delivery (COD).

Q: What if my order arrives damaged or wrong?
A: Contact support within 24 hours of delivery for a replacement or refund.

Q: Does PriSuMart sell my personal data?
A: No. PriSuMart does not sell personal data and only shares it with delivery partners and
   payment processors as needed to fulfil orders, or as required by law.

Q: How do I contact PriSuMart?
A: Email prisumart26@gmail.com or call +91 62055 26823.

Q: Where is PriSuMart based?
A: BTM Layout, Bangalore, India.
`.trim();

/** Friendly, on-topic conversation starters shown in the chatbot UI. */
export const SUGGESTED_QUESTIONS: string[] = [
  'How do I download the PriSuMart app?',
  'What payment methods do you support?',
  'How fast is delivery?',
  'What if my order arrives damaged?',
  'How can I contact support?',
];
