function Header() {
    return(

<div class="relative bg-black">
        <div class="relative w-full">
            <img src="./public/w2.jpg" class="w-full h-200"/>
            <h1 class="w-full absolute top-0 left-0 text-center mt-80 z-0 text-white text-5xl font-bold font-[Roboto]">Purple Crow Consumables Inventory</h1>
        </div>
        
        <nav class="fixed top-0 left-0 right-0 z-10 w-full flex justify-center items-center h-24 text-white font-[Roboto]">
            <ul class="flex items-center gap-6 text-sm py-5 px-6 text-white bg-neutral-800/30 backdrop-blur-lg rounded-md">
                <li><a href="#" class="hover:text-purple-400 transition-colors">Toner</a></li>
                <li><a href="#" class="hover:text-purple-400 transition-colors">Peripherals</a></li>
            </ul>
        </nav>
    </div>   
    )
}

export default Header
