"use client";

import Script from "next/script";
import { useState } from "react";

export function Reviews() {
  const [panel, setPanel] = useState<"reviews" | "leave" | null>(null);

  return (
    <>
      <div className="review-actions">
        <button className="button button-gold" type="button" onClick={() => setPanel("reviews")}>
          Read customer reviews
        </button>
        <button className="button button-outline" type="button" onClick={() => setPanel("leave")}>
          Leave a review
        </button>
      </div>

      {panel && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setPanel(null)}>
          <div
            className="review-modal"
            role="dialog"
            aria-modal="true"
            aria-label={panel === "reviews" ? "Customer reviews" : "Leave a review"}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="modal-head">
              <h3>{panel === "reviews" ? "Customer Reviews" : "Leave a Review"}</h3>
              <button type="button" onClick={() => setPanel(null)} aria-label="Close review window">×</button>
            </div>
            <div className="review-widget">
              {panel === "reviews" ? (
                <Script src="https://widget.trustmary.com/veYxHgPpE" strategy="afterInteractive" />
              ) : (
                <Script src="https://widget.trustmary.com/pdEJpoOF9s" strategy="afterInteractive" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
