import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import useSWR from "swr";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia, myLoader, shimmer, toBase64 } from "../../lib/media";

function Galleries() {
  const route = useRouter();
  const { data: galleries } = useSWR("/galleries?_limit=9", fetchAPI);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const showImage = (image) => {
    setIsOpen(!isOpen);
    setSelected(image);
  };

  const breakPoints = {
    default: 4,
    1024: 4,
    768: 3,
    425: 2,
  };
  return (
    <>
      {isOpen ? (
        <div
          className={`fixed inset-0 h-screen w-auto z-50 flex justify-center items-center bg-emerald-50`}
          onClick={() => setIsOpen(false)}
        >
          <div className="relative h-full w-full flex items-center justify-center">
            {selected && (
              <img
                src={getStrapiMedia(selected.foto)}
                alt={selected.foto.hash}
                className={`cursor-pointer block box-border h-auto max-h-full w-auto max-w-full object-cover transition duration-300 ease-in-out`}
              />
            )}
          </div>
        </div>
      ) : null}
      <div
        id="homepageGallery"
        className="relative w-full px-4 py-2 md:px-8 md:py-4 lg:px-16 mt-8 scroll-mt-20 md:scroll-mt-28"
      >
        <h2 className="text-2xl font-semibold text-emerald-700 text-center">
          Galleries
        </h2>
        <div className="w-full md:w-4/5 md:mx-auto mt-6">
          <Masonry
            breakpointCols={breakPoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {galleries &&
              galleries.map((item, i) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => showImage(item)}
                    className={`inline-block align-middle overflow-hidden w-full rounded-xl h-auto mb-2`}
                  >
                    <Image
                      key={item.id}
                      loader={myLoader}
                      src={getStrapiMedia(item.foto)}
                      alt={item.foto.hash}
                      layout="responsive"
                      width={item.foto.width}
                      height={item.foto.height}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(
                          item.foto.width,
                          item.foto.height
                        )
                      )}`}
                      className={`hover:scale-110 cursor-pointer w-full h-auto object-cover transition duration-300 ease-in-out rounded-xl`}
                    />
                  </div>
                );
              })}
          </Masonry>
        </div>
        {route.route == "/" ? (
          <div className="flex justify-center items-center w-full mt-2 cursor-pointer">
            <Link href="/gallery">
              <a className="px-6 py-2 rounded-lg bg-emerald-700 text-emerald-50 shadow-md shadow-emerald-500/50">
                More Galleries
              </a>
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Galleries;
