function Header() {
    return(
        <div>
            <header class="fixed top-0 left-0 right-0 py-4 px-6 flex items-center justify-between z-50 bg-black">
                <div class="text-3xl font-bold font-[Roboto] text-white">Purple Crow IT</div>
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
