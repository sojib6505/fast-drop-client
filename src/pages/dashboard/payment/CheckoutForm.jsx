import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from "react"
import { useParams } from "react-router"
import useAxios from "../../../hooks/useAxios"
import UseAuth from "../../../hooks/UseAuth"


export default function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()
    const { parcelId } = useParams()
    const axiosSecure = useAxios()
    const [error, setError] = useState("")
    const [clientSecret, setClientSecret] = useState("")
    const {user} = UseAuth()
    

    //  Parcel Load
    const { data: parcelData } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })
    console.log(parcelData)
    const amount = parcelData?.cost * 100
    //  Create Payment Intent
    useEffect(() => {
        if (parcelData?.cost) {
            const createIntent = async () => {
                const res = await axiosSecure.post("/create-payment-intent", {
                    amount: parcelData.cost * 100
                })
                setClientSecret(res.data.clientSecret)
            }
            createIntent()
        }
    }, [parcelData])

    //  Submit Payment
    const [isPaid, setIsPaid] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || !clientSecret || isPaid) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card },
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === "succeeded") {
                setError("");
                setIsPaid(true); 
                const paymentInfo = {
                    parcelId: parcelId,
                    transactionId: paymentIntent.id,
                    amount: parcelData.cost,
                    email: user.email,
                    date: new Date()
                }
                await axiosSecure.post("/payments", paymentInfo);
                await axiosSecure.patch(`/parcels/${parcelId}`, {
                     transactionId: paymentIntent.id });
                alert("Payment Successful");
            }
        } catch (err) {
            console.error(err);
            setError("Payment failed. Try again.");
        }

    };

    return (
        <div className="md:w-130 mx-auto">
            <form onSubmit={handleSubmit}>
                <CardElement className="p-4 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 transition" />

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || isPaid}
                    className="btn btn-primary text-black w-full mt-4"
                >
                    {isPaid ? "Paid" : `Pay $ ${parcelData?.cost}`}
                </button>
            </form>
        </div>
    )
}