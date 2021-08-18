import React from 'react'
import SuperAdminSidbar from "./Sidebar";

import SuperAdminHeader from "./Header";

import SuperAdminContent from "./Contents";

import PrivateFooter from "../../Components/Footer/PrivateFooter";

const SuperAdminLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <SuperAdminSidbar/>
      <div className="c-wrapper">
        <SuperAdminHeader/>
        <div className="c-body">
          <SuperAdminContent/>
        </div>
        <PrivateFooter/>
      </div>
    </div>
  )
}

export default SuperAdminLayout
