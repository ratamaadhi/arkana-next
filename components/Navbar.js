import React from "react";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { useState, useContext } from "react";
import useScroll from "../hooks/useScroll";
import { GlobalContext } from "../appContext/store";
import { getStrapiMedia, myLoader, shimmer, toBase64 } from "../lib/media";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { onScrollTo } from "../utils/onScrollTo";

function Navbar({ ...props }) {
  const { favicon } = useContext(GlobalContext);
  const { scroll: scrolling } = useScroll({ scrollTo: "scrollTop", limit: 10 });
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function DropDownNav() {
    return (
      <div
        id="navbarSm"
        className="sticky top-[64px] md:top-[96px] right-0 w-full py-4 px-2 lg:hidden flex flex-col space-y-4 border-t border-gray-300/50 text-emerald-700 bg-white shadow-md z-30"
      >
        <div
          onClick={
            router.route === "/"
              ? () => onScrollTo("homepageAbout")
              : () => router.push("/#homepageAbout")
          }
          className="px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-700/50 transition delay-75 duration-150 ease-in-out cursor-pointer"
        >
          Tentang Kami
        </div>
        <div
          onClick={
            router.route === "/"
              ? () => onScrollTo("homepageProduk")
              : () => router.push("/product")
          }
          className="px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-700/50 transition delay-75 duration-150 ease-in-out cursor-pointer"
        >
          Jasa Kami
        </div>
        <div
          onClick={
            router.route === "/"
              ? () => onScrollTo("homepageGallery")
              : () => router.push("/gallery")
          }
          className="px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-700/50 transition delay-75 duration-150 ease-in-out cursor-pointer"
        >
          Galeri
        </div>
        <div
          onClick={
            router.route === "/"
              ? () => onScrollTo("homepageFaq")
              : () => router.push("/faqs")
          }
          className="px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-700/50 transition delay-75 duration-150 ease-in-out cursor-pointer"
        >
          FAQ
        </div>
        <div
          onClick={() => onScrollTo("footer")}
          className="px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-700/50 transition delay-75 duration-150 ease-in-out cursor-pointer"
        >
          Hubungi Kami
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        id="navbarMd"
        className={`sticky top-0 right-0 w-full h-auto flex justify-between items-center px-4 md:px-8 md:py-4 lg:px-16 text-gray-700 z-30 transition-all ease-in-out ${
          (scrolling || open) && "bg-emerald-700 shadow-md"
        }`}
      >
        <Link href={"/"}>
          <a className="relative w-10 h-10 md:w-14 md:h-14 lg:w-14 lg:h-14 rounded-full overflow-hidden my-3 md:my-1">
            <Image
              src={getStrapiMedia(favicon)}
              alt="logo arkana"
              className="object-contain"
              loader={myLoader}
              layout="responsive"
              width={favicon.formats.thumbnail.width}
              height={favicon.formats.thumbnail.height}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(
                  favicon.formats.thumbnail.width,
                  favicon.formats.thumbnail.height
                )
              )}`}
            />
          </a>
        </Link>
        <div className="">
          <div
            className={`flex justify-center items-center p-2 md:text-2xl ${
              scrolling || open ? "text-white" : "text-emerald-700"
            } lg:hidden`}
            onClick={() => setOpen(!open)}
          >
            {!open ? <HiMenu /> : <HiOutlineX />}
          </div>
          <div
            className={`hidden lg:flex items-center space-x-4 text-sm ${
              !scrolling ? "text-emerald-700" : "text-white"
            } transition-all delay-150 duration-150 ease-in-out`}
          >
            <div
              onClick={
                router.route === "/"
                  ? () => onScrollTo("homepageAbout")
                  : () => router.push("/#homepageAbout")
              }
              className="px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-700/50 transition delay-75 duration-150 ease-in-out cursor-pointer"
            >
              Tentang Kami
            </div>
            <div
              onClick={
                router.route === "/"
                  ? () => onScrollTo("homepageProduk")
                  : () => router.push("/product")
              }
              className="px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-700/50 transition delay-75 duration-150 ease-in-out cursor-pointer"
            >
              Jasa Kami
            </div>
            <div
              onClick={
                router.route === "/"
                  ? () => onScrollTo("homepageGallery")
                  : () => router.push("/gallery")
              }
              className="px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-700/50 transition delay-75 duration-150 ease-in-out cursor-pointer"
            >
              Galeri
            </div>
            <div
              onClick={
                router.route === "/"
                  ? () => onScrollTo("homepageFaq")
                  : () => router.push("/faqs")
              }
              className="px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-700/50 transition delay-75 duration-150 ease-in-out cursor-pointer"
            >
              FAQ
            </div>
            <div
              onClick={() => onScrollTo("footer")}
              className="px-4 py-2 rounded-md hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-700/50 transition delay-75 duration-150 ease-in-out cursor-pointer"
            >
              Hubungi Kami
            </div>
          </div>
        </div>
      </div>
      {open && <DropDownNav />}
    </>
  );
}

export default Navbar;
