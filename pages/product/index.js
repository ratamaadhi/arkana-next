import React from "react";
import useSWR from "swr";
import Mansory from "react-masonry-css";
import Footer from "../../components/homePage/Footer";
import Layout from "../../components/Layout";
import ProductCard from "../../components/product/ProductCard";
import Seo from "../../components/Seo";
import { fetchAPI, useProducts } from "../../lib/api";

function ProductsPage({ homepage }) {
  const { data: _homepage } = useSWR("/homepage", fetchAPI);
  const { products, isLoading, isError } = useProducts();
  const breakPoints = {
    default: 4,
    1024: 4,
    768: 3,
    425: 2,
  };

  function handleClickProduct(id){
    window.open(`/product/${id}`, '_blank');
  }
  return (
    <Layout>
      <Seo seo={_homepage?.seo || homepage?.seo} />
      <div className="w-full min-h-[80vh] px-4 py-2 md:px-8 md:py-4 lg:px-16 mt-8">
        <h1 className="text-center text-2xl font-semibold text-emerald-700">
          Jasa Kami
        </h1>
        {!isLoading && !isError && products && (
          <div className="w-full md:w-4/5 md:mx-auto mt-6">
            <Mansory
              breakpointCols={breakPoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {products &&
                products.map(
                  (product, i) =>
                    i < 9 && (
                      <ProductCard
                        key={i}
                        product={product}
                        handleClick={() => handleClickProduct(product._id)}
                      />
                    )
                )}
            </Mansory>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [homepage] = await Promise.all([fetchAPI("/homepage")]);

  return {
    props: {
      fallback: {
        "/homepage": homepage,
      },
      homepage,
    },
    revalidate: 1,
  };
}

export default ProductsPage;
