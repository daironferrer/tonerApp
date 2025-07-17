function Header() {
    return(
        <div class="bg-[#171717] text-white font-[Roboto]">
        <div class="lg:pt-75 lg:pb-75 pt-30 pb-70 grid grid-cols-2 items-center">
            <h1 class="lg:text-4xl text-2xl font-bold m-4">Purple Crow Consumable Inventory</h1>
            <img src="/ITpurplecrow.jpg" alt="Purple crow IT" style={{width: '120px', height: '120px'}} />
            <p class="m-4">Tool created to keep track of all company IT consumables</p>
        </div>
        <div class="flex justify-center">
            <img></img>
        </div>
        </div>
    )
}

export default Header