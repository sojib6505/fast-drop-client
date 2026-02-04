import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import customerReviews from "../../../api/customerReviews";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function ReviewSlider() {
  return (
    <div className="py-20 bg-[#F6F9FC]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={600}
        pagination={{ clickable: false }}
        // navigation
        spaceBetween={20}
        slidesPerView={5}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
        className="max-w-7xl mx-auto"
      >
        {customerReviews.map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive }) => (
              <div
                className={`card bg-white px-5 py-5 shadow-xl transition-all duration-500
                ${isActive ? "opacity-100 scale-100" : "opacity-40 scale-90"}`}
              >
                <div className="text-5xl text-primary opacity-30">❝</div>
                <p className="text-gray-600 mb-6">{item.review}</p>

                <div className="flex items-center gap-3 border-t-2 pt-2 border-dashed  border-gray-300">
                  <img
                    src={item.img}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-400">Customer</p>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
