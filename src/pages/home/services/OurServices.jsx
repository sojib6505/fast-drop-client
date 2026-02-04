import ServiceCard from "./ServiceCard";
import servicesData from "../../../api/servicesData";
export default function OurServices() {
    return (
        <section className="bg-[#063C3F] mx-auto mb-10 mt-5  py-5 sm:py-16  lg:py-20 rounded-2xl w-full max-w-[95%]">
            <div className="  px-4">
                {/* Section Header */}
                <div className="text-center text-white mb-10 sm:mb-12 lg:mb-14">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Our Services</h2>
                    <p className="max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed opacity-80">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                        From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {servicesData.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>

            </div>
        </section>
    );
}
