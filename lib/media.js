import { getStrapiURL } from "./api";
import NoImage from '../public/no-image.png'

function getStrapiMedia(media) {
  const imageUrl = media !== null ? media?.url.startsWith("/")
    ? getStrapiURL(media.url)
    : media?.url : NoImage;
  return imageUrl;
}

function myLoader(load) {
    return `${load.src}?w=${load.width}&q=${load.quality || 75}`;
}

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`;


export { getStrapiMedia, myLoader, toBase64, shimmer }