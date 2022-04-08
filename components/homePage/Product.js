import React, { useState } from "react";
import Mansory from "react-masonry-css";
import { useProducts } from "../../lib/api";
import ProductCard from "../product/ProductCard";
import Link from "next/link";
import ModalProduct from "../product/ModalProduct";

function Product() {
  const { products, isLoading, isError } = useProducts(9);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  function handleShowModal(product){
    setSelectedProduct(product)
    setOpenModal(true)
  }

  const breakPoints = {
    default: 4,
    1024: 4,
    768: 3,
    425: 2,
  };

  return (
    <>
      <div className="w-full px-4 py-2 md:px-8 md:py-4 lg:px-16 mt-24 scroll-mt-20 md:scroll-mt-28" id="homepageProduk">
        <h1 className="text-2xl font-semibold text-emerald-700 text-center">
          Jasa Kami
        </h1>
        {!isLoading && !isError && products && (
          <>
            <div className="w-full md:w-4/5 md:mx-auto mt-6">
              <Mansory
                breakpointCols={breakPoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
              >
                {products &&
                  products.map(
                    (product, i) =>
                      i < 9 && <ProductCard key={i} product={product} handleClick={handleShowModal}/>
                  )}
              </Mansory>
            </div>
          </>
        )}
        {products && products.length > 9 && (
          <div className="w-full flex justify-center mt-4">
            <Link href={"/product"}>
              <a
                target={"_blank"}
                className="px-6 py-2 rounded-lg bg-emerald-700 text-emerald-50 shadow-md shadow-emerald-500/50"
              >
                More
              </a>
            </Link>
          </div>
        )}
      </div>
      {openModal && (
        <ModalProduct selectedProduct={selectedProduct} setOpenModal={setOpenModal} />
      )}
    </>
  );
}

export default Product;
