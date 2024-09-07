import { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

function FilterSIMCard(props) {
  const state = useContext(GlobalState);
  const [allSIMCards] = state.SIMCardAPI.simCards;
  if (props.filterType === "simNumber") {
    const SIMCard = allSIMCards.filter(
      (filteredSIM) => filteredSIM._id === props.simId
    );
    if (SIMCard.length > 0) {
      return SIMCard[0].simNumber;
    } else {
      return props.simId;
    }
  }
}

export default FilterSIMCard;
