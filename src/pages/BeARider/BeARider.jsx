import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import coverageData from "../../api/coverage.js";
import beARider from "../../assets/agent_pending.png";
import UseAuth from "../../hooks/UseAuth.jsx";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios.jsx";

export default function BeARider() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const { user } = UseAuth();
    const [regions, setRegions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const axiosSecure = useAxios();
    const selectedRegion = watch("region");

    // unique regions
    useEffect(() => {
        const uniqueRegions = [...new Set(coverageData.map((d) => d.region))];
        setRegions(uniqueRegions);
    }, []);

    // region -> district
    useEffect(() => {
        if (selectedRegion) {
            const filtered = coverageData.filter(
                (d) => d.region === selectedRegion
            );
            const uniqueDistricts = [
                ...new Set(filtered.map((d) => d.district)),
            ];
            setDistricts(uniqueDistricts);
        } else {
            setDistricts([]);
        }
    }, [selectedRegion]);

    const onSubmit = (data) => {
        const riderData = {
            ...data,
            createdAt: new Date().toISOString(),
            status: "pending",
        };

        axiosSecure.post("/riders", riderData).then(res => {
            if (res.data.insertedId) {
                //  Sweet Alert success
                Swal.fire({
                    title: "Success!",
                    text: "Rider application submitted successfully ",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
        })
        // form clear
        reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6 grid md:grid-cols-2 gap-6">
                {/* Form */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">Be a Rider</h2>
                    <p className="text-sm text-gray-500">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {/* Name */}
                        <div>
                            <input
                                type="text"
                                defaultValue={user?.displayName || ""}
                                placeholder="Your Name"
                                className="input font-semibold input-bordered w-full"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <p className="text-red-500">Required</p>}
                        </div>

                        {/* Age */}
                        <div>
                            <input
                                type="number"
                                placeholder="Your Age"
                                className="input font-semibold input-bordered w-full"
                                {...register("age", {
                                    required: "Age is required",
                                    min: { value: 18, message: "Minimum age is 18" },
                                })}
                            />
                            {errors.age && (
                                <p className="text-red-500 text-sm">{errors.age.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="md:col-span-2">
                            <input
                                type="email"
                                defaultValue={user?.email || ""}
                                placeholder="Your Email"
                                className="input font-semibold input-bordered w-full"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Region */}
                        <div>
                            <select
                                className="select font-semibold select-bordered w-full"
                                {...register("region", { required: "Region is required" })}
                            >
                                <option value="">Select Region</option>
                                {regions.map((region, i) => (
                                    <option key={i} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                            {errors.region && (
                                <p className="text-red-500 text-sm">{errors.region.message}</p>
                            )}
                        </div>

                        {/* District */}
                        <div>
                            <select
                                className="select font-semibold select-bordered w-full"
                                {...register("district", { required: "District is required" })}
                            >
                                <option value="">Select District</option>
                                {districts.map((district, i) => (
                                    <option key={i} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>
                            {errors.district && (
                                <p className="text-red-500 text-sm">{errors.district.message}</p>
                            )}
                        </div>

                        {/* NID */}
                        <div>
                            <input
                                type="text"
                                placeholder="NID Number"
                                className="input font-semibold input-bordered w-full"
                                {...register("nid", {
                                    required: "NID is required",
                                    minLength: { value: 10, message: "NID must be at least 10 digits" },
                                })}
                            />
                            {errors.nid && (
                                <p className="text-red-500 text-sm">{errors.nid.message}</p>
                            )}
                        </div>

                        {/* Contact */}
                        <div>
                            <input
                                type="text"
                                placeholder="Contact Number"
                                className="input font-semibold input-bordered w-full"
                                {...register("contact", {
                                    required: "Contact number is required",
                                    pattern: {
                                        value: /^01[3-9]\d{8}$/,
                                        message: "Invalid Bangladeshi number",
                                    },
                                })}
                            />
                            {errors.contact && (
                                <p className="text-red-500 text-sm">{errors.contact.message}</p>
                            )}
                        </div>

                        {/* Bike Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Bike Name"
                                className="input font-semibold input-bordered w-full"
                                {...register("bikeName", { required: "Bike name is required" })}
                            />
                            {errors.bikeName && (
                                <p className="text-red-500 text-sm">{errors.bikeName.message}</p>
                            )}
                        </div>
                        {/* Bike Registration */}
                        <div>
                            <input
                                type="text"
                                placeholder="Bike Registration Number"
                                className="input font-semibold input-bordered w-full"
                                {...register("bikeNumber", {
                                    required: "Bike number is required",
                                })}
                            />
                            {errors.bikeNumber && (
                                <p className="text-red-500 text-sm">
                                    {errors.bikeNumber.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button className="btn btn-primary w-full text-black md:col-span-2">
                            Submit
                        </button>
                    </form>
                </div>

                {/* Image */}
                <div className="flex items-center justify-center">
                    <img src={beARider} alt="rider" className="w-64" />
                </div>
            </div>
        </div>
    );
}
