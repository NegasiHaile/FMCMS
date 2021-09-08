import React from "react";
import { useParams } from "react-router-dom";
import MachineDetail from "./Components/MachineDetail";

function MachineIndetail() {
  const params = useParams();
  return (
    <div>
      <MachineDetail id={params.id} />
    </div>
  );
}

export default MachineIndetail;
