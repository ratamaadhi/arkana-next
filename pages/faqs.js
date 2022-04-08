import { Disclosure } from "@headlessui/react";
import React, { useEffect } from "react";
import { RiArrowUpSLine } from "react-icons/ri";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Footer from "../components/homePage/Footer";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { fetchAPI, getDataPage, useFaqs } from "../lib/api";
import MdFormat from "../utils/md";
import useSWR from "swr";

function FaqsPage() {
  const { faqs, isError, isLoading } = useFaqs();
  return (
    <Layout>
      <Seo />
      <div className="w-full min-h-[80vh] px-4 py-2 md:px-8 md:py-4 lg:px-16 mt-8">
        <h1 className="text-center text-2xl font-semibold text-emerald-700">
          FAQ
        </h1>
        <div className="w-full md:w-4/5 md:mx-auto mt-4 space-y-4">
          {!isLoading && faqs && faqs.map((faq) => (
            <div className="w-full" key={faq._id}>
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-emerald-800 bg-emerald-100 rounded-lg hover:bg-emerald-200 focus:outline-none focus-visible:ring focus-visible:ring-emerald-500 focus-visible:ring-opacity-75">
                      <span>{faq.question}</span>
                      <RiArrowUpSLine
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-emerald-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-3 text-sm text-gray-500 prose-sm bg-emerald-50 rounded-lg mt-1 border border-emerald-100">
                      <MdFormat
                        markdown={faq?.answer}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                      />
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export async function getStaticProps() {
  const faqs = await fetchAPI("/faqs");
  return {
    props: {
      faqs,
    },
    revalidate: 1,
  };
}

export default FaqsPage;
