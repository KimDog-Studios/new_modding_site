'use client';
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Button from '@mui/material/Button';
import Link from 'next/link'; // Import Link for routing

function Center() {
    return (
        <div>
            {/* Full Page Video Background */}
            <div className="relative h-screen">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/assets/test.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Centered Typewriter and Buttons Section */}
                <div className='flex flex-col items-center justify-center h-screen space-y-5 relative z-10'>
                    <div className='text-4xl'>
                        <Typewriter
                            words={["KimDog's Modding", 'Quality Mods', 'Regular Updates']}
                            loop={0}
                            cursor
                            cursorStyle='|'
                            typeSpeed={55}
                            deleteSpeed={150}
                            delaySpeed={1000}
                        />
                    </div>

                    {/* Buttons Section */}
                    <div className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-5'>
                        {/* ETS 2 Button with Link */}
                        <Link href="/mods/ets2">
                            <Button
                                variant="contained"
                                className="bg-blue-500 hover:bg-blue-700 text-white"
                            >
                                Euro Truck Simulator 2 Mods
                            </Button>
                        </Link>

                        {/* ATS Button with Link */}
                        <Link href="/mods/ats">
                            <Button
                                variant="contained"
                                className="bg-blue-500 hover:bg-blue-700 text-white"
                            >
                                American Truck Simulator Mods
                            </Button>
                        </Link>

                        {/* Assetto Corsa Button with Link */}
                        <Link href="/mods/assetto_corsa">
                            <Button
                                variant="contained"
                                className="bg-blue-500 hover:bg-blue-700 text-white"
                            >
                                Assetto Corsa Mods
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Center;
