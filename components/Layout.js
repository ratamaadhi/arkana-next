import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="antialiased relative flex flex-col font-poppins w-full min-h-screen bg-emerald-50/50 2xl:container 2xl:mx-auto">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
