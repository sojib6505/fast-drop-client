import React from 'react'
import authImg from '../assets/authImage.png'
import SharedLogo from '../pages/shared/logo/SharedLogo'
import { Outlet } from 'react-router'
export default function AuthenticationLayouts() {
    return (
        <div className="p-2 md:p-5 max-w-7xl mx-auto">
            <div>
                <SharedLogo></SharedLogo>
            </div>
            <div className="flex flex-col lg:flex-row-reverse gap-10 md:py-10 px-5 md:px-25">
                <div className='flex-1'>
                    <img
                        src={authImg}
                        className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-lg"
                    />
                </div>
                <div className='flex-1 w-full '>
                     <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}
