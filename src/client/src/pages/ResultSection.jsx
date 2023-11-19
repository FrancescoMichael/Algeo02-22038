import CardResults from '../components/Fragments/CardResults';
import { useState, useEffect } from 'react';
import ResultList from '../components/Layouts/ResultList';
import Pagination from '../components/Fragments/Pagination';
import { getColorData, getColorDataExecutionTime } from '../services/datacolor.services';
import axios from 'axios';

function ResultSection(){

    // const dataResults = [
	// {
	// 	"id": "1",
	// 	"image": "/images/948.jpg",
	// 	"percentage": "100.0%"
	// },
	// {
	// 	"id": "2",
	// 	"image": "/images/354.jpg",
	// 	"percentage": "98.15%"
	// },
	// {
	// 	"id": "3",
	// 	"image": "/images/423.jpg",
	// 	"percentage": "96.88%"
	// },
	// {
	// 	"id": "4",
	// 	"image": "/images/348.jpg",
	// 	"percentage": "96.67%"
	// },
	// {
	// 	"id": "5",
	// 	"image": "/images/190.jpg",
	// 	"percentage": "96.38%"
	// },
	// {
	// 	"id": "6",
	// 	"image": "/images/240.jpg",
	// 	"percentage": "95.51%"
	// },
	// {
	// 	"id": "7",
	// 	"image": "/images/85.jpg",
	// 	"percentage": "95.41%"
	// },
	// {
	// 	"id": "8",
	// 	"image": "/images/456.jpg",
	// 	"percentage": "95.0%"
	// },
	// {
	// 	"id": "9",
	// 	"image": "/images/344.jpg",
	// 	"percentage": "94.87%"
	// },
	// {
	// 	"id": "10",
	// 	"image": "/images/93.jpg",
	// 	"percentage": "94.86%"
	// },
	// {
	// 	"id": "11",
	// 	"image": "/images/317.jpg",
	// 	"percentage": "94.84%"
	// },
	// {
	// 	"id": "12",
	// 	"image": "/images/296.jpg",
	// 	"percentage": "94.84%"
	// },
	// {
	// 	"id": "13",
	// 	"image": "/images/209.jpg",
	// 	"percentage": "94.83%"
	// },
	// {
	// 	"id": "14",
	// 	"image": "/images/379.jpg",
	// 	"percentage": "94.76%"
	// },
	// {
	// 	"id": "15",
	// 	"image": "/images/216.jpg",
	// 	"percentage": "94.71%"
	// },
	// {
	// 	"id": "16",
	// 	"image": "/images/100.jpg",
	// 	"percentage": "94.7%"
	// },
	// {
	// 	"id": "17",
	// 	"image": "/images/326.jpg",
	// 	"percentage": "94.59%"
	// },
	// {
	// 	"id": "18",
	// 	"image": "/images/67.jpg",
	// 	"percentage": "94.49%"
	// },
	// {
	// 	"id": "19",
	// 	"image": "/images/266.jpg",
	// 	"percentage": "94.48%"
	// },
	// {
	// 	"id": "20",
	// 	"image": "/images/146.jpg",
	// 	"percentage": "94.43%"
	// },
	// {
	// 	"id": "21",
	// 	"image": "/images/468.jpg",
	// 	"percentage": "94.4%"
	// },
	// {
	// 	"id": "22",
	// 	"image": "/images/166.jpg",
	// 	"percentage": "94.25%"
	// },
	// {
	// 	"id": "23",
	// 	"image": "/images/213.jpg",
	// 	"percentage": "94.24%"
	// },
	// {
	// 	"id": "24",
	// 	"image": "/images/250.jpg",
	// 	"percentage": "94.17%"
	// },
	// {
	// 	"id": "25",
	// 	"image": "/images/417.jpg",
	// 	"percentage": "94.14%"
	// },
	// {
	// 	"id": "26",
	// 	"image": "/images/163.jpg",
	// 	"percentage": "93.87%"
	// },
	// {
	// 	"id": "27",
	// 	"image": "/images/68.jpg",
	// 	"percentage": "93.71%"
	// },
	// {
	// 	"id": "28",
	// 	"image": "/images/452.jpg",
	// 	"percentage": "93.69%"
	// },
	// {
	// 	"id": "29",
	// 	"image": "/images/492.jpg",
	// 	"percentage": "93.56%"
	// },
	// {
	// 	"id": "30",
	// 	"image": "/images/71.jpg",
	// 	"percentage": "93.48%"
	// },
	// {
	// 	"id": "31",
	// 	"image": "/images/130.jpg",
	// 	"percentage": "93.43%"
	// },
	// {
	// 	"id": "32",
	// 	"image": "/images/157.jpg",
	// 	"percentage": "93.42%"
	// },
	// {
	// 	"id": "33",
	// 	"image": "/images/203.jpg",
	// 	"percentage": "93.4%"
	// },
	// {
	// 	"id": "34",
	// 	"image": "/images/208.jpg",
	// 	"percentage": "93.39%"
	// },
	// {
	// 	"id": "35",
	// 	"image": "/images/86.jpg",
	// 	"percentage": "93.29%"
	// },
	// {
	// 	"id": "36",
	// 	"image": "/images/360.jpg",
	// 	"percentage": "93.24%"
	// },
	// {
	// 	"id": "37",
	// 	"image": "/images/122.jpg",
	// 	"percentage": "93.24%"
	// },
	// {
	// 	"id": "38",
	// 	"image": "/images/465.jpg",
	// 	"percentage": "93.23%"
	// },
	// {
	// 	"id": "39",
	// 	"image": "/images/168.jpg",
	// 	"percentage": "93.21%"
	// },
	// {
	// 	"id": "40",
	// 	"image": "/images/387.jpg",
	// 	"percentage": "93.16%"
	// },
	// {
	// 	"id": "41",
	// 	"image": "/images/455.jpg",
	// 	"percentage": "93.15%"
	// },
	// {
	// 	"id": "42",
	// 	"image": "/images/42.jpg",
	// 	"percentage": "93.14%"
	// },
	// {
	// 	"id": "43",
	// 	"image": "/images/331.jpg",
	// 	"percentage": "93.09%"
	// },
	// {
	// 	"id": "44",
	// 	"image": "/images/152.jpg",
	// 	"percentage": "93.08%"
	// },
	// {
	// 	"id": "45",
	// 	"image": "/images/249.jpg",
	// 	"percentage": "93.08%"
	// },
	// {
	// 	"id": "46",
	// 	"image": "/images/254.jpg",
	// 	"percentage": "93.0%"
	// },
	// {
	// 	"id": "47",
	// 	"image": "/images/476.jpg",
	// 	"percentage": "92.95%"
	// },
	// {
	// 	"id": "48",
	// 	"image": "/images/6.jpg",
	// 	"percentage": "92.86%"
	// },
	// {
	// 	"id": "49",
	// 	"image": "/images/395.jpg",
	// 	"percentage": "92.84%"
	// },
	// {
	// 	"id": "50",
	// 	"image": "/images/32.jpg",
	// 	"percentage": "92.82%"
	// },
	// {
	// 	"id": "51",
	// 	"image": "/images/264.jpg",
	// 	"percentage": "92.81%"
	// },
	// {
	// 	"id": "52",
	// 	"image": "/images/236.jpg",
	// 	"percentage": "92.64%"
	// },
	// {
	// 	"id": "53",
	// 	"image": "/images/48.jpg",
	// 	"percentage": "92.63%"
	// },
	// {
	// 	"id": "54",
	// 	"image": "/images/128.jpg",
	// 	"percentage": "92.58%"
	// },
	// {
	// 	"id": "55",
	// 	"image": "/images/334.jpg",
	// 	"percentage": "92.54%"
	// },
	// {
	// 	"id": "56",
	// 	"image": "/images/150.jpg",
	// 	"percentage": "92.54%"
	// },
	// {
	// 	"id": "57",
	// 	"image": "/images/447.jpg",
	// 	"percentage": "92.53%"
	// },
	// {
	// 	"id": "58",
	// 	"image": "/images/458.jpg",
	// 	"percentage": "92.49%"
	// },
	// {
	// 	"id": "59",
	// 	"image": "/images/450.jpg",
	// 	"percentage": "92.32%"
	// },
	// {
	// 	"id": "60",
	// 	"image": "/images/191.jpg",
	// 	"percentage": "92.29%"
	// },
	// {
	// 	"id": "61",
	// 	"image": "/images/367.jpg",
	// 	"percentage": "92.23%"
	// },
	// {
	// 	"id": "62",
	// 	"image": "/images/415.jpg",
	// 	"percentage": "92.2%"
	// },
	// {
	// 	"id": "63",
	// 	"image": "/images/229.jpg",
	// 	"percentage": "92.06%"
	// },
	// {
	// 	"id": "64",
	// 	"image": "/images/233.jpg",
	// 	"percentage": "92.05%"
	// },
	// {
	// 	"id": "65",
	// 	"image": "/images/393.jpg",
	// 	"percentage": "92.0%"
	// },
	// {
	// 	"id": "66",
	// 	"image": "/images/178.jpg",
	// 	"percentage": "91.85%"
	// },
	// {
	// 	"id": "67",
	// 	"image": "/images/328.jpg",
	// 	"percentage": "91.83%"
	// },
	// {
	// 	"id": "68",
	// 	"image": "/images/483.jpg",
	// 	"percentage": "91.79%"
	// },
	// {
	// 	"id": "69",
	// 	"image": "/images/207.jpg",
	// 	"percentage": "91.75%"
	// },
	// {
	// 	"id": "70",
	// 	"image": "/images/406.jpg",
	// 	"percentage": "91.75%"
	// },
	// {
	// 	"id": "71",
	// 	"image": "/images/162.jpg",
	// 	"percentage": "91.74%"
	// },
	// {
	// 	"id": "72",
	// 	"image": "/images/142.jpg",
	// 	"percentage": "91.68%"
	// },
	// {
	// 	"id": "73",
	// 	"image": "/images/55.jpg",
	// 	"percentage": "91.66%"
	// },
	// {
	// 	"id": "74",
	// 	"image": "/images/34.jpg",
	// 	"percentage": "91.64%"
	// },
	// {
	// 	"id": "75",
	// 	"image": "/images/486.jpg",
	// 	"percentage": "91.63%"
	// },
	// {
	// 	"id": "76",
	// 	"image": "/images/364.jpg",
	// 	"percentage": "91.62%"
	// },
	// {
	// 	"id": "77",
	// 	"image": "/images/411.jpg",
	// 	"percentage": "91.54%"
	// },
	// {
	// 	"id": "78",
	// 	"image": "/images/431.jpg",
	// 	"percentage": "91.54%"
	// },
	// {
	// 	"id": "79",
	// 	"image": "/images/342.jpg",
	// 	"percentage": "91.44%"
	// },
	// {
	// 	"id": "80",
	// 	"image": "/images/361.jpg",
	// 	"percentage": "91.43%"
	// },
	// {
	// 	"id": "81",
	// 	"image": "/images/121.jpg",
	// 	"percentage": "91.27%"
	// },
	// {
	// 	"id": "82",
	// 	"image": "/images/33.jpg",
	// 	"percentage": "91.22%"
	// },
	// {
	// 	"id": "83",
	// 	"image": "/images/123.jpg",
	// 	"percentage": "91.19%"
	// },
	// {
	// 	"id": "84",
	// 	"image": "/images/439.jpg",
	// 	"percentage": "91.11%"
	// },
	// {
	// 	"id": "85",
	// 	"image": "/images/161.jpg",
	// 	"percentage": "91.08%"
	// },
	// {
	// 	"id": "86",
	// 	"image": "/images/21.jpg",
	// 	"percentage": "91.04%"
	// },
	// {
	// 	"id": "87",
	// 	"image": "/images/35.jpg",
	// 	"percentage": "91.04%"
	// },
	// {
	// 	"id": "88",
	// 	"image": "/images/5.jpg",
	// 	"percentage": "91.0%"
	// },
	// {
	// 	"id": "89",
	// 	"image": "/images/126.jpg",
	// 	"percentage": "91.0%"
	// },
	// {
	// 	"id": "90",
	// 	"image": "/images/332.jpg",
	// 	"percentage": "90.99%"
	// },
	// {
	// 	"id": "91",
	// 	"image": "/images/181.jpg",
	// 	"percentage": "90.9%"
	// },
	// {
	// 	"id": "92",
	// 	"image": "/images/69.jpg",
	// 	"percentage": "90.89%"
	// },
	// {
	// 	"id": "93",
	// 	"image": "/images/235.jpg",
	// 	"percentage": "90.85%"
	// },
	// {
	// 	"id": "94",
	// 	"image": "/images/164.jpg",
	// 	"percentage": "90.76%"
	// },
	// {
	// 	"id": "95",
	// 	"image": "/images/109.jpg",
	// 	"percentage": "90.72%"
	// },
	// {
	// 	"id": "96",
	// 	"image": "/images/102.jpg",
	// 	"percentage": "90.7%"
	// },
	// {
	// 	"id": "97",
	// 	"image": "/images/113.jpg",
	// 	"percentage": "90.62%"
	// },
	// {
	// 	"id": "98",
	// 	"image": "/images/313.jpg",
	// 	"percentage": "90.6%"
	// },
	// {
	// 	"id": "99",
	// 	"image": "/images/81.jpg",
	// 	"percentage": "90.5%"
	// },
	// {
	// 	"id": "100",
	// 	"image": "/images/305.jpg",
	// 	"percentage": "90.45%"
	// },
	// {
	// 	"id": "101",
	// 	"image": "/images/279.jpg",
	// 	"percentage": "90.33%"
	// },
	// {
	// 	"id": "102",
	// 	"image": "/images/219.jpg",
	// 	"percentage": "90.32%"
	// },
	// {
	// 	"id": "103",
	// 	"image": "/images/404.jpg",
	// 	"percentage": "90.3%"
	// },
	// {
	// 	"id": "104",
	// 	"image": "/images/19.jpg",
	// 	"percentage": "90.28%"
	// },
	// {
	// 	"id": "105",
	// 	"image": "/images/442.jpg",
	// 	"percentage": "90.18%"
	// },
	// {
	// 	"id": "106",
	// 	"image": "/images/167.jpg",
	// 	"percentage": "90.08%"
	// },
	// {
	// 	"id": "107",
	// 	"image": "/images/351.jpg",
	// 	"percentage": "90.05%"
	// },
	// {
	// 	"id": "108",
	// 	"image": "/images/29.jpg",
	// 	"percentage": "90.03%"
	// },
	// {
	// 	"id": "109",
	// 	"image": "/images/3.jpg",
	// 	"percentage": "90.02%"
	// }
	// ]
    const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(6);
	const [dataResults, setDataResults] = useState([]);
	const [executionTime, setExecutionTime] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
        getColorData((data) => {
            setDataResults(data);
        });
    });

	const lastPostIndex = currentPage * postPerPage;
	const firstPostIndex = lastPostIndex - postPerPage;
	const currentPost = dataResults.slice(firstPostIndex, lastPostIndex);

    return(
        <>
		{/* {loading ? "loading" : 
			"done"
		} */}
			<div className = "bg-black">
				{executionTime.map((execTime,) => {
					return (
						<div key = {execTime.id}>
							{execTime.execution_time}
						</div>
					);
				})}
			</div>
            <ResultList dataResults={currentPost}/>
			<Pagination 
				totalPosts = {dataResults.length} 
				postPerPage = {postPerPage}
				setCurrentPage={setCurrentPage}
                currentPage={currentPage}
			/>
        </>
    );
}

export default ResultSection; 