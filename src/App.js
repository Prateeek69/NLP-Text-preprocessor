import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [textResponse, setTextResponse] = useState('');
  const [fileName, setFileName] = useState('');
  const [processedBlob, setProcessedBlob] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleTextSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("text", inputText);

      const res = await axios.post("http://localhost:8000/predict-text", formData);
      setTextResponse(res.data);
    } catch (err) {
      alert("Error processing text input.");
    }
  };

  const handleFileUpload = async (file) => {
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:8000/predict-file", formData, {
        responseType: 'blob',
      });

      setProcessedBlob(new Blob([res.data], { type: "text/plain" }));
    } catch (err) {
      alert("Error processing file.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "text/plain") {
      handleFileUpload(file);
    } else {
      alert("Only .txt files are allowed.");
    }
  };

  const triggerFileSelect = () => {
    document.getElementById('fileUpload').click();
  };

  const handleManualSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      handleFileUpload(file);
    } else {
      alert("Only .txt files are allowed.");
    }
  };

  const downloadProcessedFile = () => {
    const url = URL.createObjectURL(processedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "preprocessed_text_output.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="App" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
      <div className="box">
        <h2>Text Preprocessor</h2>

        {/* Text input section */}
        <textarea
          placeholder="Enter raw text..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={handleTextSubmit}>Submit Text</button>
        {textResponse && <pre className="response">{textResponse}</pre>}

        <hr />

        {/* File upload section */}
        <div className={`dropzone ${dragActive ? 'active' : ''}`} onClick={triggerFileSelect}>
          <p>Drag & drop your `.txt` file here</p>
          <p>(or click to select a file)</p>
          <input
            type="file"
            accept=".txt"
            onChange={handleManualSelect}
            style={{ display: 'none' }}
            id="fileUpload"
          />
        </div>

        {fileName && <p className="file-name">Uploaded: {fileName}</p>}

        {processedBlob && (
          <button className="download-btn" onClick={downloadProcessedFile}>
            Download Processed File
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
