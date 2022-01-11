import React, { useContext, useState, } from "react";
import { CCard, CCardBody, CCardGroup, CCardHeader } from "@coreui/react";
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartPie,
} from "@coreui/react-chartjs";

import { GlobalState } from "../../GlobalState";
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const Charts = (props) => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [allBusinesses] = state.BusinessAPI.businesses;
  const [pickupMachines] = state.MachinePickUpAPI.machinePickups;

  const [theYear, setTheYear] =  useState(new Date().getFullYear())

  var linemachineSales = [];
  var lineClientsBusinesses = [];
  var barReceivedMachines = [];
  var doughnutSalesStatus = [];
  var pushAnnualServiceArray = [];

  

const  getGeneralData = () => {
  let elements = months.length - 1;
    for (let i = 0; i <= elements; i++) {
      lineClientsBusinesses.push(
        allBusinesses.filter(
          (business) =>
            new Date(business.createdAt).toLocaleString("en-us", {
              month: "short",
            }) == months[i] &&  new Date(business.createdAt).getFullYear() === theYear
        ).length
      );
    }

    for (let i = 0; i <= elements; i++) {
      linemachineSales.push(
        Sales.filter(
          (sale) =>
            new Date(sale.createdAt).toLocaleString("en-us", {
              month: "short",
            }) == months[i] && new Date(sale.createdAt).getFullYear() === theYear
        ).length
      );
    }

    doughnutSalesStatus.push(
      Sales.filter(
        (sale) => sale.status !== "completed" && sale.status !== "canceled" && new Date(sale.createdAt).getFullYear() === theYear
      ).length
    );
    doughnutSalesStatus.push(
      Sales.filter((sale) => sale.status === "completed" && new Date(sale.createdAt).getFullYear() === theYear).length 
    );
    doughnutSalesStatus.push(
      Sales.filter((sale) => sale.status === "canceled" && new Date(sale.createdAt).getFullYear() === theYear).length
    );

    for (let i = 0; i <= elements; i++) {
      barReceivedMachines.push(
        pickupMachines.filter(
          (pickup) =>
            new Date(pickup.createdAt).toLocaleString("en-us", {
              month: "short",
            }) == months[i] && new Date(pickup.createdAt).getFullYear() === theYear
        ).length
      );
    }

    let renewedSales = 0;
    for (let i = 0; i < Sales.length; i++) {
      if (Sales[i].renewHistory) {
        var therenewhistry = Sales[i].renewHistory;
        if (therenewhistry.includes(new Date().getFullYear())) {
          renewedSales++;
        }
      }
    }
    pushAnnualServiceArray.push(Sales.length - renewedSales, renewedSales);
    
}

const dataPerBranch = () => {
  let elements = months.length - 1;
  for (let i = 0; i <= elements; i++) {
    lineClientsBusinesses.push(
      allBusinesses.filter(
        (business) =>
        business.branch === props.branchId &&
          new Date(business.createdAt).toLocaleString("en-us", {
            month: "short",
          }) == months[i] &&  new Date(business.createdAt).getFullYear() === theYear
      ).length
    );
  }

  for (let i = 0; i <= elements; i++) {
    linemachineSales.push(
      Sales.filter(
        (sale) =>
        sale.branchId === props.branchId && new Date(sale.createdAt).toLocaleString("en-us", {
            month: "short",
          }) == months[i] && new Date(sale.createdAt).getFullYear() === theYear
      ).length
    );
  }

  doughnutSalesStatus.push(
    Sales.filter(
      (sale) => sale.branchId === props.branchId && sale.status !== "completed" && sale.status !== "canceled" 
      && new Date(sale.createdAt).getFullYear() === theYear).length
  );
  doughnutSalesStatus.push(
    Sales.filter((sale) => sale.branchId === props.branchId && sale.status === "completed" 
    && new Date(sale.createdAt).getFullYear() === theYear).length 
  );
  doughnutSalesStatus.push(
    Sales.filter((sale) => sale.branchId === props.branchId && sale.status === "canceled" 
    && new Date(sale.createdAt).getFullYear() === theYear).length
  );

  for (let i = 0; i <= elements; i++) {
    barReceivedMachines.push(
      pickupMachines.filter(
        (pickup) =>
        pickup.branchId === props.branchId && new Date(pickup.createdAt).toLocaleString("en-us", {
            month: "short",
          }) == months[i] && new Date(pickup.createdAt).getFullYear() === theYear
      ).length
    );
  }

  let renewedSales = 0;
  const branchsales = Sales.filter((sale) => sale.branchId === props.branchId)
  for (let i = 0; i < branchsales.length; i++) {
    if (branchsales[i].renewHistory) {
      var therenewhistry = branchsales[i].renewHistory;
      if (therenewhistry.includes(theYear)) {
        renewedSales++;
      }
    }
  }
  pushAnnualServiceArray.push(branchsales.length - renewedSales, renewedSales);
}

//useEffect(() => {
  if (props.branchId && props.branchId !== "none" ){
    dataPerBranch()
    console.log("datPerBranch: " + props.branchId)
  }else{
    getGeneralData()
    console.log("getGeneralData: " + props.branchId)
  }
//}, [props])
  return (
    <CCardGroup columns className="cols-2">
      <CCard>
        <CCardHeader>Clients & Sales of {theYear} </CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: "Clients",
                backgroundColor: "#FF6384",
                data: lineClientsBusinesses,
              },
              {
                label: "Sales",
                backgroundColor: "#36A2EB",
                data: linemachineSales,
              },
            ]}
            options={{
              tooltips: {
                enabled: true,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: true,
                    },
                  },
                ],
              },
            }}
            labels={months}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Sales status of {theYear}</CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
                data: doughnutSalesStatus,
              },
            ]}
            labels={["Proccessing", "Complated", "Canceled"]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Received machines of {theYear}</CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: "Received Machines",
                backgroundColor: "#8884D8",
                data: barReceivedMachines,
              },
            ]}
            labels={months}
            options={{
              tooltips: {
                enabled: true,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                    gridLines: {
                      display: true,
                    },
                  },
                ],
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Annual service of {theYear}</CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: ["#FF6384", "#36A2EB"],
                data: pushAnnualServiceArray,
              },
            ]}
            labels={["Unrenewed", "Renewed"]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default Charts;
