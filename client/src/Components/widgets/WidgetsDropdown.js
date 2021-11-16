import React, { useContext } from "react";

import { GlobalState } from "../../GlobalState";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";

const WidgetsDropdown = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [allMachines] = state.MachineAPI.machines;
  const [allMRCs] = state.MRCAPI.mrcs;
  const [allSIMCards] = state.SIMCardAPI.simCards;
  const [pickupMachines] = state.MachinePickUpAPI.machinePickups;
  const widgetsContent = [
    {
      color: "gradient-primary",
      text: "Total Machines",
      header: "10",
      dataPoints: [65, 59, 84, 84, 51, 55, 40, 30, 70, 100],
      pointHoverBackgroundColor: "primary",
      options: { elements: { line: { tension: 0.00001 } } },
      label: "Machines",
      labels: "months",
      cicon: "cil-print",
      dropdown: [
        "Sold: 80",
        "Unsold: 320",
        "Fine: 1234",
        "Damaged: 89",
        "Maintainig: 13",
      ],
    },
    {
      color: "gradient-info",
      header: "83",
      text: "Total MRCs",
      dataPoints: [1, 18, 9, 17, 34, 22, 11],
      pointHoverBackgroundColor: "info",
      options: { elements: { line: { tension: 0.00001 } } },
      label: "MRCs",
      labels: "months",
      cicon: "cil-asterisk-circle",
      dropdown: ["Free: 80", "Taken: 320"],
    },
    {
      color: "gradient-warning",
      header: "823",
      text: "Total SIM Cards",
      dataPoints: [78, 81, 80, 45, 34, 12, 40],
      pointHoverBackgroundColor: "warning",
      options: { elements: { line: { borderWidth: 2.5 } } },
      label: "SIM Cards",
      labels: "months",
      cicon: "cil-file",
      dropdown: ["Free: 80", "Taken: 320", "Discarded: 80", "New SIMs: 80"],
    },
    {
      color: "gradient-danger",
      header: "1423",
      text: "Machine Receiving",
      dataPoints: [65, 59, 84, 84, 51, 55, 40, 30, 70, 100],
      pointHoverBackgroundColor: "danger",
      options: { elements: { line: { tension: 0.00001 } } },
      label: "Branchs",
      labels: "months",
      cicon: "cil-memory",
      dropdown: [
        "Annual Maintenance: 80",
        "Incident Maintenance: 320",
        "Information Change: 80",
      ],
    },
  ];
  const bgC8884D8 = {
    backgroundColor: "#8884D8",
  };
  const height70 = {
    height: "70px",
  };
  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={bgC8884D8}
          header={
            user.branch
              ? allMachines.filter((machine) => machine.branch === user.branch)
                  .length
              : allMachines.length
          }
          text="Machines"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={height70}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="#8884D8"
              label="Machines"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-print" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem to="/machines/list" className="border-bottom">
                Machines List
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>New Arrivals: </span>{" "}
                <span>
                  {user.branch
                    ? allMachines.filter(
                        (machine) =>
                          machine.branch === user.branch &&
                          machine.availableIn === "main-store"
                      ).length
                    : allMachines.filter(
                        (machine) =>
                          machine.branch === "none" || machine.branch === ""
                      ).length}
                </span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Unsold: </span>{" "}
                <span>
                  {user.branch
                    ? allMachines.filter(
                        (machine) =>
                          machine.branch === user.branch &&
                          machine.salesStatus === "unsold"
                      ).length
                    : allMachines.filter(
                        (machine) => machine.salesStatus === "unsold"
                      ).length}
                </span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Sold: </span>{" "}
                <span>
                  {user.branch
                    ? allMachines.filter(
                        (machine) =>
                          machine.branch === user.branch &&
                          machine.salesStatus === "sold"
                      ).length
                    : allMachines.filter(
                        (machine) => machine.salesStatus === "sold"
                      ).length}
                </span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Damaged: </span>{" "}
                <span>
                  {" "}
                  {user.branch
                    ? allMachines.filter(
                        (machine) =>
                          machine.branch === user.branch &&
                          machine.problemStatus === "damaged"
                      ).length
                    : allMachines.filter(
                        (machine) => machine.problemStatus === "damaged"
                      ).length}
                </span>
              </CDropdownItem>

              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Maintainig: </span>{" "}
                <span>
                  {user.branch
                    ? allMachines.filter(
                        (machine) =>
                          machine.branch === user.branch &&
                          machine.problemStatus === "maintainig"
                      ).length
                    : allMachines.filter(
                        (machine) => machine.problemStatus === "maintainig"
                      ).length}
                </span>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={
            user.branch
              ? allMRCs.filter((MRC) => MRC.branch === user.branch).length
              : allMRCs.length
          }
          text="MRC"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={height70}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              // options={{ elements: { line: { tension: 0.00001 } } }}
              label="MRC"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-asterisk-circle" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem to="/mrcs/list" className="border-bottom">
                MRC List
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Free: </span>{" "}
                <span>
                  {user.branch
                    ? allMRCs.filter(
                        (MRC) =>
                          MRC.branch === user.branch && MRC.status === "free"
                      ).length
                    : allMRCs.filter((MRC) => MRC.status === "free").length}
                </span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Taken: </span>{" "}
                <span>
                  {user.branch
                    ? allMRCs.filter(
                        (MRC) =>
                          MRC.branch === user.branch && MRC.status === "taken"
                      ).length
                    : allMRCs.filter((MRC) => MRC.status === "taken").length}
                </span>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={
            user.branch
              ? allSIMCards.filter((SIMCard) => SIMCard.branch === user.branch)
                  .length
              : allSIMCards.length
          }
          text="SIM Cards"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={height70}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              pointHoverBackgroundColor="warning"
              label="SIM Cards"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-file" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem to="/simcard/list" className="border-bottom">
                SIM Cards List
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>New Arrivals: </span>{" "}
                <span>
                  {user.branch
                    ? allSIMCards.filter(
                        (SIMCard) =>
                          SIMCard.branch === user.branch &&
                          SIMCard.availableIn === "main-store"
                      ).length
                    : allSIMCards.filter(
                        (SIMCard) => SIMCard.availableIn === "main-store"
                      ).length}
                </span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Free: </span>{" "}
                <span>
                  {user.branch
                    ? allSIMCards.filter(
                        (SIMCard) =>
                          SIMCard.branch === user.branch &&
                          SIMCard.status === "free"
                      ).length
                    : allSIMCards.filter((SIMCard) => SIMCard.status === "free")
                        .length}
                </span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Taken: </span>{" "}
                <span>
                  {user.branch
                    ? allSIMCards.filter(
                        (SIMCard) =>
                          SIMCard.branch === user.branch &&
                          SIMCard.status === "taken"
                      ).length
                    : allSIMCards.filter(
                        (SIMCard) => SIMCard.status === "taken"
                      ).length}
                </span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Discarded: </span>{" "}
                <span>
                  {user.branch
                    ? allSIMCards.filter(
                        (SIMCard) =>
                          SIMCard.branch === user.branch &&
                          SIMCard.status === "discarded"
                      ).length
                    : allSIMCards.filter(
                        (SIMCard) => SIMCard.status === "discarded"
                      ).length}
                </span>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={
            user.branch
              ? pickupMachines.filter(
                  (pickup) => pickup.branchId === user.branch
                ).length
              : pickupMachines.length
          }
          text="Received Machines"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={height70}
              backgroundColor="rgb(250, 152, 152)"
              label="Machines"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-recycle" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem to="/maintenance/list" className="border-bottom">
                {" "}
                Maintenance List
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Annual:</span>{" "}
                <span>
                  {user.branch
                    ? pickupMachines.filter(
                        (pickup) =>
                          pickup.branchId === user.branch &&
                          pickup.category === "annual"
                      ).length
                    : pickupMachines.filter(
                        (pickup) => pickup.category === "annual"
                      ).length}
                </span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Incident:</span>{" "}
                <span>
                  {user.branch
                    ? pickupMachines.filter(
                        (pickup) =>
                          pickup.branchId === user.branch &&
                          pickup.category === "incident"
                      ).length
                    : pickupMachines.filter(
                        (pickup) => pickup.category === "incident"
                      ).length}
                </span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Info' Change: </span>{" "}
                <span>
                  {user.branch
                    ? pickupMachines.filter(
                        (pickup) =>
                          pickup.branchId === user.branch &&
                          pickup.category === "information_change"
                      ).length
                    : pickupMachines.filter(
                        (pickup) => pickup.category === "information_change"
                      ).length}
                </span>
              </CDropdownItem>
              <CDropdownItem to="/machine/return/list" className="border">
                {" "}
                Withdrawals List
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Widrawal: </span>{" "}
                <span>
                  {user.branch
                    ? pickupMachines.filter(
                        (pickup) =>
                          pickup.branchId === user.branch &&
                          pickup.category === "withdrawal"
                      ).length
                    : pickupMachines.filter(
                        (pickup) => pickup.category === "withdrawal"
                      ).length}
                </span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Tempo' Store: </span>{" "}
                <span>
                  {user.branch
                    ? pickupMachines.filter(
                        (pickup) =>
                          pickup.branchId === user.branch &&
                          pickup.category === "temporarly_store"
                      ).length
                    : pickupMachines.filter(
                        (pickup) => pickup.category === "temporarly_store"
                      ).length}
                </span>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
