import { Link } from "react-router-dom";
import { AuroraBackground } from "./aurora";
import { initDavidAI } from 'david-ai';
import { useEffect } from "react";

function Landing() {
  useEffect(() => {
    initDavidAI();
  }, []);
  return (
    <AuroraBackground>
      <div class="min-h-screen flex flex-col">
        <header class="flex items-center justify-center lg:justify-start gap-3 m-6 lg:m-10">
          <img src="/PurpleCrow-logo.webp" class="w-10 h-10 lg:w-14 lg:h-14 object-contain" />
          <h1 class="text-white text-2xl lg:text-3xl font-semibold tracking-tight">
            Purple Crow
          </h1>
        </header>

        <section class="flex flex-col items-center text-center mt-20 lg:mt-32">
          <h2 class="text-white text-5xl sm:text-6xl lg:text-8xl font-bold mb-4 tracking-tight">
            IT Inventory
          </h2>
          <p class="text-neutral-300 text-lg lg:text-2xl max-w-xl leading-relaxed">
            Effortlessly manage Purple Crow consumables.
          </p>
        </section>

        <section class="text-white font-[Roboto] mt-16">

          <div class="flex flex-col items-center gap-6">
            <Link
              to="/toners"
              class="h-28 w-11/12 sm:h-36 sm:w-72 md:h-44 md:w-96 lg:h-45 lg:w-[28rem] bg-black/20 
              backdrop-blur-sm border border-white/50 rounded-2xl 
              shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] 
              p-6 text-white relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br
             before:from-white/30 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none 
              after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/15 after:via-transparent 
              after:to-transparent after:opacity-50 after:pointer-events-none"
            >
              <h1 class="text-xl lg:text-2xl mb-3">Printer Toner</h1>
              <p class="text-sm sm:text-base text-neutral-300">
                Manage all printer toner cartridges
              </p>
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            <Link
              to="/peripherals"
              class="h-28 w-11/12 sm:h-36 sm:w-72 md:h-44 md:w-96 lg:h-45 lg:w-[28rem] bg-black/20 
              backdrop-blur-sm border border-white/50 rounded-2xl 
              shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] 
              p-6 text-white relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br
             before:from-white/30 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none 
              after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/15 after:via-transparent 
              after:to-transparent after:opacity-50 after:pointer-events-none"
            >
              <h1 class="text-xl lg:text-2xl mb-3">Peripherals</h1>
              <p class="text-sm sm:text-base text-neutral-300">
                Track keyboards, mice and office accessories
              </p>
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>
        </section>
      </div>
    </AuroraBackground>
  );
}

export default Landing;
