import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
function FilterMRC(props) {
  const state = useContext(GlobalState);
  const [mrcs] = state.MRCAPI.mrcs;
  if (props.filterType === "mrcNumber") {
    const activeMRC = mrcs.filter(
      (filteredMRC) => filteredMRC._id === props.mrcId
    );
    if (activeMRC.length > 0) {
      return activeMRC[0].MRC;
    } else {
      return props.mrcId;
    }
  }
}

export default FilterMRC;
