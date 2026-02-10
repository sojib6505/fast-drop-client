import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import UseAuth from '../../../hooks/UseAuth'

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const { signUp } = UseAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const handleSignUp = (data) => {
        const { email, password } = data

        signUp(email, password)
            .then((userCredential) => {
                console.log(userCredential.user)
                navigate(from, { replace: true })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit(handleSignUp)}>
            <div>
                <p className="text-4xl font-bold">Create an Account</p>
                <p className="text-xl">Register with FastDrop</p>
            </div>

            <fieldset className="fieldset space-y-3">
                {/* Email */}
                <label className="text-xl font-semibold">Email</label>
                <input
                    type="email"
                    className="input w-full"
                    placeholder="Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid email address",
                        },
                    })}
                />
                {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}

                {/* Password */}
                <label className="text-xl font-semibold">Password</label>
                <input
                    type="password"
                    className="input w-full"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                        validate: {
                            hasNumberAndLetter: (value) =>
                                /[A-Za-z]/.test(value) && /\d/.test(value) ||
                                "Password must contain both letters and numbers",
                        },
                    })}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}

                <button type="submit" className="btn btn-primary mt-4 text-black w-full">
                    SignUp
                </button>
            </fieldset>
            <p>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold hover:underline">
                    Login
                </Link>
            </p>
        </form>
    )
}
