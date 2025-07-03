function Header() {
    return(
        <div>
            <header class="bg-gray-950 py-4 px-6 flex items-center justify-between">
                <div class="text-lg font-bold font-[Roboto] text-white">Purple Crow IT Toner Inventory</div>
                    <nav>
                        <ul class="flex space-x-4">
                            <li><a href="#" class="hover:text-purple-500 font-[Roboto] text-white">Home</a></li>
                        </ul>
                    </nav>
            </header>
            <div class="bg-black">
                <img src="./public/ITpurplecrow.jpg" class="w-75"/>
            </div>
        </div>
        
       
    )
}

export default Header
