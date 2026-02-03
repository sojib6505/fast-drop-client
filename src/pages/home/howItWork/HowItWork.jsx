

import { FaTruckPickup, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaTruckPickup />,
    },
    {
      id: 2,
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaMoneyBillWave />,
    },
    {
      id: 3,
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaWarehouse />,
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <FaBuilding />,
    },
  ];

  return (
    <section className=" py-10 md:px-10 rounded-2xl">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-10 text-left">
          How it Works
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              <div className="card-body">
                <div className="text-primary text-3xl mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-lg">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
