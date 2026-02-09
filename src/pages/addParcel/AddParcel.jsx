import { useForm } from "react-hook-form";
import coverageData from "../../api/coverage";
import Swal from "sweetalert2";

export default function AddParcel() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            type: "document",
            title: "",
            weight: "",
            senderName: "",
            senderContact: "",
            senderRegion: "",
            senderCenter: "",
            senderAddress: "",
            senderInstruction: "",
            receiverName: "",
            receiverContact: "",
            receiverRegion: "",
            receiverCenter: "",
            receiverAddress: "",
            receiverInstruction: "",
        },
    });
    const watchParcelType = watch("type");
    const watchSenderRegion = watch("senderRegion");
    const watchReceiverRegion = watch("receiverRegion");
    const watchWeight = watch("weight");
    // Get unique regions
    const regions = [...new Set(coverageData.map((c) => c.region))];
    const getCenters = (region) => {
        return coverageData
            .filter((c) => c.region === region)
            .map((c) => c.city);
    };
    // Determine if delivery is within city or outside
    const isWithinCity = (senderCenter, receiverCenter) => {
        return senderCenter === receiverCenter;
    };
    // Calculate delivery cost based on your table
    const calculateCost = (data) => {
        const { type, weight, senderCenter, receiverCenter } = data;
        const withinCity = isWithinCity(senderCenter, receiverCenter);

        if (type === "document") {
            return withinCity ? 60 : 80;
        } else {
            const w = parseFloat(weight) || 0;
            if (w <= 3) {
                return withinCity ? 110 : 150;
            } else {
                const extra = (w - 3) * 40;
                return withinCity ? 110 + extra : 150 + extra + 40;
            }
        }
    };

    const onSubmit = (data) => {
        const cost = calculateCost(data);
        const now = new Date();
        const time = now.toLocaleString();

        // Generate unique parcel ID based on timestamp + random number
        const parcelId = `P-${now.getFullYear()}${(now.getMonth() + 1)
            .toString()
            .padStart(2, "0")}${now
                .getDate()
                .toString()
                .padStart(2, "0")}-${now
                    .getHours()
                    .toString()
                    .padStart(2, "0")}${now
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}${now
                            .getSeconds()
                            .toString()
                            .padStart(2, "0")}-${Math.floor(Math.random() * 1000)
                                .toString()
                                .padStart(3, "0")}`;

        let pricingDetails = `Parcel ID: ${parcelId} 
                             Parcel Type: ${data.type}
                             Weight: ${data.weight || "N/A"} kg
                             Sender Center: ${data.senderCenter}
                             Receiver Center: ${data.receiverCenter}
                             Delivery Cost: ৳${cost}
                             Time: ${time}`;
        Swal.fire({
            title: "Confirm Parcel Submission",
            html: `<pre class="text-left">${pricingDetails}</pre>`,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Submit",
            cancelButtonText: "Go Back",
            width: 500,
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    parcelId,
                    cost,
                    creation_date: now.toISOString(),
                };
                console.log("Parcel saved:", parcelData);
                Swal.fire({
                    title: "Success!",
                    text: "Parcel saved successfully!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    };


    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-2">Add Parcel</h1>
            <div className="divider"></div>
            <p className="text-2xl font-bold mb-6">
                Enter your parcel details
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Parcel Info */}
                <div className="p-4 rounded-lg  space-y-4 ">
                    <h2 className="text-xl font-semibold">Parcel Info</h2>

                    {/* Parcel Type as Radio */}
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="document"
                                {...register("type")}
                                className="radio checked:bg-primary"
                            />
                            Document
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="non-document"
                                {...register("type")}
                                className="radio checked:bg-primary"
                            />
                            Non-Document
                        </label>
                    </div>
                    {/* Title and Weight below the radios */}
                    <div className="flex flex-col md:flex-row gap-4 mt-2">
                        <input
                            {...register("title", { required: true })}
                            placeholder="Title"
                            className="input input-bordered w-full"
                        />
                        {watchParcelType === "non-document" && (
                            <input
                                {...register("weight", { min: 0 })}
                                type="number"
                                placeholder="Weight (kg)"
                                className="input input-bordered w-full"
                            />
                        )}
                    </div>
                </div>
                {/* Sender Info */}
                <div className="p-4  space-y-4  mt-4">
                    <h2 className="text-xl font-semibold">Sender Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            {...register("senderName", { required: true })}
                            placeholder="Sender Name"
                            className="input input-bordered w-full"
                        />
                        <input
                            {...register("senderContact", { required: true })}
                            placeholder="Contact"
                            className="input input-bordered w-full"
                        />
                        <select
                            {...register("senderRegion", { required: true })}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select Region</option>
                            {regions.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                        <select
                            {...register("senderCenter", { required: true })}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select Service Center</option>
                            {getCenters(watchSenderRegion).map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <input
                            {...register("senderAddress", { required: true })}
                            placeholder="Address"
                            className="input input-bordered w-full"
                        />
                        <textarea
                            {...register("senderInstruction", { required: true })}
                            placeholder="Pick up Instruction"
                            className="textarea textarea-bordered w-full"
                            rows={3}
                        />
                    </div>
                </div>
                {/* Receiver Info */}
                <div className="p-4 space-y-4 mt-4">
                    <h2 className="text-xl font-semibold">Receiver Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            {...register("receiverName", { required: true })}
                            placeholder="Receiver Name"
                            className="input input-bordered w-full"
                        />
                        <input
                            {...register("receiverContact", { required: true })}
                            placeholder="Contact"
                            className="input input-bordered w-full"
                        />
                        <select
                            {...register("receiverRegion", { required: true })}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select Region</option>
                            {regions.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                        <select
                            {...register("receiverCenter", { required: true })}
                            className="input input-bordered w-full"
                        >
                            <option value="">Select Service Center</option>
                            {getCenters(watchReceiverRegion).map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <input
                            {...register("receiverAddress", { required: true })}
                            placeholder="Address"
                            className="input input-bordered w-full"
                        />
                        <textarea
                            {...register("receiverInstruction", { required: true })}
                            placeholder="Delivery Instruction"
                            className="textarea textarea-bordered w-full"
                            rows={3}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary text-black shadow-2xs w-full mt-4">
                    Submit
                </button>
            </form>
        </div>

    );
};


