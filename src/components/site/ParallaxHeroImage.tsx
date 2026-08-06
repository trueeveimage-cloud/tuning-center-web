import { useEffect, useRef } from "react";

type ParallaxHeroImageProps = {
  src: string;
  alt: string;
};

export function ParallaxHeroImage({ src, alt }: ParallaxHeroImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const offset = Math.min(window.scrollY * 0.16, 120);
      image.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      width={1920}
      height={1088}
      className="absolute inset-0 -z-20 size-full origin-center object-cover object-[62%_center] opacity-90 contrast-[1.05] saturate-[1.05] will-change-transform"
    />
  );
}
