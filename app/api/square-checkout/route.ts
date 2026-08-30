import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";

type CheckoutItem = { slug?: unknown; qty?: unknown };
type CheckoutBody = {
  items?: CheckoutItem[];
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  fulfillment?: unknown;
  pickupLocation?: unknown;
  address1?: unknown;
  address2?: unknown;
  city?: unknown;
  state?: unknown;
  zip?: unknown;
  notes?: unknown;
};

const text = (value: unknown, max = 250) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: NextRequest) {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  if (!accessToken || !locationId) {
    return NextResponse.json(
      { error: "Secure checkout is not configured yet." },
      { status: 503 },
    );
  }

  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid checkout request." }, { status: 400 });
  }

  const name = text(body.name, 100);
  const phone = text(body.phone, 30);
  const email = text(body.email, 150);
  const fulfillment = body.fulfillment === "shipping" ? "shipping" : "pickup";
  const pickupLocation = text(body.pickupLocation, 100);
  const address1 = text(body.address1, 150);
  const address2 = text(body.address2, 150);
  const city = text(body.city, 100);
  const state = text(body.state, 2).toUpperCase();
  const zip = text(body.zip, 12);
  const notes = text(body.notes, 500);

  if (!name || !phone || !email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Complete your name, phone number, and email address." },
      { status: 400 },
    );
  }
  if (fulfillment === "pickup" && !pickupLocation) {
    return NextResponse.json({ error: "Choose a pickup area." }, { status: 400 });
  }
  if (fulfillment === "shipping" && (!address1 || !city || !state || !zip)) {
    return NextResponse.json(
      { error: "Complete the required shipping address fields." },
      { status: 400 },
    );
  }

  const requested = Array.isArray(body.items) ? body.items : [];
  const lineItems = requested.flatMap((item) => {
    const product = products.find((entry) => entry.slug === item.slug);
    const quantity = Number(item.qty);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) {
      return [];
    }
    return [
      {
        name: product.name,
        quantity: String(quantity),
        base_price_money: { amount: product.price * 100, currency: "USD" },
      },
    ];
  });

  const itemCount = lineItems.reduce((sum, item) => sum + Number(item.quantity), 0);
  if (!lineItems.length || itemCount > 100) {
    return NextResponse.json({ error: "Your cart is empty or invalid." }, { status: 400 });
  }

  const discountAmount = Math.floor(itemCount / 5) * 1000;
  const qualifiesForFreeShipping = itemCount >= 10;
  const origin = new URL(request.url).origin;
  const paymentNote = [
    `Customer: ${name}`,
    `Fulfillment: ${fulfillment === "shipping" ? "Shipping" : `Pickup — ${pickupLocation}`}`,
    notes ? `Notes: ${notes}` : "",
  ]
    .filter(Boolean)
    .join(" | ")
    .slice(0, 500);

  const squareRequest = {
    idempotency_key: crypto.randomUUID(),
    order: {
      location_id: locationId,
      line_items: lineItems,
      ...(discountAmount
        ? {
            discounts: [
              {
                name: "Buy 4, Get 1 Free",
                type: "FIXED_AMOUNT",
                scope: "ORDER",
                amount_money: { amount: discountAmount, currency: "USD" },
              },
            ],
          }
        : {}),
    },
    checkout_options: {
      redirect_url: `${origin}/order?payment=success`,
      merchant_support_email: "elevenalphajerky@gmail.com",
      enable_coupon: false,
      ask_for_shipping_address: fulfillment === "shipping",
      ...(fulfillment === "shipping" && !qualifiesForFreeShipping
        ? {
            shipping_fee: {
              name: "Shipping",
              charge: { amount: 800, currency: "USD" },
            },
          }
        : {}),
    },
    pre_populated_data: {
      buyer_email: email,
      ...(/^\+[1-9]\d{7,14}$/.test(phone) ? { buyer_phone_number: phone } : {}),
      ...(fulfillment === "shipping"
        ? {
            buyer_address: {
              address_line_1: address1,
              ...(address2 ? { address_line_2: address2 } : {}),
              locality: city,
              administrative_district_level_1: state,
              postal_code: zip,
              country: "US",
            },
          }
        : {}),
    },
    payment_note: paymentNote,
  };

  const response = await fetch(
    "https://connect.squareup.com/v2/online-checkout/payment-links",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Square-Version": "2026-07-16",
      },
      body: JSON.stringify(squareRequest),
      cache: "no-store",
    },
  );

  const result = (await response.json()) as {
    payment_link?: { url?: string };
    errors?: Array<{ detail?: string }>;
  };
  const checkoutUrl = result.payment_link?.url;

  if (!response.ok || !checkoutUrl) {
    console.error("Square checkout error", result.errors ?? result);
    return NextResponse.json(
      { error: "Square could not start checkout. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ checkoutUrl });
}
