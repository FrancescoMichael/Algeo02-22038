import CardResults from '../components/Fragments/CardResults';
import { useState, useEffect } from 'react';
import ResultList from '../components/Layouts/ResultList';
import Pagination from '../components/Fragments/Pagination';
import { getColorData, getColorDataExecutionTime, getColorOldData } from '../services/datacolor.services';
import axios from 'axios';
import { getTextureData, getTextureDataExecutionTime, getTextureOldData } from '../services/datatexture.services';

function ResultSection({pilihanAcuan, cache}){

    const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(6);
	const [dataResults, setDataResults] = useState([]);
	const [executionTimeColor, setExecutionTimeColor] = useState([]);
	const [executionTimeTexture, setExecutionTimeTexture] = useState([]);
	const [loading, setLoading] = useState(false);

	// array hasil
	const [dataColorResults, setDataColorResults] = useState([]);
	const [dataColorOldResults, setDataColorOldResults] = useState([]);
	const [dataTextureResults, setDataTextureResults] = useState([]);
	const [dataTextureOldResults, setDataTextureOldResults] = useState([]);

	// ambil data color
	// useEffect(() => {
    //     getColorData((data) => {
    //         setDataResults(data);
    //     });
    // });
	useEffect(() => {
		const fetchData = () => {
			// Periksa apakah dokumen sudah terload
			if (document.readyState === 'complete') {
			getColorData((data) => {
				setDataColorResults(data);
			});
			}
		};
		fetchData()
		const intervalId = setInterval(() => {
			fetchData();
		  }, 1000); // Adjust the interval as needed
	  
		  // Bersihkan interval saat komponen dibongkar
		return () => clearInterval(intervalId);
	}, []);
	
	// ambil data texture
	useEffect(() => {
		const fetchData = () => {
			// Periksa apakah dokumen sudah terload
			if (document.readyState === 'complete') {
			getTextureData((data) => {
				setDataTextureResults(data);
			});
			}
		};
		fetchData()
		const intervalId = setInterval(() => {
			fetchData();
		  }, 1000); // Adjust the interval as needed
	  
		  // Bersihkan interval saat komponen dibongkar
		return () => clearInterval(intervalId);
	}, []);
	// useEffect(() => {
	// 	getTextureData((data) => {
	// 		setDataTextureResults(data);
	// 	})
	// }, [])

	// execution time Texture
	// useEffect(() => {
	// 	getTextureDataExecutionTime((data) => {
	// 		setExecutionTimeTexture(data);
	// 	})
	// })

	useEffect(() => {
		const fetchData = () => {
			// Periksa apakah dokumen sudah terload
			if (document.readyState === 'complete') {
				getTextureDataExecutionTime((data) => {
					setExecutionTimeTexture(data);
			});
			}
		};
		fetchData()
		const intervalId = setInterval(() => {
			fetchData();
		  }, 5000); // Adjust the interval as needed
	  
		  // Bersihkan interval saat komponen dibongkar
		return () => clearInterval(intervalId);
	}, []);

	// execution time Color
	useEffect(() => {
		const fetchData = () => {
			// Periksa apakah dokumen sudah terload
			if (document.readyState === 'complete') {
				getColorDataExecutionTime((data) => {
					setExecutionTimeColor(data);
			});
			}
		};
		fetchData()
		const intervalId = setInterval(() => {
			fetchData();
		  }, 5000); // Adjust the interval as needed
	  
		  // Bersihkan interval saat komponen dibongkar
		return () => clearInterval(intervalId);
	}, []);
	// useEffect(() => {
	// 	getColorDataExecutionTime((data) => {
	// 		setExecutionTimeColor(data);
	// 	})
	// })

	// cache pada color
	useEffect(() => {
		const fetchData = () => {
			// Periksa apakah dokumen sudah terload
			if (document.readyState === 'complete') {
				getColorOldData((data) => {
					setDataColorOldResults(data);
			});
			}
		};
		fetchData()
		const intervalId = setInterval(() => {
			fetchData();
		  }, 1000); // Adjust the interval as needed
	  
		  // Bersihkan interval saat komponen dibongkar
		return () => clearInterval(intervalId);
	}, []);

	// cache pada texture
	useEffect(() => {
		const fetchData = () => {
			// Periksa apakah dokumen sudah terload
			if (document.readyState === 'complete') {
				getTextureOldData((data) => {
					setDataTextureOldResults(data);
			});
			}
		};
		fetchData()
		const intervalId = setInterval(() => {
			fetchData();
		  }, 1000); // Adjust the interval as needed
	  
		  // Bersihkan interval saat komponen dibongkar
		return () => clearInterval(intervalId);
	}, []);


	const lastPostIndex = currentPage * postPerPage;
	const firstPostIndex = lastPostIndex - postPerPage;

	// untuk warna
	const currentPostColor = dataColorResults.slice(firstPostIndex, lastPostIndex);
	const currentPostOldColor = dataColorOldResults.slice(firstPostIndex, lastPostIndex);

	// untuk texture
	// const [dataTextureOldResults, setDataTextureOldResults] = useState([]);
	const currentPostTexture = dataTextureResults.slice(firstPostIndex, lastPostIndex);
	const currentPostOldTexture = dataTextureOldResults.slice(firstPostIndex, lastPostIndex);

	if(pilihanAcuan === 'color'){
		if(cache){
			//const [dataColorOldResults, setDataColorOldResults] = useState([]);
			return (
				<>
					<div className = "justify-center">
						{`${dataColorOldResults.length} results in ${executionTimeColor.execution_time}`}
					</div>
					<ResultList dataResults={currentPostOldColor}/>
					<Pagination 
						totalPosts = {dataColorOldResults.length} 
						postPerPage = {postPerPage}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
				</>
			);
		}else{
			return (
				<>
					<div className = "justify-center">
						{`${dataColorResults.length} results in ${executionTimeColor.execution_time}`}
					</div>
					<ResultList dataResults={currentPostColor}/>
					<Pagination 
						totalPosts = {dataColorResults.length} 
						postPerPage = {postPerPage}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
				</>
			);
		}
	// texture const [dataTextureOldResults, setDataTextureOldResults] = useState([]);
	}else{
		if(cache){
			return (
				<>
				<div className = "justify-center">
					 {`${dataTextureOldResults.length} results in ${executionTimeTexture.executiontime}`}
				</div>
					<ResultList dataResults={currentPostOldTexture}/>
					<Pagination 
						totalPosts = {dataTextureOldResults.length} 
						postPerPage = {postPerPage}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
				</>
			);
		}else{
			return (
				<>
				<div className = "justify-center">
					 {`${dataTextureResults.length} results in ${executionTimeTexture.executiontime}`}
				</div>
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
	}
}

export default ResultSection; 