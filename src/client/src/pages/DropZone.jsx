import React, { useState } from 'react';
import FileUpload from './FileUpload';

function Dropzone() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFilesUploaded = (files) => {
    setUploadedFiles(files);
  };

  return (
    <div className="App">
      <h1>Multi-File Upload</h1>
      <FileUpload onFilesUploaded={handleFilesUploaded} />
      <div>
        <h2>Uploaded Files:</h2>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dropzone;
