import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

import { CButton, CCard, CDataTable, CLink, CTooltip } from "@coreui/react";

function BusinessMachines({ businessId }) {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [businesses] = state.BusinessAPI.businesses;
  const [allSales] = state.SalesAPI.Sales;
  const [allMachines] = state.MachineAPI.machines;
  const [allSIMCards] = state.SIMCardAPI.simCards;
  const [mrcs] = state.MRCAPI.mrcs;

  const [callbackMachines, setCallbackMachines] = state.MachineAPI.callback;
  const [callbackBusiness, setCallbackBusiness] = state.BusinessAPI.callback;
  const [callbackSales, setCallbackSales] = state.SalesAPI.callback;

  const [salesPerBusiness, setSalesPerBusiness] = useState(null);

  useEffect(() => {
    if (allSales.length !== 0) {
      setSalesPerBusiness(
        allSales.filter(
          (filteredSales) => filteredSales.businessId === businessId
        )
      );
    } else {
      setSalesPerBusiness(null);
    }
  }, [businessId, allSales]);
  const sweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#1E263C",
      showConfirmButton: false,
      // timer: 1500,
    });
  };
  const cancelUnapprovedSales = async (saleId) => {
    try {
      Swal.fire({
        title: "Cancel?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E263C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.put(`/sales/cancel_unapprove_sale/${saleId}`);
          setCallbackSales(!callbackSales);
          setCallbackMachines(!callbackMachines);
          setCallbackBusiness(!callbackBusiness);
          sweetAlert("success", res.data.msg);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  const filterMRCusing_id = (id) => {
    const activeMRC = mrcs.filter((filteredMRC) => filteredMRC._id === id);
    if (activeMRC.length > 0) {
      return activeMRC[0].MRC;
    } else {
      return id;
    }
  };
  const filterSIMusing_id = (id) => {
    const SIMCard = allSIMCards.filter((filteredSIM) => filteredSIM._id === id);
    if (SIMCard.length > 0) {
      return SIMCard[0].simNumber;
    } else {
      return id;
    }
  };
  const salesTableAttributes = [
    "machineSerialNumber",
    "machineMRC",
    "machineSIM",
    "fiscalization",
    "status",
    "createdAt",
    {
      key: "Actions",
      label: "Actions",
      // _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  return (
    <div>
      {salesPerBusiness ? (
        <CDataTable
          size="sm"
          items={salesPerBusiness}
          fields={salesTableAttributes}
          scopedSlots={{
            machineMRC: (salesPerBusiness) => (
              <td>{filterMRCusing_id(salesPerBusiness.machineMRC)}</td>
            ),
            machineSIM: (salesPerBusiness) => (
              <td>{filterSIMusing_id(salesPerBusiness.machineSIM)}</td>
            ),
            Actions: (salesPerBusiness) => (
              <>
                <td className="d-flex justify-content-between">
                  {(user.userRole === "sales" ||
                    user.userRole === "client") && (
                    <>
                      {" "}
                      {salesPerBusiness.status === "New" ||
                      salesPerBusiness.status === "unapproved" ? (
                        <CLink
                          className="text-danger"
                          onClick={() =>
                            cancelUnapprovedSales(salesPerBusiness.saleId)
                          }
                        >
                          <CTooltip
                            content={`Remove machine from this business.`}
                          >
                            <CIcon name="cil-trash" />
                          </CTooltip>
                        </CLink>
                      ) : (
                        <CLink
                          className="text-primary"
                          to={`/pickup/machine/${salesPerBusiness.machineId}`}
                        >
                          <CTooltip
                            content={`Receive this machine for maintenance!`}
                          >
                            <CIcon name="cil-recycle" />
                          </CTooltip>
                        </CLink>
                      )}{" "}
                    </>
                  )}
                  <CLink
                    className="text-info"
                    to={`/machine/indetail/${salesPerBusiness.machineId}`}
                  >
                    <CTooltip content={`See more about this machine.`}>
                      <CIcon name="cil-align-center" />
                    </CTooltip>
                  </CLink>
                </td>
              </>
            ),
          }}
        />
      ) : (
        <h5 className="text-muted text-center">
          This business haven't a machine yet!
        </h5>
      )}
    </div>
  );
}

export default BusinessMachines;
