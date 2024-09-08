import React from "react";
import { CFooter } from "@coreui/react";

const PrivateFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; Copyright 2021-2024 </span>
        <a href="http://demer.com/" target="_blank" rel="noopener noreferrer">
          Demer
        </a>
        <span className="ml-1">FMCMS.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://demer.com" target="_blank" rel="noopener noreferrer">
          Demer solutions
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(PrivateFooter);
