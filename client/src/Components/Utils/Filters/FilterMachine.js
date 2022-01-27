import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function FilterMachine(props) {
  const state = useContext(GlobalState);
  const [Machines] = state.MachineAPI.machines;

  if (props.filterBy === "mrc") {
    const filteredMachine = Machines.filter(
      (machine) => machine.MRC === props.mrcId
    );
    if (filteredMachine.length > 0) {
      return filteredMachine[0].serialNumber;
    } else {
      return "none";
    }
  }
  if (props.filterBy === "sim") {
    const filteredMachine = Machines.filter(
      (machine) => machine.SIM === props.simCardId
    );
    if (filteredMachine.length > 0) {
      return filteredMachine[0].serialNumber;
    } else {
      return "none";
    }
  } else {
    return "error";
  }
}

export default FilterMachine;
