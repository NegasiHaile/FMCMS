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
      {widgetsContent.map((widgt, index) => (
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
      ))}

      {/*
<CCol sm="6" lg="3" Key={index}>
          <CWidgetDropdown
            color="gradient-primary"
            header="10"
            text="Branchs"
            footerSlot={
              <ChartLineSimple
                pointed
                className="c-chart-wrapper mt-3 mx-3"
                style={{ height: "70px" }}
                dataPoints={[65, 59, 84, 84, 51, 55, 40, 30, 70, 100]}
                pointHoverBackgroundColor="primary"
                label="Members"
                labels="months"
              />
            }
          >
            <CDropdown>
              <CDropdownToggle color="transparent">
                <CIcon name="cil-settings" />
              </CDropdownToggle>
              <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem>Open Branch</CDropdownItem>
                <CDropdownItem>Branchs List</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CWidgetDropdown>
        </CCol>

       <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header="83"
          text="Employees"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Add Employee</CDropdownItem>
              <CDropdownItem>Employee List</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header="823"
          text="Clients"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: "70px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Add Client</CDropdownItem>
              <CDropdownItem>Clients List</CDropdownItem>
              <CDropdownItem disabled>Quantity: 4567</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header="1423"
          text="Businesses"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Business List</CDropdownItem>
              <CDropdownItem disabled>Quantity: 4567</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol> */}
    </CRow>
  );
};

export default WidgetsDropdown;
