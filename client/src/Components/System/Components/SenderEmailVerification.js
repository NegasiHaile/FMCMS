import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";

function SenderEmailVerification() {
  const params = useParams();
  const [verifiying, setVefiying] = useState([]);

  useEffect(() => {}, [params.verificationToken]);
  const emailVerification = async () => {
    try {
      const res = await axios.put(
        `/system/email_verification/${params.verificationToken}`
      );
      alert(res.data.msg);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol
            md="6"
            lg="5"
            className="shadow-lg p-3 mb-5 mx-3 bg-white rounded"
          >
            <CRow className="justify-content-center">
              <CCol md="11">
                <CRow className="justify-content-center">
                  <img
                    style={{
                      borderRadius: "50%",
                      height: "75px",
                    }}
                    className=" bg-white p-2 border"
                    alt="Logo"
                    src="/logo/smalllogo.png"
                  />
                </CRow>
              </CCol>
              <CCol md="11" className="my-4">
                <CCol sm="12" md="12">
                  <CButton
                    type="submit"
                    className="px-4 w-100 jptr-btn"
                    onClick={() => emailVerification()}
                  >
                    <CIcon name="cil-recycle" /> Verif Email!
                  </CButton>
                </CCol>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default SenderEmailVerification;
