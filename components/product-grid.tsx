"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { products } from "@/lib/products";

function HeatMeter({ heat }: { heat: number }) {
  if (heat === 0) return <span className="mild-label">No added heat</span>;
  return (
    <span className="heat-meter" aria-label={`${heat} out of 5 heat level`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span className={index < heat ? "hot" : ""} key={index}>◆</span>
      ))}
    </span>
  );
}

export function ProductGrid() {
  const { addItem } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  return (
    <div className="product-grid">
      {products.map((product) => {
        const quantity = quantities[product.slug] ?? 1;
        return (
          <article className="product-card" key={product.slug}>
            <div className="product-image-wrap">
              <Image
                src={product.image}
                alt={`${product.name} — ${product.type}`}
                fill
                sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
              <span className="size-chip">{product.size}</span>
            </div>
            <div className="product-body">
              <p className="product-type">{product.type}</p>
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-meta">
                <strong>${product.price}</strong>
                <HeatMeter heat={product.heat} />
              </div>
              <div className="quick-add">
                <label>
                  <span className="sr-only">Quantity for {product.name}</span>
                  <select
                    value={quantity}
                    onChange={(event) =>
                      setQuantities((current) => ({
                        ...current,
                        [product.slug]: Number(event.target.value),
                      }))
                    }
                    aria-label={`Quantity for ${product.name}`}
                  >
                    {[1, 2, 3, 4, 5].map((option) => (
                      <option value={option} key={option}>Qty {option}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    addItem(
                      {
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                      },
                      quantity,
                    )
                  }
                >
                  Add to pack
                </button>
              </div>
            </div>
          </article>
        );
      })}
      <div className="pack-cta">
        <div>
          <p className="eyebrow">Mix. Match. Save.</p>
          <h3>Buy 4, Get 1 Free</h3>
          <p>Choose any five products. Your free pack is applied automatically.</p>
        </div>
        <Link className="button button-gold" href="/order">Build your pack</Link>
      </div>
    </div>
  );
}
