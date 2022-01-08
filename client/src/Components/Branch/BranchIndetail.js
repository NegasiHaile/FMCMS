import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { useParams } from "react-router-dom";

import BadRouting from "../Utils/routing/BadRouting";
import BranchProfile from "../Branch/BranchProfile"
import Charts from "../charts/Charts";
import WidgetsDropdown from "../widgets/WidgetsDropdown";


function BranchIndetail() {
  const state = useContext(GlobalState);
  const params = useParams();
  const [allBranchs] = state.branchAPI.branchs;


  return (
    <>
      {allBranchs.filter((branch) => branch._id === params.id).length > 0 ? (
        <>
          <BranchProfile branchId = {params.id} />
          <WidgetsDropdown branchId = {params.id} />

      <Charts branchId = {params.id} />
        </>
      ) : (
        <BadRouting text="Bad routing! There is no branch with this routing!" />
      )}
    </>
  );
}

export default BranchIndetail;
