import CardResults from '../components/Fragments/CardResults';
import { useState, useEffect } from 'react';
import ResultList from '../components/Layouts/ResultList';
import Pagination from '../components/Fragments/Pagination';
import { getColorData, getColorDataExecutionTime } from '../services/datacolor.services';
import axios from 'axios';
import { getTextureData } from '../services/datatexture.services';

function ResultSection({pilihanAcuan}){

    const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(6);
	const [dataResults, setDataResults] = useState([]);
	const [executionTime, setExecutionTime] = useState([]);
	const [loading, setLoading] = useState(false);

	// array hasil
	const [dataColorResults, setDataColorResults] = useState([]);
	const [dataTextureResults, setDataTextureResults] = useState([]);

	// ambil data color
	// useEffect(() => {
    //     getColorData((data) => {
    //         setDataResults(data);
    //     });
    // });
	useEffect(() => {
		getColorData((data) => {
			setDataColorResults(data);
		})
	});
	

	// ambil data texture
	useEffect(() => {
		getTextureData((data) => {
			setDataTextureResults(data);
		})
	})

	const lastPostIndex = currentPage * postPerPage;
	const firstPostIndex = lastPostIndex - postPerPage;

	// untuk warna
	// const currentPost = dataResults.slice(firstPostIndex, lastPostIndex);
	const currentPostColor = dataColorResults.slice(firstPostIndex, lastPostIndex);

	// untuk texture
	const currentPostTexture = dataTextureResults.slice(firstPostIndex, lastPostIndex);

	if(pilihanAcuan === 'color'){
		return (
			<>
				<ResultList dataResults={currentPostColor}/>
				<Pagination 
					totalPosts = {dataColorResults.length} 
					postPerPage = {postPerPage}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
				/>
			</>
		);
	}else{
		return (
			<>
				<ResultList dataResults={currentPostTexture}/>
				<Pagination 
					totalPosts = {dataTextureResults.length} 
					postPerPage = {postPerPage}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
				/>
			</>
		);
	}
    // return(
    //     <>
	// 	{/* {console.log("Pilihan acuannya adalah ", pilihanAcuan)} */}
	// 	{/* {loading ? "loading" : 
	// 		"done"
	// 	} */}
	// 		<div className = "bg-black">
	// 			{executionTime.map((execTime,) => {
	// 				return (
	// 					<div key = {execTime.id}>
	// 						{execTime.execution_time}
	// 					</div>
	// 				);
	// 			})}
	// 		</div>
    //         <ResultList dataResults={currentPost}/>
	// 		<Pagination 
	// 			totalPosts = {dataResults.length} 
	// 			postPerPage = {postPerPage}
	// 			setCurrentPage={setCurrentPage}
    //             currentPage={currentPage}
	// 		/>
    //     </>
    // );
}

export default ResultSection; 