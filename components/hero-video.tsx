export function HeroVideo() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Eleven Alpha Jerky flavor scenes"
    >
      <source src="/videos/eleven-alpha-banner-continuous.mp4" type="video/mp4" />
    </video>
  );
}
