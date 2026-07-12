"use client";

import { useEffect, useRef, useState } from "react";

export function Reviews() {
  const [panel, setPanel] = useState<"reviews" | "leave" | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panel || !widgetRef.current) return;

    const container = widgetRef.current;
    container.replaceChildren();

    const loading = document.createElement("p");
    loading.className = "review-loading";
    loading.textContent = panel === "reviews" ? "Loading customer reviews…" : "Loading review form…";
    container.appendChild(loading);

    const observer = new MutationObserver(() => {
      if (container.querySelector("iframe")) {
        loading.remove();
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    const timeout = window.setTimeout(() => {
      if (!container.querySelector("iframe")) {
        loading.textContent = "The review service is taking longer than expected. Please close this window and try again.";
      }
    }, 10000);

    const script = document.createElement("script");
    script.src = panel === "reviews"
      ? "https://widget.trustmary.com/veYxHgPpE"
      : "https://widget.trustmary.com/pdEJpoOF9s";
    script.async = true;
    script.onerror = () => {
      loading.textContent = "The review service could not load. Please try again.";
    };
    container.appendChild(script);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      container.replaceChildren();
    };
  }, [panel]);

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
            <div className="review-widget" ref={widgetRef} />
          </div>
        </div>
      )}
    </>
  );
}
