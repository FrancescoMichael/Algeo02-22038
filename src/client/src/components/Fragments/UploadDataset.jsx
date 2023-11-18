import { useState } from "react";
import Button from "../Elements/Button/Button";
import ToggleButton from "../Elements/Toggle/ToggleButton";
import InputURL from "../Elements/Input";
import ProsesDataset from "./ProsesDataset";


function UploadDataset(){
    const [showContent, setShowContent] = useState(true);
    const [type, setType] = useState("folder");

    const toggleContent = () => {
        setType(showContent ? "foler" : "url");
        setShowContent(!showContent);
    };

    return (
        
        // <Button 
        //     classname = "bg-blue-600"
        //     text = "Masukkan dataset di sini"
        //     // onClick = {() => handleaddtoCart(id)}
        //     />
        // <ToggleButton />

        <div className="container mx-auto mt-10 text-center">
        {/* <h1 className="text-2xl font-semibold mb-4">Toggle Button with Conditional Rendering</h1> */}
        <div className = "mt-10 flex-row">
            <p>Pilih dataset : </p>
            <ToggleButton 
                textKiri = "Folder"
                textKanan = "URL"
                onClick = {toggleContent}
            />
        </div>
        
        {showContent ? (
          <NavigationUpload type="folder" />
        ) : (
          <NavigationUpload type="url" />
        )}

        <ProsesDataset />
        {/* <button className="mt-4 p-2 bg-blue-500 text-white rounded-md" onClick={toggleContent}>
            Toggle Content
        </button>
        {showContent && <div className="mt-4">Konten yang akan ditampilkan atau disembunyikan</div>} */}
        </div>
    );
}

function NavigationUpload({type}){
    const [imageForDataset, setImageForDataset] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const handleImageDatasetUpload = (e) => {
        setImageForDataset(e.target.files[0]);
        setUploadedFileName(e.target.files[0].name);
      };

    if(type === "folder"){
        return (
            // <Button text="Upload Dataset" onClick={handleImageDatasetUpload} />
            <input type="file" onChange={handleImageDatasetUpload} />
        );
    }else if(type === "url"){
        return (
            <InputURL 
                name = "inputurl"
                type = "url"
                placeholder = "Masukkan url"
            />
        );
    }
}

export default UploadDataset;