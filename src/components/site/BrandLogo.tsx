import logoFull from "@/assets/logo-full.png";
import logoMark from "@/assets/logo-mark.png";
import { cn } from "@/lib/utils";

const maskStyle = (url: string) =>
  ({
    WebkitMaskImage: `url(${url})`,
    maskImage: `url(${url})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    backgroundColor: "currentColor",
  }) as const;

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("logo-fade-in block aspect-[1.2] h-6 w-auto shrink-0", className)}
      style={maskStyle(logoMark)}
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
        "logo-fade-in block aspect-[2.14] shrink-0",
        variant === "header" ? "w-[8.25rem] sm:w-[9.25rem]" : "w-56 max-w-full",
        className,
      )}
      style={maskStyle(logoFull)}
    />
  );
}
