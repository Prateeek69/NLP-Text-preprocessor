import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { FaRegClipboard, FaDownload } from 'react-icons/fa';


function App() {
  const [inputText, setInputText] = useState('');
  const [fileName, setFileName] = useState('');
  const [rawFileText, setRawFileText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const notify = (msg, type = "info") =>
      toast[msg.includes("error") || type === "error" ? "error" : "success"](msg);
    const downloadFile = () => {
    const blob = new Blob([processedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'processed_output.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(processedText);
    notify("Output copied to clipboard!");
  };

  const processText = async (text) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("text", text);

      const res = await axios.post("http://localhost:8000/predict-text", formData);
      setProcessedText(res.data);
      notify("Text processed successfully!");
    } catch (err) {
      notify("Text processing error!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = () => {
    if (!inputText.trim()) return notify("Text is empty!", "error");
    setRawFileText(inputText);
    setFileName('Text input');
    processText(inputText);
  };

  const handleFileUpload = async (file) => {
    if (!file || file.type !== "text/plain") return notify("Only .txt files allowed", "error");

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      setRawFileText(text);
      await processText(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const triggerFileSelect = () => document.getElementById('fileUpload').click();

  return (
    <div className="App" onDragEnter={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
      <ToastContainer />
      <div className="box">
        <h2>Text Preprocessor</h2>

        {/* Text input */}
        <textarea
          placeholder="Enter raw text..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <button onClick={handleTextSubmit} disabled={loading}>
          {loading ? <ClipLoader size={15} color="#fff" /> : "Submit Text"}
        </button>
        </div>

        {/* OR drop/upload file */}
        <hr />
        <div
          className={`dropzone ${dragActive ? 'active' : ''}`}
          onClick={triggerFileSelect}
        >
          <p>Drag & Drop your `.txt` file here or click to upload</p>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            style={{ display: 'none' }}
            id="fileUpload"
          />
        </div>

        {/* File name */}
        {fileName && <p className="file-name">File: {fileName}</p>}

        {/* Loading Spinner */}
        {loading && (
          <div className="loading">
            <ClipLoader size={40} color="#ff9800" />
            <p>Processing...</p>
          </div>
        )}

        {/* Output section */}
        {(rawFileText || processedText) && (
          <div className="results">
            <div>
              <h4>Raw Input</h4> 
              <pre>{rawFileText}</pre>
            </div>
            <div>
              <div className="output-header">
                  <strong>Processed Output</strong>
                  <div className="icon-row">
                    <FaRegClipboard className="icon" onClick={copyToClipboard} title="Copy to clipboard" />
                    {fileName !== 'Text input' && (
                      <FaDownload className="icon" onClick={downloadFile} title="Download as file" />
                    )}
                  </div>
                </div>
              <pre>{processedText}</pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
