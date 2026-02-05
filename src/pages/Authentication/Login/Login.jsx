import React from 'react'

export default function Login() {
    return (
        
            <form action="">
                <fieldset className="fieldset">
                    <p className='text-2xl font-bold text-center'>Login and Explore</p>
                    <label className=" text-xl font-semibold">Email</label>
                    <input type="email" className="input w-full" placeholder="Email" />
                    <label className="text-xl font-semibold">Password</label>
                    <input type="password" className="input w-full" placeholder="Password" />
                    <div><a className="link link-hover">Forgot password?</a></div>
                      <button className="btn btn-primary mt-4 text-black">Login</button>
                </fieldset> 
            </form>
        
    )
}
