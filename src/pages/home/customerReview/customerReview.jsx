import ReviewSlider from "./ReviewSlider";
import customer_top from "../../../assets/customer_top.png"

export default function CustomerReview() {
  return (
    <div>
        <div className="flex mb-5 justify-center">
            <img className="max-w-3xs" src={customer_top} alt="" />
        </div>
        <div className="">
            <p className="text-4xl font-bold text-center mb-5">What our customers are sayings</p>
            <p className="text-center max-w-3xl mx-auto">
                Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
            </p>
        </div>
        <div>
            <ReviewSlider></ReviewSlider>
        </div>
    </div>
  )
}

