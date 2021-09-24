import React, { useRef } from "react";

import FiscalizationItem from "./Components/FiscalizationItem";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        <FiscalizationItem />
      </div>
    );
  }
}

const FiscalizationDetail = () => {
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
            className="mr-2"
            size="sm"
            color="dark"
            onClick={handlePrint}
          >
            <CIcon name="cil-memory"></CIcon> Confirm fiscalization!
          </CButton>
          <CButton
            className="mr-2"
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

export default FiscalizationDetail;
