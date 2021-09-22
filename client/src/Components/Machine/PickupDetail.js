import React, { useRef } from "react";

import MachinePickupDetail from "./Components/MachinePickupDetail";
import {
  CButton,
  CCard,
  CCardBody,
  CImg,
  CRow,
  CCol,
  CLabel,
  CLink,
  CForm,
  CFormGroup,
  CSelect,
  CTooltip,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        <MachinePickupDetail />
      </div>
    );
  }
}

const PickupDetail = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div
        style={{ overflowX: "scroll" }}
        className="rounded px-3"
        // 3C4B64: sidebar-color, EBEDEF: Background-color
      >
        <ComponentToPrint ref={componentRef} />
      </div>
      <div className="d-flex justify-content-end">
        <div>
          <CButton
            className="my-1"
            size="sm"
            color="primary"
            onClick={handlePrint}
          >
            <CIcon name="cil-print"></CIcon> Print this out!
          </CButton>
        </div>
      </div>
    </div>
  );
};

export default PickupDetail;
