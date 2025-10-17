import { Link } from "react-router-dom";

function Landing() {
    return(
        <div class="bg-linear-65 from-black to-gray-800 min-h-screen">
            <div className="flex flex-col items-center">
              <div>
              <img
                src="/src/images/PurpleCrow-logo.webp"
                className="lg:size-80 size-40 rounded-full m-5"
              />
              </div>

              <div className="lg:w-1/2 text-center lg:text-2xl">
              <h2 className="text-2xl font-bold mb-4">Purple Crow IT Inventory</h2>
              </div>
              </div>
            <div class="text-white font-[Roboto] pt-5">
            <div class="grid grid-cols-1 place-items-center">
                <h1></h1>
                <h1>What consumable would you like to track today?</h1>
            </div>
            <div class="flex justify-center m-5">
                <Link to='/toners' 
                    class="flex justify-center items-center h-20 w-50 m-5 text-sm text-white bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl hover:shadow-white/10 hover:border-white/40 transition-all duration-300">Toner</Link>
                <Link to='/peripherals' 
                    class="flex justify-center items-center h-20 w-50 m-5 text-sm text-white bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl hover:shadow-white/10 hover:border-white/40 transition-all duration-300">Peripherals</Link>
            </div>
        </div>
        </div>
    )
}

export default Landing