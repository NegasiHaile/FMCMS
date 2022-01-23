import React, { useContext, useRef } from "react";

import MaintenanceListTable from "./Components/MaintenanceListTable";
import { GlobalState } from "../../GlobalState";
import {
  CButton,
} from "@coreui/react";

import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        <MaintenanceListTable />
      </div>
    );
  }
}

const MaintenanceList = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const style = { overflowX: "scroll" }
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
        {(user.userRole === "machine-controller" ||
          user.userRole === "branch-store" ||
          user.userRole === "technician" ||
          user.userRole === "customer-service") &&
          < >
            <CButton size="sm" className="jptr-btn" onClick={handlePrint} > Print this out!</CButton>
        </>}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceList;
