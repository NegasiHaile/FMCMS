/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { CRow, CCol } from "@coreui/react";
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library

function PdfViewer({ thePdfFile }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // for submit event
  const [viewPdf, setViewPdf] = useState(thePdfFile);

  // onchange event
  useEffect(() => {
    const fileType = ["application/pdf"];
    if (thePdfFile && fileType.includes(thePdfFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(thePdfFile);
      reader.onloadend = (e) => {
        setViewPdf(e.target.result);
        // setPdfFileError("");
      };
    } else {
      setViewPdf(thePdfFile);
      // setPdfFileError("Please select valid pdf file");
    }
  });
  return (
    <>
      <CRow>
        <CCol sm="12">
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
            {!viewPdf && <h5>No pdf file selected</h5>}
          </div>
        </CCol>
      </CRow>
    </>
  );
}

export default PdfViewer;
