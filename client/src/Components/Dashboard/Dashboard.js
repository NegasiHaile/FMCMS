import React, { lazy } from "react";
import { CCard, CCardBody } from "@coreui/react";
import MainChartExample from "../charts/MainChartExample";
import Charts from "../charts/Charts";
import EmployeesList from "../Employee/EmployeesList";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const BranchAdminDashboard = () => {
  return (
    <>
      <WidgetsDropdown />
      <CCard>
        <CCardBody>
          <MainChartExample style={{ height: "300px", marginTop: "10px" }} />
        </CCardBody>
      </CCard>

      <Charts />

      <EmployeesList />
      <WidgetsBrand withCharts />
    </>
  );
};

export default BranchAdminDashboard;
