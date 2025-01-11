import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const templates = [
  {
    id: 1,
    name: 'Modern Professional',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=500',
  },
  {
    id: 2,
    name: 'Creative Portfolio',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500',
  },
  {
    id: 3,
    name: 'Executive Brief',
    image: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=500',
  },
  {
    id: 4,
    name: 'Tech Innovator',
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=500',
  },
];

export const TemplateShowcase = () => {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Professional Templates
      </h2>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full max-w-4xl"
      >
        {templates.map((template) => (
          <SwiperSlide key={template.id}>
            <div className="relative group cursor-pointer">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-[600px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-semibold">{template.name}</h3>
                  <button className="mt-2 px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors">
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};