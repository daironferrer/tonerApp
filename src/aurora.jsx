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
        "transition-bg relative min-h-screen bg-black text-white",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          "--aurora":
            "repeating-linear-gradient(100deg,#1a3a52_10%,#2c5aa0_20%,#3d7ec8_30%,#5a9fd4_40%,#7bb3e0_50%)",
          "--dark-gradient":
            "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
          "--white-gradient":
            "repeating-linear-gradient(100deg,#1a1a1a_0%,#1a1a1a_7%,transparent_10%,transparent_12%,#1a1a1a_16%)",
          "--blue-900": "#1a3a52",
          "--blue-700": "#2c5aa0",
          "--blue-600": "#3d7ec8",
          "--blue-500": "#5a9fd4",
          "--blue-400": "#7bb3e0",
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
             /* lock in grayish blue scheme for the inner layer as well */
             [--aurora:repeating-linear-gradient(100deg,#1a3a52_10%,#2c5aa0_20%,#3d7ec8_30%,#5a9fd4_40%,#7bb3e0_50%)]
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
