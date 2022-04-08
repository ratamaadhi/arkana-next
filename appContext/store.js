import { createContext } from "react";
import { RiArticleLine, RiGalleryLine, RiHeart2Line, RiShoppingBagLine } from "react-icons/ri";
export const GlobalContext = createContext({});

export const navMenu = [
  {id: 1, name: "Tentang Kami", icon: (<RiHeart2Line />)},
  {id: 4, name: "Produk", icon: (<RiShoppingBagLine />)},
  {id: 2, name: "Galleri", icon: (<RiGalleryLine />)},
  {id: 3, name: "Artikel", icon: (<RiArticleLine />) },
]