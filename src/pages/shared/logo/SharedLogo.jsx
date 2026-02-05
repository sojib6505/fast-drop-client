import React from 'react'
import logo from '../../../assets/logo.png'
export default function SharedLogo () {
    return (
        <div className='flex items-center '>
             <img  className='mb-3' src={logo} alt="" />
            <p className='text-2xl md:text-3xl font-bold -ml-2'>FastDrop</p>
        </div>
    )
}
