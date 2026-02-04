import merchant from '../../../assets/location-merchant.png'
export default function Merchant() {
    return (
        <div className="bg-no-repeat bg-[url(assets/be_a_merchant_bg.png)] bg-[#03373D] rounded-2xl mb-10 p-5 md:p-20 ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={merchant}
                    className="max-w-sm rounded-lg "
                />
                <div>
                    <h1 className="text-2xl md:text-5xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white">
                       We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className='flex gap-5 '>
                        <button className="btn btn-primary text-black rounded-full">Become a Merchant</button>
                        <button className="btn btn-primary rounded-full btn-outline">Earn with Profast Courier</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
