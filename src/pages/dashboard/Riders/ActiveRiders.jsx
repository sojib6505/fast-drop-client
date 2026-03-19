import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";

export default function ActiveRiders() {
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);
  const axiosSecure = useAxios();

  // GET active riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/active`);
      return res.data;
    },
  });

  // UPDATE status
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axiosSecure.patch(`/riders/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["activeRiders"]);
    },
  });

  // SweetAlert confirm for cancel
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this rider",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({ id, status: "cancelled" });
      }
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow-xl">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Region</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id} className="text-center border-b">
                <td className="py-2 px-4 border">{rider.name}</td>
                <td className="py-2 px-4 border">{rider.email}</td>
                <td className="py-2 px-4 border">{rider.status}</td>
                <td className="py-2 px-4 border">{rider.region}</td>
                <td className="py-2 px-4 border flex justify-center gap-2">
                  <button
                    onClick={() => handleCancel(rider._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-3">Rider Details</h2>

            <p><b>Name:</b> {selectedRider.name}</p>
            <p><b>Email:</b> {selectedRider.email}</p>
            <p><b>Age :</b> {selectedRider.age}</p>
            <p><b>Status:</b> {selectedRider.status}</p>
            <p><b>Region:</b> {selectedRider.region}</p>
            <p><b>District:</b> {selectedRider.district}</p>
            <p><b>NID:</b> {selectedRider.nid}</p>
            <p><b>Contact:</b> {selectedRider.contact}</p>
            <p><b>License:</b> {selectedRider.bikeNumber}</p>
            <p><b>Application-Time:</b> {selectedRider.createdAt}</p>

            <button
              onClick={() => setSelectedRider(null)}
              className="mt-4 bg-gray-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}