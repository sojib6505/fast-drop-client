import React from 'react'

export default function Faq() {
  return (
    <div className="py-10">
      {/* Header */}
      <div className="mb-12 px-4">
        <p className="text-4xl font-extrabold text-center">
          Frequently Asked Questions (FAQ)
        </p>
        <p className="max-w-3xl text-center mx-auto mt-4 text-gray-600">
          Find answers to the most common questions about our courier and delivery services.
        </p>
      </div>
      {/* FAQ */}
      <div  data-aos="fade-right" className="md:px-20 px-4 space-y-4">
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title font-semibold">
            Which areas do you cover for delivery?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            We provide delivery services across major cities and surrounding areas. Our coverage is expanding regularly to ensure faster delivery nationwide.
          </div>
        </div>

        <div  data-aos="fade-up-left" className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            How long does delivery usually take?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Inside the city, parcels are typically delivered within 24–48 hours. Intercity deliveries usually take 2–3 working days.
          </div>
        </div>

        <div  data-aos="fade-right" className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Is my parcel safe during delivery?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Yes, your parcel is completely safe. We ensure careful handling, secure packaging, and real-time tracking throughout the delivery process.
          </div>
        </div>

        <div  data-aos="fade-up-left" className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            Do you offer Cash on Delivery (COD)?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Yes, we offer Cash on Delivery (COD) service in selected locations to make transactions easier for your customers.
          </div>
        </div>

        <div  data-aos="fade-right" className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-xl">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">
            How can I track my shipment?
          </div>
          <div className="collapse-content text-sm text-gray-600">
            Once your parcel is shipped, you will receive a tracking ID that allows you to track your shipment in real time through our website.
          </div>
        </div>
      </div>
    </div>
  )
}
