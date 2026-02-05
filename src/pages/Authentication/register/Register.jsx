import React from 'react'
import { useForm } from 'react-hook-form'


export default function Register() {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm()

    const handleSignUp = data => {
        console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(handleSignUp)} action="">
            <fieldset className="fieldset">
                <p className='text-2xl font-bold text-center'>Create An Account</p>
                {/* email */}
                <label className=" text-xl font-semibold">Email</label>
                <input type="email" className="input w-full" {...register('email',{required: 'Email is required'})} placeholder="Email" />
                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                {/* password */}
                <label className="text-xl font-semibold">Password</label>
                <input type="password" className="input w-full" 
                {...register('password',{required:'Password is required' ,minLength:{
                    value: 6,
                    message:'Password must be at least 6 characters'
                }})}
                placeholder="Password" />
                {errors.password && <p className='text-red-500' >{errors.password.message}</p>}
               
                <button type='submit' className="btn btn-primary mt-4 text-black">SignUp</button>
            </fieldset>
        </form>
    )
}
