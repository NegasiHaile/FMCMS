import React, { useRef } from "react";

import {
  FiscalizationItem,
  FiscalizationOperations,
} from "./Components/FiscalizationItem";
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
          <FiscalizationOperations />
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
