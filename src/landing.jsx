import { Link } from "react-router-dom"

function Landing() {
    return(
        <div>
            <div class="grid grid-cols-1 place-items-center mt-15">
                <img src="/src/images/PurpleCrow-logo.webp" class="size-50"></img>
            </div>
            <div class="bg-[#171717] text-white font-[Roboto] lg:pt-10 pt-15">
            <div class="grid grid-cols-1 place-items-center">
                <h1></h1>
                <h1>What consumable would you like to track today?</h1>
            </div>
            <div class="flex justify-center m-5">
                <button class="rounded-2xl size-50 bg-purple-800 m-5"><Link to='/toners'>Toner</Link></button>
                <button class="rounded-2xl size-50 bg-purple-800 m-5"><Link to='/peripherals'>Peripherals</Link></button>
            </div>
        </div>
        </div>
    )
}

export default Landing