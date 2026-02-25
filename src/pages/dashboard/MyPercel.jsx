import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import useAxios from "../../hooks/useAxios"
import UseAuth from "../../hooks/UseAuth"
import { useNavigate } from "react-router"

export default function MyPercel() {
    const { user } = UseAuth()
    const axiosSecure = useAxios()
    const [selectedParcel, setSelectedParcel] = useState(null)
    const navigate = useNavigate()

    const { data = [], isLoading, error, refetch } = useQuery({
        queryKey: ['parcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data || []
        }
    })
    const handlePay = (parcelId) => {
        //  console.log("Pay for parcel ID:", e)
        navigate(`/dashboard/payment/${parcelId}`)
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure?")
        if (!confirmDelete) return

        try {
            await axiosSecure.delete(`/parcels/${id}`)
            refetch()
        } catch (error) {
            console.log(error)
        }
    }

    if (isLoading) return <p className="p-6">Loading...</p>
    if (error) return <p className="p-6 text-red-500">Error loading parcels</p>
    if (data.length === 0) return <p className="p-6">No parcels found</p>

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
                My Parcels ({data.length})
            </h2>

            {/* Table Wrapper */}
            <div className="overflow-x-auto bg-base-200 rounded-xl shadow">
                <table className="table table-zebra text-sm sm:text-base">
                    <thead className="bg-base-300">
                        <tr>
                            <th>#</th>
                            <th>Parcel ID</th>
                            <th>Type</th>
                            <th className="hidden md:table-cell">Receiver</th>
                            <th>Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                <td className="font-semibold">
                                    {parcel.parcelId}
                                </td>
                                <td className="capitalize">
                                    {parcel.type}
                                </td>

                                {/* Hide on small screen */}
                                <td className="hidden md:table-cell">
                                    <p className="font-medium">
                                        {parcel.receiverName}
                                    </p>
                                    <p className="text-xs opacity-70">
                                        {parcel.receiverRegion},{" "}
                                        {parcel.receiverCenter}
                                    </p>
                                </td>

                                <td>৳{parcel.cost}</td>

                                <td className="space-x-1 sm:space-x-2">
                                    <button
                                        onClick={() => setSelectedParcel(parcel)}
                                        className="btn btn-xs btn-info"
                                    >
                                        Details
                                    </button>

                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>

                                    {/* Pay Button */}
                                    {!parcel.paid ? (
                                        <button
                                            onClick={() => handlePay(parcel._id)}
                                            className="btn btn-xs sm:btn-sm btn-success"
                                        >
                                            Pay
                                        </button>
                                    ) :(
                                        <button
                                            className="btn btn-xs sm:btn-sm "
                                        >
                                            Paid
                                        </button>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* RESPONSIVE MODAL */}
            {selectedParcel && (
                <dialog open className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box w-full max-w-lg sm:max-w-3xl">
                        <h3 className="font-bold text-lg mb-4">
                            Parcel Details
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                            <div>
                                <p className="font-semibold">Sender Info</p>
                                <p>Name: {selectedParcel.senderName}</p>
                                <p>Contact: {selectedParcel.senderContact}</p>
                                <p>Address: {selectedParcel.senderAddress}</p>
                            </div>

                            <div>
                                <p className="font-semibold">Receiver Info</p>
                                <p>Name: {selectedParcel.receiverName}</p>
                                <p>Contact: {selectedParcel.receiverContact}</p>
                                <p>Address: {selectedParcel.receiverAddress}</p>
                            </div>

                            <div>
                                <p className="font-semibold">Parcel Info</p>
                                <p>Type: {selectedParcel.type}</p>
                                <p>Weight: {selectedParcel.weight || "N/A"}</p>
                                <p>Cost: ৳{selectedParcel.cost}</p>
                            </div>

                            <div>
                                <p className="font-semibold">Extra</p>
                                <p>Parcel ID: {selectedParcel.parcelId}</p>
                                <p>
                                    Date: {new Date(
                                        selectedParcel.creation_date
                                    ).toLocaleString()}
                                </p>
                            </div>

                        </div>

                        <div className="modal-action">
                            <button
                                className="btn btn-sm sm:btn-md"
                                onClick={() => setSelectedParcel(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    )
}
