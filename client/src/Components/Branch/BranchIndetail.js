import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { useParams } from "react-router-dom";

import BadRouting from "../Utils/routing/BadRouting";
import BranchProfile from "../Branch/BranchProfile";
import WidgetsDropdown from "../widgets/WidgetsDropdown";
import Charts from "../charts/Charts";
import MainChartExample from "../charts/MainChartExample";
import RecentEvents from "../Dashboard/Tables/RecentEvents";

import { CSelect } from "@coreui/react";

function BranchIndetail() {
  const state = useContext(GlobalState);
  const params = useParams();
  const [allBranchs] = state.branchAPI.branchs;
  const [theYear, setTheYear] = useState(new Date().getFullYear());

  var workyears = [];

  const handleChange = (e) => {
    // console.log(" Done : "+ e.target.value)
    setTheYear(e.target.value);
    // console.log(" TheYear is : "+ JSON.stringify(theYear))
  };

  const getWorkYears = () => {
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      workyears.push(i);
    }
    return workyears;
  };

  return (
    <>
      {allBranchs.filter((branch) => branch._id === params.id).length > 0 ? (
        <>
          <BranchProfile branchId={params.id} />
          <WidgetsDropdown branchId={params.id} />

          <CSelect
            aria-label="Default select example"
            id="gender"
            name="theYear"
            onChange={handleChange}
            value={theYear}
            required
            border={"danger"}
          >
            <option value="" disabled>
              Select year to see report ...
            </option>
            {getWorkYears().map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </CSelect>

          <Charts branchId={params.id} theYear={theYear} />
          <MainChartExample branchId={params.id} theYear={theYear} />
          <RecentEvents branchId={params.id} />
        </>
      ) : (
        <BadRouting text="Bad routing! There is no branch with this routing!" />
      )}
    </>
  );
}

export default BranchIndetail;
