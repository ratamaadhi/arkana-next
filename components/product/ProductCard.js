import Image from "next/image";
import React, { useState } from "react";
import { getStrapiMedia, myLoader } from "../../lib/media";
import { shimmer, toBase64 } from "../../lib/media";
import Link from "next/link";
import ModalProduct from "./ModalProduct";

const ProductCard = ({ product, handleClick }) => {
  return (
    <div
      className="relative w-full h-auto bg-emerald-700 rounded-md overflow-hidden shadow-lg shadow-emerald-500/50"
      onClick={() => handleClick(product)}
    >
      <div className="relative w-full bg-emerald-100">
        <Image
          loader={myLoader}
          src={getStrapiMedia(product.foto[0])}
          alt={product.foto[0].hash}
          layout="responsive"
          width={product.foto[0].width}
          height={product.foto[0].height}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(
              product.foto[0].width,
              product.foto[0].height
            )
          )}`}
        />
      </div>
      <div className="p-3 w-full flex flex-col justify-center items-start bg-emerald-700">
        <div className="w-full bg-emerald-700 text-sm md:text-base font-semibold text-emerald-50 line-clamp-2">
          {product.nama}
        </div>
        <div className="w-full bg-emerald-700 text-xss md:text-xs leading-relaxed line-clamp-2 font-base text-emerald-50 mt-1">
          {product.deskripsi}
        </div>
        {/* <Link href={"/products/"+product._id}>
            <div 
              className="text-xss w-full px-2 py-1 text-center bg-primary hover:bg-primary/70 text-secondary font-semibold tracking-wide self-end rounded cursor-pointer mt-6 shadow-sm transition-all duration-300 ease-in-out">
              Read more
            </div>
          </Link> */}
      </div>
    </div>
  );
};

export default ProductCard;
