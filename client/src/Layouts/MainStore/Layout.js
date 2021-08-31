import React from "react";
import Sidebar from "./Sidebar";

import Header from "./Header";

import Content from "./Contents";

import PrivateFooter from "../../Components/Footer/PrivateFooter";

const MainStoreLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <Sidebar />
      <div className="c-wrapper">
        <Header />
        <div className="c-body">
          <Content />
        </div>
        <PrivateFooter />
      </div>
    </div>
  );
};

export default MainStoreLayout;
