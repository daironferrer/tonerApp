"use client";

const cn = (...args) => args.filter(Boolean).join(" ");

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "transition-bg relative flex min-h-screen flex-col items-center justify-center bg-black text-white",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          "--aurora":
            "repeating-linear-gradient(100deg,#4c1d95_10%,#6d28d9_20%,#7e22ce_30%,#8b5cf6_40%,#a78bfa_50%)",
          "--dark-gradient":
            "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
          "--white-gradient":
            "repeating-linear-gradient(100deg,#1a1a1a_0%,#1a1a1a_7%,transparent_10%,transparent_12%,#1a1a1a_16%)",
          "--purple-900": "#4c1d95",
          "--purple-700": "#6d28d9",
          "--purple-600": "#7e22ce",
          "--purple-500": "#8b5cf6",
          "--purple-400": "#a78bfa",
          "--black": "#000",
          "--transparent": "transparent",
        }}
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px]
             [background-image:var(--dark-gradient),var(--aurora)]
             [background-size:300%,_200%]
             [background-position:50%_50%,50%_50%]
             opacity-60 blur-[16px] filter will-change-transform
             /* lock in purple scheme for the inner layer as well */
             [--aurora:repeating-linear-gradient(100deg,#4c1d95_10%,#6d28d9_20%,#7e22ce_30%,#8b5cf6_40%,#a78bfa_50%)]
             [--dark-gradient:repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)]
             after:absolute after:inset-0
             after:[background-image:var(--dark-gradient),var(--aurora)]
             after:[background-size:200%,_100%]
             after:[background-attachment:fixed]
             after:mix-blend-screen after:content-[""]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
          )}
        />
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
