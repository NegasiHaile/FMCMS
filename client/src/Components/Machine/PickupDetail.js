import React, { useRef } from "react";

import {
  MachinePickupDetail,
  MachinePickupOperations,
} from "./Components/MachinePickupDetail";
import PrintButton from "../Utils/Buttons/PrintButton";

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
  const style = { overflowX: "scroll" };
  return (
    <div>
      <div
        style={style}
        className="rounded px-3"
        // 3C4B64: sidebar-color, EBEDEF: Background-color
      >
        <ComponentToPrint ref={componentRef} />
      </div>
      <div className="d-flex justify-content-end">
        <div>
          <MachinePickupOperations />

          <PrintButton
            handlePrint={handlePrint}
            printType="oldmachine_delivery"
          />
        </div>
      </div>
    </div>
  );
};

export default PickupDetail;
