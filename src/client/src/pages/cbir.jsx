import React, { useEffect, Fragment, useState } from 'react';
import '../index.css'
import SumberDataset from '../components/Layouts/SumberDataset';
import SumberTest from '../components/Layouts/SumberTest';
import ResultSection from '../components/Layouts/ResultSection';

function Proses(){
    useEffect(() => {
        document.title = 'Ini judul';
    }, []);

    const answer = [
        {
            percentage : "80%",
            image : "/images/0.jpg",
        },
        {
            percentage : "75%",
            image : "/images/1.jpg",
        }
    ]

    return (
        <Fragment>
            <div className = "min-h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500">
                <div className = 'flex justify-center pt-20 font-bold text-5xl text-blue-600'>
                    Reverse Image Search
                </div>
                <div className = "flex justify-center py-10 h-10 px-6 ml-10">
                    <SumberTest />
                    <SumberDataset />
                </div>
                <div className = ''>
                    <ResultSection />
                </div>
            </div>
        </Fragment>
    );
}

export default Proses;