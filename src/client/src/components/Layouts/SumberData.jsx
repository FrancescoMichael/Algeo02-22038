import React, { useState } from "react";
import ToggleButton from "../Elements/Toggle/ToggleButton";
import Button from "../Elements/Button/Button";
import { useForm } from "react-hook-form";

function SumberData({ pilihanAcuan, setPilihanAcuan, cache, setCache }) {
  const [imageToTest, setImageToTest] = useState(null);
  const [imageForDataset, setImageForDataset] = useState(null);
  const [urlForDataset, setUrlForDataset] = useState("");
  const [notification, setNotification] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [showContentAcuan, setShowContentAcuan] = useState(true);
  const [showContentDataset, setShowContentDataset] = useState(true);
  const [pilihanCache, setPilihanCache] = useState(false);

  const toggleContentAcuan = () => {
    setShowContentAcuan(!showContentAcuan);
  };

  const toggleContentDataset = () => {
    setShowContentDataset(!showContentDataset);
  };

  const toggleContentCache = () => {
    setPilihanCache(!setPilihanCache);
  };


  const handleRunAlgorithm = async () => {
    console.log("test", imageToTest);
    console.log("imagedataset",imageForDataset);
    console.log("urldataset", urlForDataset);
    console.log("acuan : ",showContentAcuan);
    if(showContentAcuan){
      setPilihanAcuan('color');
    }else{
      setPilihanAcuan('tekstur');
    }

    if(!pilihanCache){
      setCache(true);
    }else{
      setCache(false);
    }

	console.log("acuan : ", pilihanAcuan);
  console.log("apakah cache?", cache);
	if (imageToTest && (imageForDataset || urlForDataset || !cache)) {
		const formData = new FormData();
		formData.append("imageToTest", imageToTest);

		if (imageForDataset) {
			formData.append("imageForDataset", imageForDataset);
		} else if (urlForDataset) {
			try {
				const urlScrapingResponse = await fetch("http://localhost:5000/urlscraping", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ urlForDataset }),
				});

				const urlScrapingResult = await urlScrapingResponse.json();
				console.log(urlScrapingResult);
			} catch (error) {
				console.error("Error sending URL data to /urlscraping:", error);
			}

			// setUrlForDataset("");
			return;
		}

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error running algorithm:", error);
    }

    if(!cache){
      try {
        const response = await fetch("http://localhost:5000/uploaddataset", {
          method: "POST",
          body: formData,
        });
  
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error("Error running algorithm:", error);
      }
    }
    } else {
      setNotification(
        "Please upload both images before running the algorithm."
      );
    }

	setUploadedFileName("");
	// setUploadedURLName("");
	setUrlForDataset("");
};

  return (
    <>
      <div className="w-full h-full container p-5 ml-10 mr-20 mt-10 mb-10 flex bg-red-100">
        <div className="w-1/2 mr-10 bg-black w-full justify-center">
          <div className="font-bold text-xl flex justify-center mb-5">
              TEST IMAGE
          </div>
          <div className = "flex justify-center items-center">
            <input
              type="file"
              onChange={(e) => setImageToTest(e.target.files[0])}
              className="mb-1 mt-5"
            />
            {imageToTest && (
              <img
                src={URL.createObjectURL(imageToTest)}
                alt="Test Image"
                className="mb-4 w-30 h-60"
              />
            )}
          </div>
        </div>

        <div className="w-1/2 ml-20 bg-green-400 w-full">
          <div className="font-bold text-xl flex justify-center mb-5">
            DATASET
          </div>
          <div className="mt-4">
            <p className="mb-2">Apakah ingin menggunakan dataset sebelumnya?</p>

            <ToggleButton
              textKiri="Tidak"
              textKanan="Iya"
              onClick={toggleContentCache}
            />

            {/* {cache ? (
              <NavigationProcess type="color" />
            ) : (
              <NavigationProcess type="tekstur" />
            )} */}
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="mt-2 md:w-1/2">
              <p className="mb-2">Pilih dataset :</p>
              <ToggleButton
                textKiri="Folder"
                textKanan="URL"
                onClick={toggleContentDataset}
              />
            </div>

            {showContentDataset ? (
              <NavigationUpload
                type="folder"
                setImageForDataset={setImageForDataset}
                setUploadedFileName={setUploadedFileName}
              />
            ) : (
              <NavigationUpload
                type="url"
                setUrlForDataset={setUrlForDataset}
                urlForDataset={urlForDataset}
              />
            )}
          </div>

          <div className="mt-4">
            <p className="mb-2">Pilih acuan</p>

            <ToggleButton
              textKiri="Warna"
              textKanan="Tekstur"
              onClick={toggleContentAcuan}
            />

            {/* {showContentAcuan ? (
              <NavigationProcess type="color" />
            ) : (
              <NavigationProcess type="tekstur" />
            )} */}
          </div>
        </div>
      </div>
      <div className = "bg-orange-100 mt-5 flex justify-center items-center flex-col">
          <Button text="Search" onClick={handleRunAlgorithm} className="mt-4" />

          {notification && (
            <div className="text-red-500">{notification}</div>
          )}
          {uploadedFileName && (
            <div className="mt-4">Uploaded File: {uploadedFileName}</div>
          )}
      </div>
      <div>
      </div>
    </>
  );
}

