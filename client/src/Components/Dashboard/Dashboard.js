import React, {useContext, useState} from "react";

import { GlobalState } from "../../GlobalState";

import { CCard, CCardBody, CSelect  } from "@coreui/react";
import MainChartExample from "../charts/MainChartExample";
import Charts from "../charts/Charts";
import EmployeesList from "../Employee/EmployeesList";


import WidgetsDropdown from "../widgets/WidgetsDropdown.js";
import WidgetsBrand from "../widgets/WidgetsBrand.js";

import RecentEvents from "./Tables/RecentEvents"

const BranchAdminDashboard = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;

  const [theYear, setTheYear] = useState(new Date().getFullYear())

  const handleChange = (e) => {
    // console.log(" Done : "+ e.target.value)
    setTheYear(e.target.value)
    // console.log(" TheYear is : "+ JSON.stringify(theYear))

  }
  return (
    <>
      <WidgetsDropdown branchId = {user.branch} />

      {/* <CSelect 
          aria-label="Default select example"
          id="gender"
          name="theYear"
          onChange={handleChange}
          value={theYear}
          required
        >
          <option value="">Select year</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
      </CSelect> */}

      <Charts branchId = {user.branch}/>

      <MainChartExample branchId = {user.branch}/>
      {/* <WidgetsBrand withCharts  branchId = {user.branch}/> */}
      <RecentEvents branchId = {user.branch}/>
      <EmployeesList />
      
    </>
  );
};

export default BranchAdminDashboard;
