export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "SmartStyle";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Discover the ultimate shopping destination for tech enthusiasts and fashion lovers alike. Our online store offers a wide range of premium smartwatches, laptops, wireless earphones, headphones, and essential tech accessories like keyboards, mice, chargers, and power banks. Explore our stylish clothing collection to complete your look with comfort and elegance. Shop now for unbeatable deals on all your favorite gadgets and fashion essentials.";
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  export const PAYMENT_METHODS = process.env.PAYMENT_METHODS ? process.env.PAYMENT_METHODS.split(', ') : ['PayPal','Stripe','CashOnDelivery'];
export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || "PayPal";