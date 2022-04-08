import useSWR, { SWRConfig } from "swr";
import Seo from "../components/Seo";
import { fetchAPI } from "../lib/api";
import Layout from "../components/Layout";
import Hero from "../components/homePage/Hero";
import Product from "../components/homePage/Product";
import About from "../components/homePage/About";
import Footer from "../components/homePage/Footer";
import Faq from "../components/homePage/Faq";
import * as scrolling from "react-scroll";
import FromUs from "../components/homePage/FromUs";
import Testimoni from "../components/homePage/Testimoni";
import Galleries from "../components/homePage/Galleries";
const Element = scrolling.Element;

function Home({
  articles,
  categories,
  homepage,
  about,
  galleries,
  testimonis,
  faqs,
  fallback,
  ...props
}) {
  const { data: _homePage } = useSWR("/homepage", fetchAPI);

  return (
    <SWRConfig value={{ fallback }}>
      <Layout>
        <Seo seo={!_homePage ? homepage?.seo : _homePage?.seo} />
        <Hero homepage={!_homePage ? homepage : _homePage} />
        <About />
        <FromUs homepage={!_homePage ? homepage : _homePage} />
        <Product />
        <Galleries />
        <Testimoni />
        <Faq />
        <Footer />
      </Layout>
    </SWRConfig>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [
    articles,
    categories,
    homepage,
    about,
    galleries,
    testimonis,
    faqs,
    products,
  ] = await Promise.all([
    fetchAPI("/articles"),
    fetchAPI("/categories"),
    fetchAPI("/homepage"),
    fetchAPI("/about"),
    fetchAPI("/galleries"),
    fetchAPI("/testimonis?_limit=10"),
    fetchAPI("/faqs?_limit=5"),
    fetchAPI("/products?_limit=9"),
  ]);

  return {
    props: {
      articles,
      categories,
      homepage,
      about,
      galleries,
      testimonis,
      faqs,
      products,
      fallback: {
        "/articles": articles,
        "/categories": categories,
        "/homepage": homepage,
        "/about": about,
        "/galleries": galleries,
        "/testimonis": testimonis,
        "/faqs": faqs,
        "/products": products,
      },
    },
    revalidate: 1,
  };
}

export default Home;
