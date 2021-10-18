import React, { useState, useEffect, useContext } from "react";
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

const TheHeaderDropdownMaint = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [pickupMachines] = state.MachinePickUpAPI.machinePickups;
  // const [PickupCallback, setPickupCallback] = state.MachinePickUpAPI.callback;
  const [pickupMachine, setPickupMachine] = useState("");

  useEffect(() => {
    if (user.userRole === "machine-controller") {
      setPickupMachine(
        pickupMachines.filter(
          (pickup) =>
            (pickup.status === "controlling_maintenance" ||
              pickup.status === "controlling_delivery" ||
              pickup.status === "controlling_storing") &&
            pickup.branchId == user.branch
        )
      );
    } else if (user.userRole === "branch-store") {
      setPickupMachine(
        pickupMachines.filter(
          (pickup) =>
            pickup.status === "storing" && pickup.branchId == user.branch
        )
      );
    } else if (user.userRole === "customer-service") {
      setPickupMachine(
        pickupMachines.filter(
          (pickup) =>
            (pickup.status === "delivering" ||
              pickup.status === "controlling_maintenance") &&
            pickup.branchId == user.branch
        )
        // pickupMachines.filter(
        //   (pickup) =>
        //     (((pickup.status === "New" || pickup.status === "controlling") &&
        //       (pickup.category === "annual" ||
        //         pickup.category === "incident" ||
        //         pickup.category === "information_change")) ||
        //       pickup.status === "delivering") &&
        //     pickup.branchId == user.branch
        // )
      );
    } else if (user.userRole === "technician") {
      setPickupMachine(
        pickupMachines.filter(
          (pickup) =>
            pickup.status === "maintaining" &&
            pickup.technician === user._id &&
            pickup.branchId == user.branch
        )
      );
    } else if (user.userRole === "operational-manager") {
      setPickupMachine(
        pickupMachines.filter(
          (pickup) =>
            pickup.status !== "completed" &&
            pickup.status !== "stored" &&
            pickup.branchId == user.branch
        )
      );
    } else if (user.userRole === "branch-admin") {
      setPickupMachine(
        pickupMachines.filter(
          (pickup) =>
            pickup.status !== "completed" &&
            pickup.status !== "stored" &&
            pickup.branchId == user.branch
        )
      );
    } else if (
      user.userRole === "super-admin" ||
      user.userRole === "main-store"
    ) {
      setPickupMachine(
        pickupMachines.filter(
          (pickup) =>
            pickup.status !== "completed" && pickup.status !== "stored"
        )
      );
    }
    // setPickupCallback(!PickupCallback);
  }, [pickupMachines, user]);

  // console.log(pickupMachine);
  const itemsCount = pickupMachine.length;

  return (
    <CDropdown inNav className="c-header-nav-item mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-memory" />

        <CBadge shape="pill" color="danger">
          {itemsCount}
        </CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem header tag="div" className="text-center" color="light">
          <strong>You have {itemsCount} request(s)</strong>
        </CDropdownItem>
        {itemsCount !== 0 && (
          <>
            {pickupMachine.map((pickup, index) => (
              <CDropdownItem
                key={index}
                to={
                  (pickup.status === "New" ||
                    pickup.status === "controlling_maintenance") &&
                  user.userRole === "customer-service"
                    ? `/pickup/edit/${pickup.machineId}/${pickup._id}`
                    : `/pickup/detail/${pickup._id}`
                }
              >
                <div className="message">
                  <div className="pt-3 mr-3 float-left">
                    <div className="c-avatar">
                      <CImg
                        src={"/Others/fmimg1.jpg"}
                        className="c-avatar-img"
                        alt={pickup.serialNumber}
                      />
                    </div>
                  </div>
                  <div>
                    <small>
                      {" "}
                      {user.userRole === "customer-service"
                        ? pickup.technician === ""
                          ? "Technician unassigned!"
                          : "Technician Assigned!"
                        : pickup.status}
                    </small>
                    <small className=" float-right mt-1">Just now</small>
                  </div>
                  <div
                    className="text-truncate font-weight-bold"
                    style={{ maxWidth: "300px" }}
                  >
                    <span className="fa fa-exclamation text-danger"></span>{" "}
                    {pickup.category}, {pickup.serialNumber},{" "}
                    {pickup.machineBrand}
                  </div>
                  <div
                    className="small text-truncate"
                    style={{ maxWidth: "400px" }}
                  >
                    {pickup.tradeName}, TIN :{pickup.TIN} , VAT: {pickup.VAT},{" "}
                    {pickup.updatedAt},
                  </div>
                </div>
              </CDropdownItem>
            ))}
          </>
        )}
        <div className="border-top d-flex justify-content-between">
          <CDropdownItem to={`/maintenance/list`}>
            <strong>View all maintenance</strong>
          </CDropdownItem>
          <CDropdownItem to={`/machine/return/list`}>
            <strong>View all withdrawals</strong>
          </CDropdownItem>
        </div>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownMaint;
