import React, { useEffect, Fragment } from "react";
import "../index.css";
import SumberData from "../components/Layouts/SumberData";
import ResultSection from "./ResultSection";
import Navbar from "../components/Fragments/Navbar";

function Proses() {
  useEffect(() => {
    document.title = "Ini judul";
  }, []);

  return (
      <>
        <Navbar />
        <div className="flex flex-col min-h-screen w-full text-white bg-blue-400">
          <div className="flex flex-wrap justify-center mt-20 font-bold text-5xl text-blue-600 bg-yellow-100">
            Reverse Image Search
          </div>

          <SumberData />
          <div className="flex justify-center px-20">
            <ResultSection />
          </div>
        </div>
      </>
  );
}

export default Proses;