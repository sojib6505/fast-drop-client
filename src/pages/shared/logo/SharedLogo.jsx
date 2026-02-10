import React from 'react'
import logo from '../../../assets/logo.png'
import { Link } from 'react-router'
export default function SharedLogo() {
    return (
        <Link to='/'>
            <div className='flex items-center '>
                <img className='mb-3' src={logo} alt="" />
                <p className='text-2xl md:text-3xl font-bold -ml-2'>FastDrop</p>
            </div>
        </Link>
    )
}
