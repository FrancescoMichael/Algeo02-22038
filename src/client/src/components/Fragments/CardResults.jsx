import React from "react";

import "./CardResults.css";

const CardResults = ({ image, percentage }) => {
    return (
        <div className='card'>
            <div className='card_image'>
                <img src={image} />
            </div>
            <div className='card_info'>
                <h3>{percentage}</h3>
            </div>
        </div>
    );
};

export default CardResults;

// function CardResults(props){
//     const { children } = props;

//     return (
//         <div className = "w-full max-w-xs bg-g-800 border border-gray-700 rounded-lg shadow mx-3 my-2 flex flex-col justify-between">
//             {children}
//         </div>
//     );
// }

// function Gambar(props){
//     const { image } = props;

//     return (
//         <a href = "#">
//             <img 
//             src = {image} 
//             alt = "imageresult" 
//             className = "p-8 rounded-t-lg h-60 w-full object-cover"></img>
//         </a>
//     );
// }

// function Persentase(props){
//     const { percentage } = props;

//     return (
//         <div className = "flex items-center justify-center px-5 pb-5">
//             <span className = "text-xl font-bold text-white">
//                 {percentage}
//             </span>
//         </div>
//     );
// }

// CardResults.Gambar = Gambar;
// CardResults.Persentase = Persentase;

// export default CardResults