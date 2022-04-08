import Image from "next/image";
import React, { useContext } from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { useAbout } from "../../lib/api";
import { getStrapiMedia, myLoader, shimmer, toBase64 } from "../../lib/media";
import MdFormat from "../../utils/md";

function About() {
  const {about, isError, isLoading} = useAbout()
  return (
    <div className="relative w-full px-4 py-2 md:px-8 md:py-4 lg:px-16 mt-8 scroll-mt-20 md:scroll-mt-28" id="homepageAbout">
      <h1 className="text-2xl font-semibold text-emerald-700 text-center">
        Tentang Kami
      </h1>
      <div className="flex flex-col md:flex-row w-full md:w-11/12 lg:w-9/12 md:mx-auto">
        <div className="relative w-full h-auto md:w-1/2 md:self-center">
          <Image
            className="z-10"
            loader={myLoader}
            src={"/assets/2659676__1_-removebg-preview.png"}
            alt={"grab bag"}
            layout="responsive"
            width={530}
            height={471}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(530, 471)
            )}`}
          />
          <div className="w-[340px] h-[340px] md:w-[460px] md:h-[460px] absolute -bottom-20 -left-20 blur-md opacity-30 z-0">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#047857"
                d="M29.8,-37.1C39.7,-27.1,49.8,-18.8,56,-6.5C62.2,5.8,64.5,22.2,59,36.3C53.5,50.4,40.3,62.3,26.8,62.4C13.3,62.5,-0.5,50.8,-13.2,43.2C-25.8,35.5,-37.4,31.9,-47.1,23.2C-56.8,14.6,-64.8,0.9,-62.5,-10.9C-60.3,-22.7,-47.9,-32.5,-35.8,-42.1C-23.7,-51.7,-11.9,-61.1,-1,-59.9C9.9,-58.7,19.8,-47,29.8,-37.1Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </div>
        <div className="w-full md:w-1/2 markdown-container prose prose-sm lg:prose-md xl:prose-lg mt-4 text-emerald-700 lg:self-center">
          <h2 className="text-emerald-700 font-bold">{`Hello, kami dari Arkana Kemasan!:)`}</h2>
          {!isLoading && !isError && about.description && (
            <MdFormat
              markdown={about.description}
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            />
          )}
        </div>
      </div>
      {/* <div className="w-[340px] h-[340px] md:w-[460px] md:h-[460px] absolute -bottom-40 -right-48 blur-md opacity-30">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#047857"
            d="M29.8,-37.1C39.7,-27.1,49.8,-18.8,56,-6.5C62.2,5.8,64.5,22.2,59,36.3C53.5,50.4,40.3,62.3,26.8,62.4C13.3,62.5,-0.5,50.8,-13.2,43.2C-25.8,35.5,-37.4,31.9,-47.1,23.2C-56.8,14.6,-64.8,0.9,-62.5,-10.9C-60.3,-22.7,-47.9,-32.5,-35.8,-42.1C-23.7,-51.7,-11.9,-61.1,-1,-59.9C9.9,-58.7,19.8,-47,29.8,-37.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div> */}
    </div>
  );
}

export default About;
