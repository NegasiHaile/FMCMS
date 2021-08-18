import React from 'react'
import BranchAdminSidbar from "./Sidebar";

import BranchAdminHeader from "./Header";

import BranchAdminContent from "./Contents";

import PrivateFooter from "../../Components/Footer/PrivateFooter";

const BranchAdminLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <BranchAdminSidbar/>
      <div className="c-wrapper">
        <BranchAdminHeader/>
        <div className="c-body">
          <BranchAdminContent/>
        </div>
        <PrivateFooter/>
      </div>
    </div>
  )
}

export default BranchAdminLayout
