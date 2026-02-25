import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

export default function Payment() {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  return (
    <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
    </Elements>
  )
}
    