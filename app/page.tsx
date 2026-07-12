import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { Reviews } from "@/components/reviews";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Bold Flavors · Quality Jerky</p>
            <h1>Made With <span>Purpose.</span></h1>
            <p className="hero-lead">
              Veteran-owned small batch jerky built through family, tradition,
              and years of refinement.
            </p>
            <div className="hero-actions">
              <Link className="button button-gold" href="/order">Order now</Link>
              <Link className="button button-outline" href="#flavors">View flavors</Link>
            </div>
            <div className="hero-trust">
              <span>Veteran Owned</span>
              <span>Small Batch</span>
              <span>Made in the USA</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame">
              <Image
                src="/images/hero-products.jpg"
                alt="Eleven Alpha Jerky package, hat, and jerky at sunset"
                fill
                sizes="(max-width: 820px) 100vw, 54vw"
                priority
                unoptimized
              />
            </div>
            <div className="hero-offer">
              <strong>Buy 4, Get 1 Free</strong>
              <span>Mix and match any five products</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section story-section" id="story">
        <div className="shell">
          <div className="section-heading story-heading">
            <p className="eyebrow">Our Story</p>
            <h2>Built Through Family, Tradition, and Years of Refinement.</h2>
            <Image
              className="heading-watermark"
              src="/images/eleven-alpha-logo-full.jpg"
              alt=""
              width={1536}
              height={1024}
              aria-hidden="true"
              unoptimized
            />
          </div>
          <div className="story-grid">
            <div className="story-copy">
              <p>
                Eleven Alpha Jerky wasn’t built overnight. What started over 15
                years ago making venison jerky for family and friends slowly
                evolved into a passion for perfecting bold flavor, consistent
                quality, and handcrafted production.
              </p>
              <p>
                Over the years, recipes were tested, adjusted, and refined
                through countless batches—balancing smoke, seasoning, heat,
                texture, and tenderness until each flavor developed its own
                identity. From Cajun heat to deep hickory smoke, every recipe
                reflects years of trial, feedback, and improvement.
              </p>
              <p>
                At the center of Eleven Alpha Jerky is family. The goal was never
                just to make jerky—it was to build something meaningful that
                reflected discipline, consistency, hard work, and pride in the
                finished product.
              </p>
              <p>
                My wife and kids became the toughest taste-test team imaginable.
                Every batch, flavor adjustment, and new idea was tested around
                the family table. Their feedback helped shape the flavors into
                what they are today.
              </p>
              <p>
                Eleven Alpha Jerky represents more than a snack. It represents
                years of refinement, family support, long hours, and the mindset
                of building something the right way—one batch at a time.
              </p>
            </div>
            <div className="story-image">
              <Image
                src="/images/jerky-spices.jpg"
                alt="Jerky with peppers, garlic, and spices"
                fill
                sizes="(max-width: 820px) 100vw, 46vw"
                unoptimized
              />
              <div className="story-stamp">15+ years of refinement</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section flavors-section" id="flavors">
        <div className="shell">
          <div className="section-heading centered">
            <p className="eyebrow">Our Flavors</p>
            <h2>Find Your Favorite.</h2>
            <p>
              Six bold options. Jerky is $10 per 2 oz pack. Danger Close Sticks
              are $10 per 3 oz pack.
            </p>
          </div>
          <ProductGrid />
        </div>
      </section>

      <section className="section benefits-section" aria-label="Why Eleven Alpha Jerky">
        <div className="shell benefits-grid">
          <div><b>Veteran Owned</b><span>Mission-driven small business.</span></div>
          <div><b>Small Batch</b><span>Focused attention every run.</span></div>
          <div><b>Quality Ingredients</b><span>Bold flavor. No shortcuts.</span></div>
          <div><b>Pickup or Shipping</b><span>Chicago, West Michigan, or shipped.</span></div>
        </div>
      </section>

      <section className="section reviews-section" id="reviews">
        <div className="shell narrow centered">
          <p className="eyebrow">From the Eleven Alpha Family</p>
          <h2>Real Feedback. Bold Flavor.</h2>
          <p>
            See what customers are saying, or tell us which flavor earned a
            permanent spot in your pack.
          </p>
          <Reviews />
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="shell contact-card">
          <div>
            <p className="eyebrow">Ready to Order?</p>
            <h2>Build Your Pack.</h2>
            <p>Choose your flavors, select pickup or shipping, and send your order directly to Eleven Alpha Jerky.</p>
          </div>
          <div className="contact-actions">
            <Link className="button button-gold" href="/order">Start your order</Link>
            <a href="mailto:elevenalphajerky@gmail.com">elevenalphajerky@gmail.com</a>
            <span>ElevenAlphaJerky.com</span>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <Image src="/images/eleven-alpha-logo-full.jpg" alt="Eleven Alpha Jerky" width={1536} height={1024} unoptimized />
          <p>© 2026 Eleven Alpha Jerky · Veteran-Owned Small Batch Jerky</p>
        </div>
      </footer>
    </main>
  );
}