// function NavigationUpload({
//   type,
//   setImageForDataset,
//   setUrlForDataset,
//   setUploadedFileName,
// }) {
//   const [fileInput, setFileInput] = useState(null);
//   const [urlInput, setUrlInput] = useState("");
//   const { control } = useForm();

//   const handleFolderUpload = (e) => {
// 	const files = e.target.files;
  
// 	for (let i = 0; i < files.length; i++) {
// 	  const file = files[i];
  
// 	  // Lakukan sesuatu dengan setiap file (misalnya, upload ke server)
// 	  console.log(`File ${i + 1}: ${file.name}`);
// 	  console.log(`Path: ${file.webkitRelativePath}`);
// 	}
	
//   };

//   return (
//     <div style={{ width: "300px" }}>
//       {" "}
//       {/* Set a fixed width */}
//       <form>
//         {type === "folder" ? (
// 			<input
// 				type="file"
// 				onChange={(e) => {
// 					setUploadedFileName(e.target.files.name)
// 					setImageForDataset(e.target.files)
// 				}}
// 				name = "multiple_files"
// 				id = "multiple_files"
// 				webkitdirectory="true"
// 				directory="true"
// 				multiple
// 			/>
//         ) : (
//           <div>
//             {/* Adjust the styling for the URL input */}
//             <input
//               type="text"
//               value={urlInput}
//               onChange={(e) => setUrlForDataset(e.target.value)}
//               placeholder="Enter URL"
//               style={{ width: "90%", boxSizing: "border-box", padding: "8px" }}
//             />
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }


function NavigationUpload({
	type,
	setImageForDataset,
	setUrlForDataset,
	setUploadedFileName,
	}) {
	const [fileInput, setFileInput] = useState(null);
	const [urlInput, setUrlInput] = useState("");
	const { control } = useForm();

	const handleImageDatasetUpload = (e) => {
		setFileInput(e.target.files[0]);
		setUrlInput("");
		setUploadedFileName(e.target.files[0].name);
		setImageForDataset(e.target.files[0]);
	};
  
	return (
		<div className = "w-full">
		{" "}
		{/* Set a fixed width */}
		<form>
			{type === "folder" ? (
			<input
				type="file"
				onChange={(e) => {
				setUploadedFileName(e.target.files[0].name);
				setImageForDataset(e.target.files[0]);
				}}
			/>
			) : (
			<div>
				{/* Adjust the styling for the URL input */}
				<input
					type="text"
					value = {urlInput}
					onChange={(e) => setUrlForDataset(e.target.value)}
					placeholder = "Enter URL"
					className = "text-sm border rounded w-full py-2 px-3 text-slate-700 placeholder: opacity-50"
					name = "url"
				/>
			</div>
			)}
			</form>
		</div>
	);
}

// function NavigationProcess({ type }) {
//   return (
//     <div>
//       {type === "color" ? setPilihanAcuan() : <div>Proses tekstur</div>}
//     </div>
//   );
// }

export default SumberData;