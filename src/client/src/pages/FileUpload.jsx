import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFilesUploaded }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    onFilesUploaded(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={dropzoneStyles}>
      <input {...getInputProps()} />
      <p>{isDragActive ? 'Drop the files here ...' : 'Drag and drop some files here, or click to select files'}</p>
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
};

export default FileUpload;
