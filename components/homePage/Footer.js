import Image from "next/image";
import Link from "next/link";
import React from "react";
import { myLoader, shimmer, toBase64 } from "../../lib/media";
import parse from "html-react-parser";
import {
  RiFacebookFill,
  RiInstagramFill,
  RiWhatsappFill,
  RiTwitterFill,
} from "react-icons/ri";
import { useAbout } from "../../lib/api";

function Footer() {
  const { about, isLoading, isError } = useAbout();

  return (
    <div
      id="footer"
      className="w-full px-4 py-2 md:px-8 md:py-4 lg:px-16 mt-24 bg-emerald-700 scroll-mt-20 md:scroll-mt-28"
    >
      {!isLoading && !isError && about && (
        <div className="w-full flex flex-col md:flex-row md:justify-between mt-4">
          <div className="flex flex-col lg:flex-row w-full md:w-auto lg:w-2/3 lg:justify-between items-center md:items-start">
            <div className="flex flex-col w-full lg:w-1/2 justify-between">
              <div className="flex w-full">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={"/assets/arkana-logo.jpeg"}
                    loader={myLoader}
                    alt={"arkana-logo"}
                    layout="responsive"
                    width={60}
                    height={60}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(60, 60)
                    )}`}
                  />
                </div>
                <div className="ml-4">
                  <h1 className="text-xl uppercase font-bold text-white">
                    Arkana Kemasan
                  </h1>
                  <h2 className="mb-4 mt-2 uppercase font-semibold text-sm text-emerald-100 tracking-wider">
                    Solusi Kemasan Kalian.
                  </h2>
                </div>
              </div>
              {/* kontent dibawah logo */}
              <div className="w-full"></div>
            </div>
            <div className="w-full md:w-auto lg:w-2/5 text-sm space-y-2 mb-2">
              {about?.alamat && (
                <div className="">
                  <h2 className="font-semibold text-white">Alamat</h2>
                  <p className="text-white text-xs md:w-[75%] lg:w-full leading-relaxed">
                    {about?.alamat}
                  </p>
                </div>
              )}
              {about?.email && (
                <div className="">
                  <h2 className="font-semibold text-white">Email</h2>
                  <p className="text-white text-xs md:w-[75%] lg:w-full leading-relaxed">
                    {about?.email}
                  </p>
                </div>
              )}
              <h2 className="font-semibold text-white">Media Sosial</h2>
              {about && (
                <div className="flex w-full text-emerald-700 space-x-2">
                  {about?.whatsApp && (
                    <Link
                      href={`https://wa.me/${
                        about?.whatsApp
                      }?text=${encodeURIComponent(
                        "Permisi Arkana, aku tertarik nih."
                      )}`}
                    >
                      <a
                        target={"_blank"}
                        className="bg-white p-2 rounded-full"
                      >
                        <RiWhatsappFill />
                      </a>
                    </Link>
                  )}
                  {about?.instagram && (
                    <Link
                      href={`https://www.instagram.com/${about?.instagram}/`}
                    >
                      <a
                        target={"_blank"}
                        className="bg-white p-2 rounded-full"
                      >
                        <RiInstagramFill />
                      </a>
                    </Link>
                  )}
                  {about?.facebook && (
                    <Link href={`https://www.facebook.com/${about?.facebook}/`}>
                      <a
                        target={"_blank"}
                        className="bg-white p-2 rounded-full"
                      >
                        <RiFacebookFill />
                      </a>
                    </Link>
                  )}
                  {about?.twitter && (
                    <Link href={`https://www.twitter.com/${about?.twitter}/`}>
                      <a
                        target={"_blank"}
                        className="bg-white p-2 rounded-full"
                      >
                        <RiTwitterFill />
                      </a>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 text-sm space-y-2 lg:ml-8">
            {about && (
              <div className="w-ful">
                <div className="font-semibold text-white cursor-pointer">
                  Lokasi Kami
                </div>
                <div className="w-full rounded-md overflow-hidden mt-1">
                  {parse(about?.linkMap)}
                </div>
              </div>
            )}
            <h2 className="font-semibold text-white mt-2">Jam Oprasi :</h2>
            {about && (
              <div className="w-[288px] bg-emerald-600 px-4 py-2 rounded text-sm">
                <p className="prose-sm text-white">{about.jamOprasi}</p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="w-full py-4 text-center text-white">
        <span className="text-xs">
          <span className="font-semibold">Arkana Kemasan</span> &copy; 2022
        </span>
      </div>
    </div>
  );
}

export default Footer;
