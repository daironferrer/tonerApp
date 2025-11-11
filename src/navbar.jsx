import { Link } from 'react-router-dom'

function Navbar() {
    return(
<div class="relative bg-black">
        <nav class="fixed top-0 left-0 right-0 z-10 w-full flex justify-center items-center h-24 text-white font-[Roboto]">
            <ul class="flex items-center gap-6 text-sm py-5 px-6 text-white bg-black/20 
              backdrop-blur-sm border border-white/20 rounded-xl 
              shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] 
              p-6 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br
             before:from-white/30 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none 
              after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/15 after:via-transparent 
              after:to-transparent after:opacity-50 after:pointer-events-none">
                <li><Link to="/" class="hover:text-purple-400 transition-colors">Home</Link></li>
                <li><Link to="/toners" class="hover:text-purple-400 transition-colors">Toner</Link></li>
                <li><Link to="/peripherals" class="hover:text-purple-400 transition-colors">Peripherals</Link></li>
                <li><a href="https://purplecrow.freshservice.com/cmdb/items" class="hover:text-purple-400 transition-colors">Fresh Service</a></li>
            </ul>
        </nav>
    </div> 

    )
}

export default Navbar
