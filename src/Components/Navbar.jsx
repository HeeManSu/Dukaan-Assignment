import React from 'react'

const Navbar = () => {
    return (
        <nav className="md:mx-[128px]  relative z-10 flex  justify-between px-5 py-5 sm:px-0">
            <img src="/logo-white.svg" alt="Dukaan logo" />
            <div className="flex items-center">
                <button className="mr-8 text-white transition-all text-[18px] hover:underline">
                    Sign in
                </button>
                <button className='rounded px-2 py-1 text-xs font-medium transition-all disabled:cursor-not-allowed disabled:opacity-70 sm:px-5 sm:py-2 sm:text-lg bg-white text-primary hover:text-primary/80'>Dukaan for PC</button>
            </div>
        </nav>
    )
}

export default Navbar