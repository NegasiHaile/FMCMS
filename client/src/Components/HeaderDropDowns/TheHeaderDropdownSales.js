import React, { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import { GlobalState } from "../../GlobalState";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function TheHeaderDropdownSales() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [salesAlert, setSalesAlert] = useState("");
  const [alertLable, setAlertLable] = useState("");

  useEffect(() => {
    if (user.userRole === "operational-manager") {
      setSalesAlert(
        Sales.filter(
          (filteredSale) =>
            filteredSale.status === "unapproved" &&
            filteredSale.branchId == user.branch
        )
      );

      setAlertLable(" sales approvment ");
    } else if (user.userRole === "branch-store") {
      setSalesAlert(
        Sales.filter(
          (filteredSale) =>
            filteredSale.status === "instore" &&
            filteredSale.branchId == user.branch
        )
      );
      setAlertLable(" machine prepare ");
    } else if (user.userRole === "technician") {
      setSalesAlert(
        Sales.filter(
          (filteredSale) =>
            filteredSale.status === "fiscalization" &&
            filteredSale.branchId == user.branch &&
            filteredSale.technician == user._id
        )
      );
      setAlertLable(" fiscalization ");
    } else if (user.userRole === "machine-controller") {
      setSalesAlert(
        Sales.filter(
          (filteredSale) =>
            filteredSale.status === "controlling" &&
            filteredSale.branchId == user.branch
        )
      );
      setAlertLable(" controlling ");
    } else if (user.userRole === "customer-service") {
      setSalesAlert(
        Sales.filter(
          (filteredSale) =>
            filteredSale.branchId == user.branch &&
            (filteredSale.status === "delivering" ||
              filteredSale.status === "instore")
        )
      );
      setAlertLable(" devlivering ");
    } else if (user.userRole === "branch-admin") {
      setSalesAlert(
        Sales.filter(
          (filteredSale) =>
            filteredSale.status !== "completed" &&
            filteredSale.branchId == user.branch
        )
      );
      setAlertLable(" sales ");
    } else if (
      user.userRole === "super-admin" ||
      user.userRole === "main-store"
    ) {
      setSalesAlert(
        Sales.filter(
          (filteredSale) =>
            filteredSale.status !== "completed" &&
            filteredSale.status !== "canceled"
        )
      );
      setAlertLable(" sales ");
    }
  }, [Sales, user]);

  // console.log(salesAlert);
  const itemsCount = salesAlert.length;

  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-cart" />
        <CBadge shape="pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <div>
          <CDropdownItem header tag="div" color="light">
            <strong>
              You have {itemsCount} {alertLable} requests
            </strong>
          </CDropdownItem>

          {itemsCount && (
            <div style={{ overflowY: "scroll" }}>
              <div style={{ maxHeight: "400px" }}>
                {salesAlert.map((sale) => (
                  <CDropdownItem
                    key={sale.saleId}
                    to={
                      user.userRole === "customer-service" ||
                      user.userRole === "technician" ||
                      user.userRole === "machine-controller"
                        ? // && (sale.status === "instore" || sale.status === "delivering")
                          `/fiscalization/detail/${sale.saleId}`
                        : `/sales/detail/${sale.saleId}`
                    }
                    // to={`/sales/detail/${sale.saleId}`}
                  >
                    <div className="message">
                      <div className="pt-3 mr-3 float-left">
                        <div className="c-avatar">
                          <CImg
                            src={"/Others/bsnsIcon1.png"}
                            className="c-avatar-img"
                            alt={sale.machineSerialNumber}
                          />
                        </div>
                      </div>
                      <div>
                        <small>
                          {" "}
                          {user.userRole === "customer-service" &&
                          sale.status === "instore"
                            ? sale.technician === ""
                              ? "Technician = unassigned!"
                              : "Technician = Assigned!"
                            : sale.status}
                        </small>
                        {/* <small> {sale.status}</small> */}
                        <small className=" float-right mt-1">
                          {format(sale.updatedAt)}
                        </small>
                      </div>
                      <div
                        className="text-truncate font-weight-bold"
                        style={{ maxWidth: "300px" }}
                      >
                        <span className="fa fa-exclamation text-danger"></span>{" "}
                        {sale.machineSerialNumber}, {sale.machineBrand},{" "}
                        {sale.machineModel}
                      </div>
                      <div
                        className="small text-truncate"
                        style={{ maxWidth: "400px" }}
                      >
                        {sale.tradeName}, TIN :{sale.TIN} , VAT: {sale.VAT},{" "}
                        {sale.updatedAt}
                      </div>
                    </div>
                  </CDropdownItem>
                ))}
              </div>
            </div>
          )}

          <CDropdownItem
            className="text-center border-top"
            to={`/sales/oflist`}
          >
            <strong>View all {alertLable}</strong>
          </CDropdownItem>
        </div>
      </CDropdownMenu>
    </CDropdown>
  );
}

export default TheHeaderDropdownSales;
