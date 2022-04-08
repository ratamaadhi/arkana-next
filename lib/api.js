import axios from "axios";
import useSWR from "swr";

function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

const registerApi = (body) => {
  return axios({
    url: `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }/auth/local/register`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  });
};

const loginApi = (body) => {
  return axios({
    url: `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }/auth/local`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  });
};

async function getDataPage() {
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
    fetchAPI("/testimonis"),
    fetchAPI("/faqs?_limit=5"),
    fetchAPI("/products?_limit=9"),
  ]);
  return {
    articles,
    categories,
    homepage,
    about,
    galleries,
    testimonis,
    faqs,
    products,
  };
}

const getProduks = async ({ id, limit, filter }) => {
  return axios({
    method: "GET",
    url: `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }/products${limit && "?_limit=" + limit}`,
  });
};
const useProducts = (limit) => {
  const { data, error } = useSWR(
    `/products${limit ? "?_limit=" + limit : ""}`,
    fetchAPI
  );
  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const useFaqs = (limit) => {
  const { data, error } = useSWR(
    `/faqs${limit ? "?_limit=" + limit : ""}`,
    fetchAPI
  );
  return {
    faqs: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const useAbout = () => {
  const { data, error } = useSWR(`/about`, fetchAPI);
  return {
    about: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export {
  loginApi,
  registerApi,
  fetchAPI,
  getStrapiURL,
  getDataPage,
  getProduks,
  useFaqs,
  useAbout,
  useProducts,
};
