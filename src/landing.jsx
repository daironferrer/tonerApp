import { Link } from "react-router-dom";
import { AuroraBackground } from "./aurora";

function Landing() {
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
          <div class="text-center mb-8">
            <h3 class="text-lg lg:text-xl text-neutral-300">
              What consumable would you like to track today?
            </h3>
          </div>

          <div class="flex flex-col items-center gap-6">
            <Link
              to="/toners"
              class="group relative flex flex-col items-center justify-center 
              h-28 w-11/12 sm:h-36 sm:w-72 md:h-44 md:w-96 lg:h-52 lg:w-[28rem]
              rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl
              text-white text-center transition-all duration-500
              hover:border-white/30 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
            >
              <h1 class="font-semibold text-xl lg:text-2xl mb-1">Printer Toner</h1>
              <p class="text-sm sm:text-base text-neutral-300">
                Manage all printer toner cartridges
              </p>
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            <Link
              to="/peripherals"
              class="group relative flex flex-col items-center justify-center 
              h-28 w-11/12 sm:h-36 sm:w-72 md:h-44 md:w-96 lg:h-52 lg:w-[28rem]
              rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl
              text-white text-center transition-all duration-500
              hover:border-white/30 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
            >
              <h1 class="font-semibold text-xl lg:text-2xl mb-1">Peripherals</h1>
              <p class="text-sm sm:text-base text-neutral-300">
                Track keyboards, mice and office accessories
              </p>
              <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          </div>
        </section>
      </div>
    </AuroraBackground>
  );
}

export default Landing;
