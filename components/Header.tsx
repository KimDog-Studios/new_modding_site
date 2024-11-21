'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/link

type Props = {}

function Header({}: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className='sticky top-0 w-full p-5 flex items-center justify-between bg-black z-20 font-black'>
            {/* Left Section - Logo */}
            <div className='flex items-center space-x-4'>
                <Link href="/">
                    <Image src="/assets/KimDogLogo.png" alt="Logo" width={65} height={65} />
                </Link>
            </div>

            {/* Middle Section - Search Bar */}
            <div className='flex-grow flex justify-center'>
                <input
                    type='text'
                    placeholder='🔎Search...'
                    className='border rounded px-3 py-2 w-2/3 focus:outline-none focus:border-blue-500 text-white max-w-72 bg-gray-700 outline-black'
                />
            </div>

            {/* Right Section - User Profile */}
            <div className='flex flex-row items-center text-gray-300 cursor-pointer space-x-2 font-black'>
                {/* Temporary Profile Video */}
                <div className="flex items-center space-x-2 w-full h-full">
                    <video
                        src="/assets/temp_pfp.mp4" // Temporary video for profile
                        width={65}
                        height={65}
                        autoPlay
                        loop
                        muted
                        className="rounded-full border-2 border-red-500"
                    />
                    <p className="text-sm text-white">In Development</p>
                </div>
            </div>
        </header>
    );
}

export default Header;
