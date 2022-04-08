import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useSWR from "swr";
import { fetchAPI } from "../../lib/api";
import Image from "next/image";
import { getStrapiMedia, myLoader, shimmer, toBase64 } from "../../lib/media";

function Testimoni() {
  const [windowWidth, setWindowWidth] = useState(425);

  const { data: testimonis, error } = useSWR("/testimonis", fetchAPI);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full px-4 py-2 md:px-8 md:py-4 lg:px-16 mt-24 scroll-mt-20 md:scroll-mt-28">
      <h2 className="text-center text-2xl font-semibold text-emerald-700">
        Testimoni
      </h2>
      {!error && testimonis && (
        <div className="w-full md:w-11/12 lg:w-9/12 md:mx-auto mt-8">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={windowWidth > 425 ? 2 : 1}
            spaceBetween={30}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            navigation={windowWidth > 425 ? true : false}
            modules={[EffectCoverflow, Pagination, Navigation]}
          >
            {testimonis.map((testi, i) => (
              <SwiperSlide key={testi._id}>
                <div className="w-full h-[212px] bg-emerald-100 p-4 pb-6 border border-emerald-200">
                  <div className="flex w-full space-x-4 items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={getStrapiMedia(testi.customerPhoto)}
                        alt={testi.customerPhoto.hash}
                        className="object-cover"
                        loader={myLoader}
                        layout="fill"
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(
                            testi.customerPhoto.width,
                            testi.customerPhoto.height
                          )
                        )}`}
                      />
                    </div>
                    <div className="">
                      <div className="text-emerald-800 font-semibold">
                        {testi.customerName}
                      </div>
                      <div className="text-emerald-600 text-xs">
                        {testi.companyName}
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-sm mt-2 text-gray-700 leading-relaxed">
                    {testi.ulasan}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Testimoni;
