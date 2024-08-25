import React, { useState } from "react";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library

function SendFeedback() {
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for onchange event
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event //  "/uploads/8d9b075e-d454-48de-8c81-ec4a485b7c63-1629703904820.pdf"
  const [viewPdf, setViewPdf] = useState(null);

  // onchange event
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  // form submit
  const handlePdfFileSubmit = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
    } else {
      setViewPdf(null);
    }
  };
  return (
    <div className="container">
      <br></br>

      <form className="form-group" onSubmit={handlePdfFileSubmit}>
        <div className="input-group mb-3">
          <input
            type="file"
            className="form-control"
            required
            accept="application/pdf"
            onChange={handlePdfFileChange}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-dark btn-sm">
              Preview
            </button>
          </div>
        </div>

        {pdfFileError && <div className="error-msg">{pdfFileError}</div>}
        <br></br>
      </form>
      <h6>Business Credintials</h6>
      <div className="pdf-container">
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf && (
          <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
              <Viewer
                fileUrl={viewPdf}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker>
          </>
        )}

        {/* if we dont have pdf or viewPdf state is null */}
        {!viewPdf && <>No pdf file selected</>}
      </div>
      <br></br>
    </div>
  );
}

export default SendFeedback;
