import React, { useRef } from "react";

import {
  FiscalizationItem,
  FiscalizationOperations,
} from "./Components/FiscalizationItem";
import PrintButton from "../Utils/Buttons/PrintButton";

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
          <PrintButton handlePrint={handlePrint} printType="sales_delivery" />
        </div>
      </div>
    </div>
  );
};

export default FiscalizationDetail;
