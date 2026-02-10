import { useQuery } from "@tanstack/react-query"
import useAxios from "../../hooks/useAxios"
import UseAuth from "../../hooks/UseAuth"

export default function MyPercel() {
    const { user } = UseAuth()
    const axiosSecure = useAxios()

    const { data = [], isLoading, error } = useQuery({
        queryKey: ['parcels', user?.email],
        enabled: !!user?.email, // ensures user.email exists
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data || []
        }
    })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading parcels</p>
    if (data.length === 0) return <p>No parcels found</p>

    console.log(data)

    return (
        <div>
            <h1>{data.length}</h1>
            
        </div>
    )
}
