import React from "react";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
function PrintButton(props) {
  return (
    <CButton
      className="mr-2"
      size="sm"
      color="primary"
      onClick={props.handlePrint}
    >
      <CIcon name="cil-print"></CIcon> Print this out!
    </CButton>
  );
}

export default PrintButton;
