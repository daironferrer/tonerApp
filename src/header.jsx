function Header() {
    return(
        <div>
            <header class="bg-gray-950 py-4 px-6 flex items-center justify-between">
                <div class="text-lg font-bold font-[Roboto] text-white">Purple Crow IT Consumable Inventory</div>
                    <nav>
                        <ul class="flex space-x-4">
                            <li><a href="#" class="hover:text-purple-900 font-[Roboto] text-white">Toner</a></li>
                            <li><a href="#" class="hover:text-purple-900 font-[Roboto] text-white">Peripherals</a></li>
                        </ul>
                    </nav>
            </header>
        </div>
        
       
    )
}

export default Header
