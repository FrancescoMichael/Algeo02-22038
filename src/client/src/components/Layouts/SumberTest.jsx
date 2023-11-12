import { useState } from "react";

function SumberTest(){
    const [selectedImage, setSelectedImage] = useState(0);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleUpload = () => {
        // Lakukan permintaan HTTP (misalnya, menggunakan axios) untuk mengirim gambar ke server Flask.
        // Anda juga dapat menambahkan data tambahan jika diperlukan.
    
        const formData = new FormData();
        formData.append('image', selectedImage);
    
        // Kirimkan formData ke server dengan metode POST
        // axios.post('/api/upload', formData)
        //   .then(response => {
        //     console.log('Gambar berhasil diunggah', response.data);
        //   })
        //   .catch(error => {
        //     console.error('Gagal mengunggah gambar', error);
        //   });
      };
    

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload}>Unggah Gambar</button>
        </div>
    );
}

export default SumberTest;