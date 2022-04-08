import React, { useState } from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { fetchAPI } from "../../lib/api";
import useSWR from "swr";
import Image from "next/image";
import { getStrapiMedia, myLoader, shimmer, toBase64 } from "../../lib/media";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiWhatsappFill,
} from "react-icons/ri";
import MdFormat from "../../utils/md";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Footer from "../../components/homePage/Footer";
import Link from "react-scroll/modules/components/Link";

function ProductIdPage({ fallback, id, homepage, ...props }) {
  const { data: selectedProduct, errorData } = useSWR(
    `/products/${id}`,
    fetchAPI
  );
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
    <Layout>
      <Seo />
      <div className="w-full px-4 py-2 md:px-8 md:py-4 lg:px-16 scroll-mt-20 md:scroll-mt-28">
        {!errorData && selectedProduct && (
          <div className="w-full lg:w-10/12 xl:w-8/12 lg:mx-auto">
            <div className="w-full flex flex-col md:flex-row">
              <div className="relative w-full xl:w-1/2 bg-emerald-100 rounded-md overflow-hidden shadow-lg shadow-emerald-900/40">
                {selectedProduct.foto.length &&
                  selectedProduct.foto.map(
                    (foto, i) =>
                      i === selectedIdx && (
                        <Image
                          key={i}
                          loader={myLoader}
                          src={getStrapiMedia(foto?.formats.medium)}
                          alt={foto.hash}
                          layout="responsive"
                          width={foto.formats.thumbnail.width}
                          height={foto.formats.thumbnail.height}
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(
                              foto.formats.thumbnail.width,
                              foto.formats.thumbnail.height
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
                  <div className="w-full text-xl xl:text-2xl capitalize font-semibold tracking-wide rounded-md text-emerald-800 line-clamp-3">
                    {selectedProduct?.nama}
                  </div>
                )}
                {selectedProduct?.deskripsi && (
                  <div className="w-full text-xs md:text-sm leading-relaxed bg-emerald-100 rounded-md text-gray-500 mt-2 px-4 py-2">
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
            <div className="w-full mt-6 markdown-container mx-auto max-w-none prose prose-sm lg:prose-md xl:prose-lg prose-headings:text-emerald-800 text-gray-700">
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
      <Footer />
    </Layout>
  );
}

export async function getStaticPaths() {
  const products = await fetchAPI("/products");
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  // Run API calls in parallel
  const [selectedProduct, homepage] = await Promise.all([
    fetchAPI("/products/" + id),
    fetchAPI("/homepage"),
  ]);

  return {
    props: {
      fallback: {
        ["/products/" + id]: selectedProduct,
      },
      homepage,
      id,
    },
    revalidate: 1,
  };
}

export default ProductIdPage;
