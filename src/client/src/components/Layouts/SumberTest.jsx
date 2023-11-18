import { useState } from "react";

function SumberTest(){
    // const [selectedImage, setSelectedImage] = useState(0);

    // const handleImageUpload = (event) => {
    //     const file = event.target.files[0];
    //     setSelectedImage(file);
    //   };

    // const handleImageSubmit = () => {
    //     const formData = new FormData();
    //     formData.append('image', selectedImage);
      
    //     fetch('/api/upload', {
    //       method: 'POST',
    //       body: formData,
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         // Tangani respons dari server Flask jika diperlukan.
    //       })
    //       .catch((error) => {
    //         // Tangani kesalahan.
    //       });
    //   };
    
    // const [file, setFile] = useState();

    // function handleChange(e){
    //     console.log(e.target.files);
    //     setFile(URL.createObjectURL(e.target.files[0]));
    // }

    const [imageToTest, setImageToTest] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState('');

    const handleImageTestUpload = (e) => {
        setImageToTest(e.target.files[0]);
        setUploadedFileName(e.target.files[0].name);
    };

    return (
        <div className = 'fles flex-row justify-center'>
            <h2 className = 'justify-center mt-10 items-center'>
                Add image
            </h2>
            <input type="file" onChange={handleImageTestUpload} />
            <img src = {imageToTest} />
        </div>
    );
}

export default SumberTest;