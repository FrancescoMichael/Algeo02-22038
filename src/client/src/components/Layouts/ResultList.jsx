import React from 'react';
import CardResults from "../Fragments/CardResults";

const ResultList = ({ resultsData }) => {
    return (
        <div className='reslist'>
            {resultsData.map((result) => {
                return (
                    <CardResults 
                        key = {result.id}
                        image = {result.image}
                        percentage = {result.percentage}
                    />
                );
            })}
        </div>
    );
};


export default ResultList;