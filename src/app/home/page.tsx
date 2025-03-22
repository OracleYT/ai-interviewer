'use client'

// import { createInterview } from '@/action/interview-action';
import { useState } from 'react';

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<any>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle file upload submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    setUploading(true);
    setUploadSuccess(null);

    const formData = new FormData();
    formData.append('file', file);
    console.log('formData', formData);

    try {
      const res = await fetch('/api/s3upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setUploadSuccess(data);
      } else {
        setUploadSuccess({ message: 'Error uploading file jj' });
      }
    } catch (err) {
      setUploadSuccess({ message: 'Error uploading file' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Upload File to S3</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept="image/*,video/*,application/*" // Adjust the accepted file types as needed
          />
        </div>
        <button type="submit" disabled={uploading}>Upload</button>
      </form>
      
      {uploading && <p>Uploading...</p>}
      {uploadSuccess && <p>{uploadSuccess.message || 'File uploaded successfully!'}</p>}
      
      {/* Optionally display the uploaded file URL */}
      {uploadSuccess?.file?.location && (
        <div style={{ marginTop: '20px' }}>
          <h3>Uploaded File:</h3>
          <a href={uploadSuccess.file.location} target="_blank" rel="noopener noreferrer">
            {uploadSuccess.file.location}
          </a>
        </div>
      )}

      {/* <button onClick={()=>{
        createInterview({
          userId: "1",
          title: "Interview with Ava Maxx",
        });
      }}>Create interview</button> */}
    </div>
  );
};

export default Home;
