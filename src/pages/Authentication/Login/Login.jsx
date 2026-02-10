import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import UseAuth from "../../../hooks/UseAuth";

export default function Login() {
    const { signIn } = UseAuth();
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleSignIn = (data) => {
        const { email, password } = data;
        signIn(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                  navigate(from, { replace: true })
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    };

    return (
        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-5">
            <div>
                <p className="text-4xl font-bold">Welcome Back</p>
                <p className="text-xl">Login with FastDrop</p>
            </div>

            <fieldset className="fieldset space-y-3">
                {/* Email */}
                <label className="text-xl font-semibold">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="input w-full"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                {/* Password */}
                <label className="text-xl font-semibold">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    className="input w-full"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                        },
                    })}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}

                <div>
                    <a className="link link-hover">Forgot password?</a>
                </div>

                <button className="btn btn-primary mt-4 text-black w-full">
                    Login
                </button>
            </fieldset>

            <p>
                Don't have account ?{" "}
                <Link to="/register" className="font-semibold hover:underline mt-2">
                    Register
                </Link>
            </p>
        </form>
    );
}
