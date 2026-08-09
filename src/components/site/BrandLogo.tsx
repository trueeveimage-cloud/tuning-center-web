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
      className={cn("logo-fade-in block size-11 shrink-0 overflow-hidden", className)}
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
