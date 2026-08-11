import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
};

type PhotoGalleryProps = {
  photos: GalleryPhoto[];
  className?: string;
  figureClassName?: string;
};

export function PhotoGallery({
  photos,
  className = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
  figureClassName = "aspect-[4/3]",
}: PhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? current : (current + delta + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, step]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <div className={className}>
        {photos.map((photo, index) => (
          <figure
            key={photo.src}
            className={`group relative overflow-hidden rounded-[0.75rem] border border-border bg-background shadow-[0_24px_60px_-42px_rgba(41,32,24,.7)] ${figureClassName}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Förstora bild: ${photo.caption}`}
              className="size-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            </button>
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-4 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-background/90">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Stäng bildvisning"
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-background/25 text-background hover:bg-background/10"
          >
            <X className="size-5" />
          </button>

          {photos.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Föregående bild"
                onClick={(event) => {
                  event.stopPropagation();
                  step(-1);
                }}
                className="absolute left-3 grid size-11 place-items-center rounded-full border border-background/25 text-background hover:bg-background/10 sm:left-6"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Nästa bild"
                onClick={(event) => {
                  event.stopPropagation();
                  step(1);
                }}
                className="absolute right-3 grid size-11 place-items-center rounded-full border border-background/25 text-background hover:bg-background/10 sm:right-6"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          ) : null}

          <figure
            className="max-h-full w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.alt}
              className="mx-auto max-h-[78vh] w-auto max-w-full rounded-[0.75rem] object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-background/80">
              {active.caption}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
