import { useState, useEffect } from "react";
import ToggleButton from "../Elements/Toggle/ToggleButton";
import Button from "../Elements/Button/Button";
import InputURL from "../Elements/Input";

function SumberDataset() {
  const [showContentDataset, setShowContentDataset] = useState(true);
  const [showContentAcuan, setShowContentAcuan] = useState(true);
  const [imageToTest, setImageToTest] = useState(null);
  const [imageForDataset, setImageForDataset] = useState(null);
  const [notification, setNotification] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const toggleContentDataset = () => {
    setShowContentDataset(!showContentDataset);
  };

  const toggleContentAcuan = () => {
    setShowContentAcuan(!showContentAcuan);
  };

  const handleImageTestUpload = (e) => {
    setImageToTest(e.target.files[0]);
    setUploadedFileName(e.target.files[0].name);
  };

  const handleImageDatasetUpload = (e) => {
    setImageForDataset(e.target.files[0]);
    setUploadedFileName(e.target.files[0].name);
  };

  const handleRunAlgorithm = async () => {
    if (imageToTest && imageForDataset) {
      const formData = new FormData();
      formData.append('imageToTest', imageToTest);
      formData.append('imageForDataset', imageForDataset);

      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('Error running algorithm:', error);
      }
    } else {
      setNotification('Please upload both images before running the algorithm.');
    }
  };
  

  return (
    <div className='w-1/2 flex-column flex-wrap justify-center'>
      <div className='font-bold text-xl flex justify-center mb-5'>
        DATASET
      </div>
      <div className='flex-wrap flex-row h-1/2'>
        <div className="container mx-auto mt-10 text-center">
          <div className="mt-10 flex-row">
            <p>Pilih dataset : </p>
            {/* <ToggleButton
              textKiri="Folder"
              textKanan="URL"
              onClick={toggleContentDataset}
            /> */}
            <input type="file" onChange={handleImageDatasetUpload} />
          </div>

          {/* {showContentDataset ? (
            <NavigationUpload type="folder" setImageForDataset={setImageForDataset} setUploadedFileName={setUploadedFileName} />
          ) : (
            <NavigationUpload type="url" setImageForDataset={setImageForDataset} setUploadedFileName={setUploadedFileName} />
          )} */}

          <div>
            <p>Pilih acuan</p>
            <ToggleButton
              textKiri="Warna"
              textKanan="Tekstur"
              onClick={toggleContentAcuan}
            />
            {showContentAcuan ? (
              <NavigationProcess type="color" />
            ) : (
              <NavigationProcess type="tekstur" />
            )}
            <Button
              text="Search"
              onClick={handleRunAlgorithm}
            />
            {notification && <div style={{ color: 'red' }}>{notification}</div>}
            {uploadedFileName && <div>Uploaded File: {uploadedFileName}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function NavigationUpload({ type, setImageForDataset, setUploadedFileName }) {
  const [fileInput, setFileInput] = useState(null);
  const [urlInput, setUrlInput] = useState('');

  const handleImageDatasetUpload = (e) => {
    setFileInput(e.target.files[0]);
    setUrlInput('');
    setUploadedFileName(e.target.files[0].name);
    setImageForDataset(e.target.files[0]);
  };

  const handleUrlInputChange = (e) => {
    setUrlInput(e.target.value);
    setFileInput(null);
    setUploadedFileName('');
    // You can set the URL input value in state if needed
  };

  return (
    <div>
      {type === "folder" ? (
        <input type="file" onChange={handleImageDatasetUpload} />
      ) : (
        <InputURL
          name="inputurl"
          type="url"
          placeholder="Masukkan url"
          value={urlInput}
          onChange={handleUrlInputChange}
        />
      )}
    </div>
  );
}

function NavigationProcess({ type }) {
  if (type === 'color') {
    return (
      <div>
        Proses warna
      </div>
    );
  } else {
    return (
      <div>
        Proses tekstur
      </div>
    );
  }
}

export default SumberDataset;
