"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { products } from "@/lib/products";

const orderEmail = "elevenalphajerky@gmail.com";

export default function OrderPage() {
  const {
    cart,
    itemCount,
    subtotal,
    discount,
    total,
    addItem,
    changeQuantity,
    removeItem,
  } = useCart();
  const [fulfillment, setFulfillment] = useState<"pickup" | "shipping">("pickup");
  const [formMessage, setFormMessage] = useState("");

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!cart.length) {
      setFormMessage("Add at least one product before sending your order.");
      document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!name || !phone || !email) {
      setFormMessage("Complete your name, phone number, and email address.");
      return;
    }

    let fulfillmentDetails = "";
    if (fulfillment === "pickup") {
      const pickupLocation = String(data.get("pickupLocation") || "");
      if (!pickupLocation) {
        setFormMessage("Choose a pickup area.");
        return;
      }
      fulfillmentDetails = `Pickup area: ${pickupLocation}`;
    } else {
      const address1 = String(data.get("address1") || "").trim();
      const address2 = String(data.get("address2") || "").trim();
      const city = String(data.get("city") || "").trim();
      const state = String(data.get("state") || "").trim();
      const zip = String(data.get("zip") || "").trim();
      if (!address1 || !city || !state || !zip) {
        setFormMessage("Complete the required shipping address fields.");
        return;
      }
      fulfillmentDetails = `Shipping address:\n${address1}${address2 ? `\n${address2}` : ""}\n${city}, ${state} ${zip}`;
    }

    const items = cart.map((item) => `- ${item.name} x${item.qty}`).join("\n");
    const notes = String(data.get("notes") || "").trim();
    const body = [
      "CUSTOMER INFORMATION",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      "",
      "FULFILLMENT",
      fulfillment === "pickup" ? "Pickup" : "Shipping",
      fulfillmentDetails,
      "",
      "ORDER",
      "",
      items,
      "",
      `SUBTOTAL: $${subtotal}`,
      `BUY 4, GET 1 FREE DISCOUNT: -$${discount}`,
      `TOTAL AFTER DISCOUNT: $${total}`,
      fulfillment === "shipping" ? "Shipping cost: To be confirmed" : "",
      notes ? `\nORDER NOTES\n${notes}` : "",
    ]
      .filter((line) => line !== "")
      .join("\n");

    setFormMessage("Your email app is opening with the completed order.");
    window.location.href = `mailto:${orderEmail}?subject=${encodeURIComponent("Eleven Alpha Jerky Order")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="order-page">
      <section className="order-hero">
        <div className="shell order-hero-inner">
          <div>
            <Link className="back-link" href="/">← Back to home</Link>
            <p className="eyebrow">Build Your Pack</p>
            <h1>Order Eleven Alpha Jerky</h1>
            <p>Choose your products, review your discount, then select pickup or shipping.</p>
          </div>
          <div className="order-promo">
            <strong>Buy 4, Get 1 Free</strong>
            <span>Every fifth product is free. Applied automatically.</span>
          </div>
        </div>
      </section>

      <div className="shell order-layout">
        <section className="order-products" id="products">
          <div className="order-section-head">
            <span>1</span>
            <div><h2>Choose your flavors</h2><p>All products are $10. Add any combination.</p></div>
          </div>
          <div className="order-product-grid">
            {products.map((product) => {
              const current = cart.find((item) => item.slug === product.slug);
              return (
                <article className="order-product" key={product.slug}>
                  <div className="order-product-image">
                    <Image src={product.image} alt={product.name} fill sizes="(max-width: 700px) 34vw, 180px" unoptimized />
                  </div>
                  <div className="order-product-copy">
                    <p className="product-type">{product.type}</p>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="order-product-bottom">
                      <strong>${product.price} <small>· {product.size}</small></strong>
                      {current ? (
                        <div className="stepper" aria-label={`${product.name} quantity`}>
                          <button type="button" onClick={() => changeQuantity(product.slug, current.qty - 1)} aria-label={`Remove one ${product.name}`}>−</button>
                          <b>{current.qty}</b>
                          <button type="button" onClick={() => changeQuantity(product.slug, current.qty + 1)} aria-label={`Add one ${product.name}`}>+</button>
                        </div>
                      ) : (
                        <button
                          className="small-add"
                          type="button"
                          onClick={() => addItem({ slug: product.slug, name: product.name, price: product.price })}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <aside className="checkout-column" id="checkout">
          <form className="checkout-card" onSubmit={submitOrder}>
            <div className="order-section-head compact">
              <span>2</span>
              <div><h2>Review & send</h2><p>{itemCount} {itemCount === 1 ? "item" : "items"} selected</p></div>
            </div>

            <div className="cart-list">
              {cart.length === 0 ? (
                <div className="empty-cart"><b>Your pack is empty.</b><span>Add a flavor to get started.</span></div>
              ) : (
                cart.map((item) => (
                  <div className="cart-row" key={item.slug}>
                    <div><b>{item.name}</b><span>${item.price * item.qty}</span></div>
                    <div className="cart-row-actions">
                      <div className="stepper small">
                        <button type="button" onClick={() => changeQuantity(item.slug, item.qty - 1)} aria-label={`Remove one ${item.name}`}>−</button>
                        <b>{item.qty}</b>
                        <button type="button" onClick={() => changeQuantity(item.slug, item.qty + 1)} aria-label={`Add one ${item.name}`}>+</button>
                      </div>
                      <button className="remove-link" type="button" onClick={() => removeItem(item.slug)}>Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="totals">
              <div><span>Subtotal</span><b>${subtotal}</b></div>
              <div className="discount"><span>Buy 4, Get 1 Free</span><b>−${discount}</b></div>
              <div className="grand-total"><span>Total</span><b>${total}</b></div>
              <small>Shipping, if needed, will be confirmed before the order is finalized.</small>
            </div>

            <div className="checkout-fields">
              <h3>Your information</h3>
              <label>Full name<input name="name" autoComplete="name" required /></label>
              <div className="field-row">
                <label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label>
                <label>Email<input name="email" type="email" autoComplete="email" required /></label>
              </div>

              <h3>Pickup or shipping</h3>
              <div className="fulfillment-toggle">
                <button className={fulfillment === "pickup" ? "active" : ""} type="button" onClick={() => setFulfillment("pickup")}>Pickup</button>
                <button className={fulfillment === "shipping" ? "active" : ""} type="button" onClick={() => setFulfillment("shipping")}>Shipping</button>
              </div>

              {fulfillment === "pickup" ? (
                <fieldset className="pickup-fieldset">
                  <legend>Pickup area</legend>
                  <label><input type="radio" name="pickupLocation" value="Chicago" required /> Chicago</label>
                  <label><input type="radio" name="pickupLocation" value="Kent City / Grand Rapids Area" required /> Kent City / Grand Rapids Area</label>
                  <small>Timing and exact location will be confirmed after your order is received.</small>
                </fieldset>
              ) : (
                <div className="shipping-fields">
                  <label>Street address<input name="address1" autoComplete="address-line1" required /></label>
                  <label>Apartment, suite, unit <em>Optional</em><input name="address2" autoComplete="address-line2" /></label>
                  <div className="address-row">
                    <label>City<input name="city" autoComplete="address-level2" required /></label>
                    <label>State<input name="state" autoComplete="address-level1" maxLength={2} required /></label>
                    <label>ZIP<input name="zip" autoComplete="postal-code" inputMode="numeric" required /></label>
                  </div>
                </div>
              )}

              <label>Order notes <em>Optional</em><textarea name="notes" rows={3} placeholder="Anything we should know?" /></label>
            </div>

            {formMessage && <p className="form-message" role="status">{formMessage}</p>}
            <button className="send-order" type="submit">Send completed order</button>
            <p className="email-note">This opens a ready-to-send email to {orderEmail}. You can review it before sending.</p>
          </form>
        </aside>
      </div>
    </main>
  );
}
