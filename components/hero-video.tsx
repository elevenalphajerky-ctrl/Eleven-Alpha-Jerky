"use client";

import { useEffect, useState } from "react";

const SCENES = [
  "/videos/banner/01.mp4",
  "/videos/banner/02.mp4",
  "/videos/banner/03.mp4",
  "/videos/banner/04.mp4",
  "/videos/banner/05.mp4",
  "/videos/banner/06.mp4",
  "/videos/banner/07.mp4",
  "/videos/banner/08.mp4",
];

export function HeroVideo() {
  const [scene, setScene] = useState(0);
  const nextScene = (scene + 1) % SCENES.length;

  useEffect(() => {
    const preload = document.createElement("video");
    preload.preload = "auto";
    preload.src = SCENES[nextScene];
    preload.load();

    return () => {
      preload.removeAttribute("src");
      preload.load();
    };
  }, [nextScene]);

  return (
    <video
      key={SCENES[scene]}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-label="Eleven Alpha Jerky flavor scenes"
      onEnded={() => setScene(nextScene)}
    >
      <source src={SCENES[scene]} type="video/mp4" />
    </video>
  );
}
