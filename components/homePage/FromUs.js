import Image from "next/image";
import React from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia, myLoader, shimmer, toBase64 } from "../../lib/media";
import MdFormat from "../../utils/md";

function FromUs({ homepage }) {
  return (
    <div className="w-full px-4 py-2 md:px-8 md:py-4 lg:px-16 mt-24 scroll-mt-20 md:scroll-mt-28">
      {homepage &&
        homepage?.fromUs.map((frUs, i) => {
          return (
            <div key={frUs.id} className={`w-full flex flex-col ${i % 2 == 0 || i == 0 ? "md:flex-row-reverse" : "md:flex-row"} md:w-11/12 lg:w-9/12 md:mx-auto`}>
              <div className="w-full md:w-1/2">
                <Image
                  className="z-10"
                  loader={myLoader}
                  src={getStrapiMedia(frUs.shareImage)}
                  alt={frUs.shareImage.hash}
                  layout="responsive"
                  width={frUs.shareImage.width}
                  height={frUs.shareImage.height}
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(frUs.shareImage.width, frUs.shareImage.height)
                  )}`}
                />
              </div>
              <div className="w-full md:w-1/2 markdown-container prose prose-sm lg:prose-md xl:prose-lg mt-4 lg:self-center prose-h3:tracking-wider prose-h3:uppercase">
                {frUs.content && (
                  <MdFormat
                    markdown={frUs.content}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                  />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default FromUs;
