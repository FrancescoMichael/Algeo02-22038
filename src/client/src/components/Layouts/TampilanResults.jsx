import React, { useEffect, useState } from "react";
import axios from "axios";

import "./TampilanResults.css";
import CryptoList from "../Fragments/CryptoList";
import Pagination from "../Fragments/Pagination";
import { getData } from "../../services/data.services";
// import CryptoList from "../components/Fragments/CryptoList";
// import Pagination from "../components/Fragments/Pagination";

const App = () => {
    const [coinsData, setCoinsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);

    // useEffect(async () => {
    //     const response = await axios.get(
    //         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    //     );

    //     setCoinsData(response.data);
    // }, []);
    useEffect(() => {
        getData();
    }, [])

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = coinsData.slice(firstPostIndex, lastPostIndex);

    return (
        <div className='app'>
            <h1>Crypto Gallery</h1>
            {/* <CryptoList */}
            <CryptoList coinsData={currentPosts} />
            <Pagination
                totalPosts={coinsData.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
};

export default App;