import Image from "next/image";
import React, { useState } from "react";
import {
  RiCloseLine,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiWhatsappFill,
} from "react-icons/ri";
import Link from "react-scroll/modules/components/Link";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import useSWR from "swr";
import { fetchAPI } from "../../lib/api";
import { getStrapiMedia, myLoader, shimmer, toBase64 } from "../../lib/media";
import MdFormat from "../../utils/md";

function ModalProduct({ selectedProduct, setOpenModal }) {
  const { data: about, error } = useSWR("/about", fetchAPI);
  const [selectedIdx, setSelectedIdx] = useState(0);

  function handleChangeFoto(direction) {
    if (direction === "next") {
      if (selectedIdx === selectedProduct.foto.length - 1) {
        setSelectedIdx(0);
      } else {
        setSelectedIdx(selectedIdx + 1);
      }
    }
    if (direction === "prev") {
      if (selectedIdx === 0) {
        setSelectedIdx(selectedProduct.foto.length - 1);
      } else {
        setSelectedIdx(selectedIdx - 1);
      }
    }
  }

  return (
    <div
      className={`fixed bottom-0 h-full w-full z-50 flex flex-col justify-between items-center bg-gray-800/70`}
    >
      <div
        onClick={() => setOpenModal(false)}
        className="w-full mx-auto flex flex-1 justify-end items-center p-2"
      >
        <div className="p-1 text-emerald-800 bg-emerald-50 rounded-lg cursor-pointer hover:scale-110 transition-all ease-in-out duration-300">
          <RiCloseLine size={26} />
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center bg-emerald-50 overflow-y-scroll overflow-x-hidden px-4 pt-6 pb-8 rounded-t-2xl">
        {selectedProduct && (
          <div className="w-full sm:w-8/12">
            <div className="w-full flex flex-col md:flex-row">
              <div className="relative w-full bg-emerald-100 rounded-md overflow-hidden shadow-lg shadow-emerald-900/40">
                {selectedProduct.foto.length &&
                  selectedProduct.foto.map(
                    (foto, i) =>
                      i === selectedIdx && (
                        <Image
                          key={i}
                          loader={myLoader}
                          src={getStrapiMedia(foto)}
                          alt={foto.hash}
                          layout="responsive"
                          width={foto.width}
                          height={foto.height}
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(
                              foto.width,
                              foto.height
                            )
                          )}`}
                        />
                      )
                  )}
                {selectedProduct.foto.length > 1 && (
                  <>
                    <div
                      onClick={() => handleChangeFoto("next")}
                      className="absolute bottom-0 right-0 px-6 py-2 bg-emerald-700/50 text-emerald-50 text-2xl flex items-center rounded-lg"
                    >
                      <RiArrowRightSLine />
                    </div>
                    <div
                      onClick={() => handleChangeFoto("prev")}
                      className="absolute bottom-0 left-0 px-6 py-2 bg-emerald-700/50 text-emerald-50 text-2xl flex items-center rounded-lg"
                    >
                      <RiArrowLeftSLine />
                    </div>
                  </>
                )}
              </div>
              <div className="w-full mt-4 md:mt-0 md:ml-4 md:self-end">
                {selectedProduct?.nama && (
                  <div className="w-full text-xl font-semibold tracking-wide rounded-md text-emerald-800 line-clamp-3">
                    {selectedProduct?.nama}
                  </div>
                )}
                {selectedProduct?.deskripsi && (
                  <div className="w-full text-xs md:text-sm bg-emerald-100 rounded-md text-gray-500 mt-2 px-4 py-2">
                    {selectedProduct?.deskripsi}
                  </div>
                )}

                {!error && about?.whatsApp && (
                  <button
                    target={"_blank"}
                    onClick={() =>
                      window &&
                      window.open(
                        `https://wa.me/${
                          about?.whatsApp
                        }?text=${encodeURIComponent(
                          `Permisi Arkana, aku tertarik nih dengan produk ${
                            selectedProduct?.nama
                          }. ${
                            "https://" + window.location.hostname ||
                            "http://localhost:3000"
                          }/product/${selectedProduct._id}`
                        )}`,
                        "_blank"
                      )
                    }
                    className="flex w-fit items-center bg-emerald-700 text-emerald-50 border border-emerald-200 p-2 px-4 rounded-full mt-2"
                  >
                    <RiWhatsappFill /> <span className="ml-2">chat kami.</span>
                  </button>
                )}
              </div>
            </div>
            <div className="w-full mt-4 markdown-container mx-auto max-w-none prose prose-sm lg:prose-md xl:prose-lg prose-headings:text-emerald-800 text-gray-700">
              {selectedProduct && selectedProduct?.content && (
                <MdFormat
                  markdown={selectedProduct?.content}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalProduct;
