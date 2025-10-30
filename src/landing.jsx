import { Link } from "react-router-dom";
import { AuroraBackground } from "./aurora";

function Landing() {
    return(
        < AuroraBackground >
        <div>
            <div class="flex items-center m-5 md:m-5 lg:m-10 h-24">
                <h1 class="text-white">Purple Crow</h1>
                <img src="/PurpleCrow-logo.webp" class="size-15 object-contain"/>
            </div>
            <div class="flex justify-center mt-50">
              <div class="lg:w-1/2 text-center lg:text-2xl">
              <h2 class="text-5xl lg:text-8xl font-bold mb-4 text-white">IT Inventory</h2>
              </div>
            </div>

            <div class="text-white font-[Roboto] pt-5">
            <div class="grid grid-cols-1 place-items-center">
                <h1 class="lg:text-xl">What consumable would you like to track today?</h1>
            </div>
            <div class="flex flex-col items-center m-20">
                <Link
                to="/toners"
                class="flex flex-col items-center justify-center m-2
                h-28 w-11/12 sm:h-36 sm:w-64 md:h-44 md:w-100 lg:h-52 lg:w-150
                text-base sm:text-lg md:text-xl
                text-white text-center
                 bg-neutral-800/30 backdrop-blur-lg
                rounded-2xl border border-white/10 shadow-xl
                hover:shadow-white/5 hover:border-white/40
                transition-all duration-300 cursor-pointer"
                >
                <h1 class="font-semibold lg:text-2xl m-2">Printer Toner</h1>
                <p class="text-sm sm:text-base">Manage all printer toner cartridges</p>
                </Link>

                <Link 
                to="/peripherals"
                class="flex flex-col items-center justify-center m-2
                h-28 w-11/12 sm:h-36 sm:w-64 md:h-44 md:w-100 lg:h-52 lg:w-150
                text-base sm:text-lg md:text-xl
                text-white text-center
                 bg-neutral-800/30 backdrop-blur-lg
                rounded-2xl border border-white/10 shadow-xl
                hover:shadow-white/5 hover:border-white/40
                transition-all duration-300 cursor-pointer">
                <h1 class="font-semibold lg:text-2xl m-2">Peripherals</h1>
                <p class="text-sm">Track keyboards, mice and office accessories</p>
                </Link>
            </div>
            </div>
        </div>
        </AuroraBackground>
    )
}

export default Landing