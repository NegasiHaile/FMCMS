import React from "react";
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
  // render
  return (
    <CRow>
      {/* {widgetsContent.map((widgt, index) => (
        <CCol sm="6" lg="3" Key={index}>
          <CWidgetDropdown
            color={widgt.color}
            header={widgt.header}
            text={widgt.text}
            footerSlot={
              <ChartLineSimple
                pointed
                className="c-chart-wrapper mt-3 mx-3"
                style={{ height: "70px" }}
                dataPoints={widgt.dataPoints}
                pointHoverBackgroundColor={widgt.pointHoverBackgroundColor}
                label="Members"
                labels="months"
              />
            }
          >
            <CDropdown>
              <CDropdownToggle color="transparent">
                <CIcon name={widgt.cicon} />
              </CDropdownToggle>
              <CDropdownMenu className="pt-0" placement="bottom-end">
                {widgt.dropdown.map((drpdwn, index) => (
                  <CDropdownItem key={index}>{drpdwn}</CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          </CWidgetDropdown>
        </CCol>
      ))} */}

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          style={{ backgroundColor: "#3CB371" }}
          header="4530"
          text="Machines"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[65, 59, 84, 84, 51, 55, 40, 30, 70, 100]}
              pointHoverBackgroundColor="#3CB371"
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
                <span>New Arrivals: </span> <span> 500</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Unsold: </span> <span> 4567</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Sold: </span> <span> 4567</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Processing: </span> <span> 67</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Damaged: </span> <span> 67</span>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header="83"
          text="MRC"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
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
                <span>Free: </span> <span>4567</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Taken: </span> <span>4567</span>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header="823"
          text="SIM Cards"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: "70px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
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
              <CDropdownItem to="/simcards/list" className="border-bottom">
                SIM Cards List
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>New Arrivals: </span> <span>567</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Free: </span> <span>567</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Taken: </span> <span>4567</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Discarded: </span> <span>467</span>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header="1423"
          text="Received Machines"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
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
                <span>Annual:</span> <span>4567</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Incident:</span> <span>4567</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Info' Change: </span> <span>4567</span>
              </CDropdownItem>
              <CDropdownItem to="/machine/return/list" className="border">
                {" "}
                Withdrawals List
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Widrawal: </span> <span>4567</span>
              </CDropdownItem>
              <CDropdownItem
                className="d-flex justify-content-between"
                disabled
              >
                <span>Tempo' Store: </span> <span>4567</span>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
