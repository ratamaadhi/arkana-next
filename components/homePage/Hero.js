import Image from "next/image";
import React from "react";
import { getStrapiMedia, myLoader, shimmer, toBase64 } from "../../lib/media";
import { onScrollTo } from "../../utils/onScrollTo";

function Hero({ homepage }) {
  const { seo } = homepage;
  return (
    <div id="hompageHero" className="relative w-full lg:min-h-[calc(100vh-20vh)] lg:items-center flex flex-col-reverse md:flex-col lg:flex-row justify-center px-4 py-2 md:px-8 md:py-4 lg:px-16">
      <div className="w-full lg:w-1/2 lg:pl-[15%] space-y-2 lg:space-y-4 mt-4 md:mt-0 xl:mt-12 z-10">
        <h2 className="text-base text-emerald-600 uppercase font-semibold tracking-wider">
          {seo.metaTitle}
        </h2>
        <h1 className="text-2xl font-bold text-emerald-700">
          {seo.metaSubTitle}
        </h1>
        <p className="text-sm text-gray-600">{seo.metaDescription}</p>
        <button onClick={() => onScrollTo("homepageAbout")} className="px-6 py-2 bg-emerald-700 rounded-lg text-white shadow-md shadow-emerald-500/50">
          Mulai
        </button>
      </div>
      <div className="w-full md:w-2/5 lg:w-1/3 lg:mr-auto lg:ml-4 md:mx-auto h-auto md:mt-4 lg:mt-0 z-10">
        <Image
          src={getStrapiMedia(seo.shareImage)}
          loader={myLoader}
          alt={seo.shareImage.hash}
          layout="responsive"
          width={seo.shareImage.width}
          height={seo.shareImage.height}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(
              seo.shareImage.formats.thumbnail.width,
              seo.shareImage.formats.thumbnail.height
            )
          )}`}
        />
      </div>
    </div>
  );
}

export default Hero;
