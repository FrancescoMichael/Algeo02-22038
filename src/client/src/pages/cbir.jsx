import React, { useEffect, Fragment, useState } from "react";
import "../index.css";
import SumberData from "../components/Layouts/SumberData";
import ResultSection from "./ResultSection";
import Navbar from "../components/Fragments/Navbar";

function Proses() {
  useEffect(() => {
    document.title = "Ini judul";
  }, []);
  const [pilihanAcuan, setPilihanAcuan] = useState('color')

  return (
      <>
        <Navbar />
        <div className="flex flex-col min-h-screen w-full text-white bg-blue-400">
          <div className="flex flex-wrap justify-center mt-20 font-bold text-5xl text-blue-600 bg-yellow-100">
            Reverse Image Search
          </div>

          <SumberData 
            setPilihanAcuan={setPilihanAcuan}
            pilihanAcuan = {pilihanAcuan}
          />
          <div className="flex-col justify-center px-20">
            <ResultSection 
              pilihanAcuan = {pilihanAcuan}
            />
          </div>
        </div>
      </>
  );
}

export default Proses;