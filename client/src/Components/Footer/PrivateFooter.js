import React from "react";
import { CFooter } from "@coreui/react";

const PrivateFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; 2021.</span>
        <a
          href="http://jupiter-tradingeth.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jupiter-Trading
        </a>
        <span className="ml-1"> FMCMS.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://Horizontechict.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          HorizonTECH-ICT-Solution
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(PrivateFooter);
