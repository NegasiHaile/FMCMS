import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import { getConfig } from "../../../config";

function SenderEmailVerification() {
  const params = useParams();
  const { apiUrl } = getConfig();

  useEffect(() => {}, [params.verificationToken]);

  const sweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#3C4B64",
      showConfirmButton: true,
      // timer: 1500,
    });
  };

  const emailVerification = async () => {
    try {
      const res = await axios.put(
        `${apiUrl}/system/email_verification/${params.verificationToken}`
      );
      Swal.fire({
        position: "center",
        background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
        icon: "success",
        text: res.data.msg,
        confirmButtonColor: "#3C4B64",
        showConfirmButton: true,
        // timer: 1500,
      }).then(async (result) => {
        if (result.isConfirmed) {
          window.location.href = "/system/setting";
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
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
