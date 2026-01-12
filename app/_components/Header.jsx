 "use client"

import { Search } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import LocationDropdown from './LocationDropdown';

function Header() {
    const { user, isSignedIn } = useUser();

    return (
        <header className='flex justify-between items-center px-6 py-4 md:px-20 border-b shadow-sm bg-white sticky top-0 z-50'>
            {/* Logo */}
            <img 
                src="/foodielogo.png" 
                alt="logo"
                className="h-20 w-auto object-contain cursor-pointer"
            />
            
            {/* Location & Search Section */}
            <div className="flex items-center gap-3">
                {/* Location Dropdown */}
                <LocationDropdown />
                
                {/* Search Bar - Hidden on mobile */}
                <div className="hidden md:flex items-center border border-gray-300 p-2 px-4 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors w-96 max-w-md">
                    <input 
                        type="text" 
                        placeholder="Search restaurants, dishes..."
                        className="bg-transparent w-full outline-none text-sm placeholder:text-gray-500"
                    />
                    <Search className="w-5 h-5 text-gray-400" />
                </div>
            </div>
            
            {/* Auth Buttons / User Profile */}
            <div className="flex gap-3 items-center">
                {isSignedIn ? (
                    <UserButton afterSignOutUrl="/" />
                ) : (
                    <>
                        <SignInButton mode="modal"> 
                            <Button variant="outline" className="hidden sm:flex">Login</Button>
                        </SignInButton>
                        <SignUpButton mode="modal"> 
                            <Button>Sign Up</Button>
                        </SignUpButton>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;