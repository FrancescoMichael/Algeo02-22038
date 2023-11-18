import { useState } from "react";
import Button from "../Elements/Button/Button";
import ToggleButton from "../Elements/Toggle/ToggleButton";

function ProsesDataset() {
    const [showContent, setShowContent] = useState(true);
    const [type, setType] = useState("color");
    const [imageToTest, setImageToTest] = useState(null);
    const [imageForDataset, setImageForDataset] = useState(null);
    const [notification, setNotification] = useState('');
    const [uploadedFileName, setUploadedFileName] = useState('');
  
    const toggleContent = () => {
      setType(showContent ? "tekstur" : "color");
      setShowContent(!showContent);
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
      <div>
        <p>Pilih acuan</p>
        <ToggleButton
          textKiri="Warna"
          textKanan="Tekstur"
          onClick={toggleContent}
        />
        {showContent ? (
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
    );
  }
  

function NavigationProcess({type}){
    if(type === 'color'){
        return (
            <div>
                Proses warna
            </div>
        );
    }else{
        return (
            <div>
                Proses tekstur
            </div>
        );
    }
}


export default ProsesDataset