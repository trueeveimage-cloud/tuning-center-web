import brandLogo from "@/assets/tuning-center-logo.svg";
import { cn } from "@/lib/utils";

const fullLogoStyle = {
  backgroundImage: `url(${brandLogo})`,
  backgroundPosition: "50% 42%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "150% auto",
  mixBlendMode: "screen" as const,
};

const markStyle = {
  backgroundImage: `url(${brandLogo})`,
  backgroundPosition: "50% 27%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "480% auto",
  mixBlendMode: "screen" as const,
};

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block size-11 shrink-0 overflow-hidden", className)}
      style={markStyle}
    />
  );
}

export function BrandLogo({
  className,
  variant = "header",
}: {
  className?: string;
  variant?: "header" | "footer";
}) {
  return (
    <span
      role="img"
      aria-label="Tuning Center Örebro"
      className={cn(
        "block shrink-0 overflow-hidden",
        variant === "header"
          ? "aspect-[2.12] w-[8.75rem] sm:w-[9.25rem]"
          : "aspect-[2.12] w-64 max-w-full",
        className,
      )}
      style={fullLogoStyle}
    />
  );
}
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className={cn("size-11 overflow-visible", className)}
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="square">
        <path d="M32 5v6M32 53v6M5 32h6M53 32h6M12.9 12.9l4.2 4.2M46.9 46.9l4.2 4.2M51.1 12.9l-4.2 4.2M17.1 46.9l-4.2 4.2" />
        <circle cx="32" cy="32" r="21" />
      </g>
      <path
        d="M19 20h22l-2.7 7H32l-6.5 18h-8L24 27h-7.5L19 20Z"
        className="fill-primary"
      />
      <path
        d="M44.5 23.5c-2.2-2.4-5.3-3.7-8.8-3.7-8.2 0-14.8 6.2-14.8 14.2 0 6.3 4.6 10.4 11.2 10.4 3.6 0 6.8-1.2 9.5-3.8l-4.2-4.2c-1.3 1.2-2.8 1.8-4.4 1.8-2.6 0-4.3-1.7-4.3-4.5 0-4.2 3.2-7.7 7.2-7.7 1.7 0 3.1.6 4.2 1.7l4.4-4.2Z"
        className="fill-foreground"
        opacity="0.82"
      />
    </svg>
  );
}

export function BrandLogo({
  className,
}: {
  className?: string;
  variant?: "header" | "footer";
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <BrandMark className="shrink-0" />
      <span className="leading-none">
        <span className="block font-display text-xl font-bold uppercase tracking-[0.06em] sm:text-2xl">
          Tuning Center
        </span>
        <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.32em] text-primary">
          Örebro
        </span>
      </span>
    </span>
  );
}
