import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress,
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function TheHeaderDropdownSales() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [salesAlert, setSalesAlert] = useState("");

  useEffect(() => {
    if (user.userRole === "operational-manager") {
      setSalesAlert(
        Sales.filter(
          (filteredSale) =>
            filteredSale.status === "unapproved" &&
            filteredSale.branchId == user.branch
        )
      );
    } else if (user.userRole === "branch-store") {
      setSalesAlert(
        Sales.filter(
          (filteredSale) =>
            filteredSale.status === "instore" &&
            filteredSale.branchId == user.branch
        )
      );
    } else if (user.userRole === "technician") {
      setSalesAlert(
        Sales.filter(
          (filteredSale) =>
            filteredSale.status === "fiscalization" &&
            filteredSale.branchId == user.branch
        )
      );
    }
  }, [Sales, user]);

  console.log(salesAlert);
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
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {itemsCount} requests</strong>
        </CDropdownItem>

        {itemsCount && (
          <>
            {salesAlert.map((sale) => (
              <CDropdownItem className="d-block" key={sale._id}>
                <CLink
                  className="small mb-1"
                  to={`/sales/detail/${sale.saleId}`}
                >
                  {sale.tradeName} {sale.machineSerialNumber}
                </CLink>
                <CProgress size="xs" color="info" value={0} />
              </CDropdownItem>
            ))}
          </>
        )}

        <CDropdownItem className="text-center border-top">
          <strong>View all requests</strong>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
}

export default TheHeaderDropdownSales;
