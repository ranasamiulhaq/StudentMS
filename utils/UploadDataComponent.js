// src/utils/UploadDataComponent.js
import React, { useEffect } from 'react';
import uploadData from './uploadData';

const UploadDataComponent = () => {
  useEffect(() => {
    uploadData();
  }, []);

  return null; // This component doesn't render anything
};

export default UploadDataComponent;
