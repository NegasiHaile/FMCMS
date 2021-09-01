import React from "react";
import { useParams } from "react-router-dom";
import MachineDetail from "./Components/MachineDetail";

function MachineDtail() {
  const params = useParams();

  return (
    <div>
      <MachineDetail id={params.id} />
    </div>
  );
}

export default MachineDtail;
