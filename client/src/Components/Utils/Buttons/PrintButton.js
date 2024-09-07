/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
function PrintButton(props) {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  return (
    <>
      {user.userRole === "customer-service" ? (
        <CButton
          className="mr-2 jptr-btn"
          size="sm"
          onClick={props.handlePrint}
        >
          <CIcon name="cil-print"></CIcon> Print this out!
        </CButton>
      ) : (
        <span className="text-danger">
          Printing of this page is allowed to customer service only!
        </span>
      )}
    </>
  );
}

export default PrintButton;
