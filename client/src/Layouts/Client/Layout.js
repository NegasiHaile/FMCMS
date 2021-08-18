import React from "react";
import ClientSidbar from "./Sidebar";

import ClientHeader from "./Header";

import ClientContent from "./Contents";

import PrivateFooter from "../../Components/Footer/PrivateFooter";

const ClientLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <ClientSidbar />
      <div className="c-wrapper">
        <ClientHeader />
        <div className="c-body">
          <ClientContent />
        </div>
        <PrivateFooter />
      </div>
    </div>
  );
};

export default ClientLayout;
