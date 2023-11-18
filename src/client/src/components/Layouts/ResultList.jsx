import React from 'react';
import CardResults from "../Fragments/CardResults";

const ResultList = ({ dataResults }) => {
    return (
        <div className = "flex flex-wrap justify-center ml-20 mr-20">
                {dataResults.map((result) => (
                    <CardResults key = {result.id}>
                        <CardResults.Gambar image = {result.image} />
                        <CardResults.Persentase percentage = {result.percentage} />
                    </CardResults>
                ))}
        </div>
    );
};


export default ResultList;