import React, {useContext} from "react";

import { GlobalState } from "../../GlobalState";

import { CCard, CCardBody } from "@coreui/react";
import MainChartExample from "../charts/MainChartExample";
import Charts from "../charts/Charts";
import EmployeesList from "../Employee/EmployeesList";


import WidgetsDropdown from "../widgets/WidgetsDropdown.js";
import WidgetsBrand from "../widgets/WidgetsBrand.js";

const BranchAdminDashboard = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  return (
    <>
      <WidgetsDropdown branchId = {user.branch} />

      <Charts branchId = {user.branch} />

      <CCard>
        <CCardBody>
          <MainChartExample />
        </CCardBody>
      </CCard>

      {/* <EmployeesList />
      <WidgetsBrand withCharts /> */}
    </>
  );
};

export default BranchAdminDashboard;
