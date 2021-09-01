import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import BadRouting from "../../Utils/routing/BadRouting";

function MachineDetail({ id }) {
  const params = useParams();
  const state = useContext(GlobalState);
  const [machines] = state.MachineAPI.machines;
  const [machieneDetail, setMachieneDetail] = useState("");

  useEffect(() => {
    if (id && machines) {
      const machine = machines.find(
        (filteredMachine) => filteredMachine._id === id
      );
      setMachieneDetail(machine);
    } else {
    }
  }, [id, machines]);

  return (
    <div>
      <>
        {machieneDetail ? (
          <h1>Machine id : {id}</h1>
        ) : (
          <BadRouting text="This is bad routing! No machine data to fetch, please go back to machines list page and click the see-detail button of the machine you need to see it's detail." />
        )}{" "}
      </>
    </div>
  );
}

export default MachineDetail;
