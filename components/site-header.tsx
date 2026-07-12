"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" onClick={close} aria-label="Eleven Alpha Jerky home">
          <Image
            src="/images/eleven-alpha-logo-full.jpg"
            alt="Eleven Alpha Jerky"
            width={1536}
            height={1024}
            priority
            unoptimized
          />
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Toggle menu</span>
        </button>

        <nav className={`main-nav ${open ? "is-open" : ""}`} id="main-nav">
          <Link href="/#story" onClick={close}>Our Story</Link>
          <Link href="/#flavors" onClick={close}>Flavors</Link>
          <Link href="/#reviews" onClick={close}>Reviews</Link>
          <Link href="/#contact" onClick={close}>Contact</Link>
          <Link className="order-link" href="/order" onClick={close}>Order</Link>
        </nav>

        <Link className="header-cart" href="/order#checkout" aria-label={`Cart with ${itemCount} items`}>
          <span className="cart-bag" aria-hidden="true" />
          <span>Cart</span>
          <b>{itemCount}</b>
        </Link>
      </div>
    </header>
  );
}
