import React from "react";
import { CCard, CCardBody } from "@coreui/react";
import MainChartExample from "../charts/MainChartExample";
import Charts from "../charts/Charts";
import EmployeesList from "../Employee/EmployeesList";

// const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
// const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));
import WidgetsDropdown from "../widgets/WidgetsDropdown.js";
import WidgetsBrand from "../widgets/WidgetsBrand.js";
const BranchAdminDashboard = () => {
  return (
    <>
      <WidgetsDropdown />

      <Charts />

      <CCard>
        <CCardBody>
          <MainChartExample />
        </CCardBody>
      </CCard>

      <EmployeesList />
      <WidgetsBrand withCharts />
    </>
  );
};

export default BranchAdminDashboard;
