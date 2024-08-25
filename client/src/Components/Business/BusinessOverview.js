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
function BusinessOverview(props) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const business = props;

  // for onchange event
  // const [pdfFile, setPdfFile] = useState(business.TL_Image);
  const [pdfFileError, setPdfFileError] = useState("");

  // for submit event
  const [viewPdf, setViewPdf] = useState(business.TL_Image);

  // onchange event
  useEffect(() => {
    const fileType = ["application/pdf"];
    if (business.TL_Image && fileType.includes(business.TL_Image.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(business.TL_Image);
      reader.onloadend = (e) => {
        setViewPdf(e.target.result);
        setPdfFileError("");
      };
    } else {
      setViewPdf(business.TL_Image);
      setPdfFileError("Please select valid pdf file");
    }
  });

  return (
    <>
      <CRow>
        <CCol sm="12" md="6" lg="4">
          <span className="d-flex justify-content-between">
            <span>Campany Name: </span>
            <span>{business.companyName}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Trade Name: </span>
            <span>{business.tradeName}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Business TIN: </span>
            <span>{business.TIN}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Business VAT: </span>
            <span>{business.VAT}</span>
          </span>
        </CCol>
        <CCol sm="12" md="6" lg="4">
          <span className="d-flex justify-content-between">
            <span>Location City: </span>
            <span>{business.city}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Sub City: </span>
            <span>{business.SubCity}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Kebele: </span>
            <span>{business.kebele}</span>
          </span>

          <span className="d-flex justify-content-between">
            <span>Woreda: </span>
            <span>{business.woreda}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Building Name: </span>
            <span>{business.buildingName}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Office Number: </span>
            <span>{business.officeNumber}</span>
          </span>
        </CCol>
        <CCol sm="12" md="6" lg="4">
          <span className="d-flex justify-content-between">
            <span>Email: </span>
            <span>{business.email}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>telephone: </span>
            <span>{business.telephone}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Fax: </span>
            <span>{business.fax}</span>
          </span>
          <hr></hr>

          <span className="d-flex justify-content-between">
            <span>Jupiter Branch: </span>
            <span>{business.branch}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Technician Id: </span>
            <span>{business.sw_Tech}</span>
          </span>
        </CCol>

        <CCol sm="12">
          <hr />
          <h6> Certificate/ Business Trade license</h6>
          <hr />
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

export default BusinessOverview;
