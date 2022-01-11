import React, { useContext } from "react";
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
  const [Sales] = state.SalesAPI.Sales;
  const [allBusinesses] = state.BusinessAPI.businesses;
  const [pickupMachines] = state.MachinePickUpAPI.machinePickups;

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
            }) == months[i] &&  new Date(business.createdAt).getFullYear() == props.theYear
        ).length
      );
    }

    for (let i = 0; i <= elements; i++) {
      linemachineSales.push(
        Sales.filter(
          (sale) =>
            new Date(sale.createdAt).toLocaleString("en-us", {
              month: "short",
            }) == months[i] && new Date(sale.createdAt).getFullYear() == props.theYear
        ).length
      );
    }

    doughnutSalesStatus.push(
      Sales.filter(
        (sale) => sale.status !== "completed" && sale.status !== "canceled" && new Date(sale.createdAt).getFullYear() == props.theYear
      ).length
    );
    doughnutSalesStatus.push(
      Sales.filter((sale) => sale.status === "completed" && new Date(sale.createdAt).getFullYear() == props.theYear).length 
    );
    doughnutSalesStatus.push(
      Sales.filter((sale) => sale.status === "canceled" && new Date(sale.createdAt).getFullYear() == props.theYear).length
    );
console.log("The doughnutSalesStatus :" +doughnutSalesStatus)
    for (let i = 0; i <= elements; i++) {
      barReceivedMachines.push(
        pickupMachines.filter(
          (pickup) =>
            new Date(pickup.createdAt).toLocaleString("en-us", {
              month: "short",
            }) == months[i] && new Date(pickup.createdAt).getFullYear() == props.theYear
        ).length
      );
    }

    let renewedSales = 0;
    const completedSales = Sales.filter((sale) => sale.status === "completed" && new Date(sale.createdAt).getFullYear() <= props.theYear)
    for (let i = 0; i < completedSales.length; i++) {
      if (completedSales[i].renewHistory) {
        var therenewhistry = completedSales[i].renewHistory;
        if (therenewhistry.includes(Number(props.theYear))) {
          renewedSales++;
        }
      }
      
    }
    // console.log("renewedSales outside :" + renewedSales)
    pushAnnualServiceArray.push(completedSales.length - renewedSales, renewedSales);
    
}

const dataPerBranch = () => {
  console.log(" Branch Before : "+ linemachineSales)
  let elements = months.length - 1;
  for (let i = 0; i <= elements; i++) {
    lineClientsBusinesses.push(
      allBusinesses.filter(
        (business) =>
        business.branch === props.branchId &&
          new Date(business.createdAt).toLocaleString("en-us", {
            month: "short",
          }) == months[i] &&  new Date(business.createdAt).getFullYear() == props.theYear
      ).length
    );
  }

  for (let i = 0; i <= elements; i++) {
    linemachineSales.push(
      Sales.filter(
        (sale) =>
        sale.branchId === props.branchId && new Date(sale.createdAt).toLocaleString("en-us", {
            month: "short",
          }) == months[i] && new Date(sale.createdAt).getFullYear() == props.theYear
      ).length
    );
  }

  doughnutSalesStatus.push(
    Sales.filter(
      (sale) => sale.branchId === props.branchId && sale.status !== "completed" && sale.status !== "canceled" 
      && new Date(sale.createdAt).getFullYear() == props.theYear).length
  );
  doughnutSalesStatus.push(
    Sales.filter((sale) => sale.branchId === props.branchId && sale.status === "completed" 
    && new Date(sale.createdAt).getFullYear() == props.theYear).length 
  );
  doughnutSalesStatus.push(
    Sales.filter((sale) => sale.branchId === props.branchId && sale.status === "canceled" 
    && new Date(sale.createdAt).getFullYear() == props.theYear).length
  );

  for (let i = 0; i <= elements; i++) {
    barReceivedMachines.push(
      pickupMachines.filter(
        (pickup) =>
        pickup.branchId === props.branchId && new Date(pickup.createdAt).toLocaleString("en-us", {
            month: "short",
          }) == months[i] && new Date(pickup.createdAt).getFullYear() == props.theYear
      ).length
    );
  }

  let renewedSales = 0;
  const branchCompletedSales = Sales.filter((sale) => sale.branchId === props.branchId && sale.status === "completed" && new Date(sale.createdAt).getFullYear() <= props.theYear)
  for (let i = 0; i < branchCompletedSales.length; i++) {
    if (branchCompletedSales[i].renewHistory) {
      var therenewhistry = branchCompletedSales[i].renewHistory;
      if (therenewhistry.includes(Number(props.theYear))) {
        renewedSales++;
      }
    }
  }
  pushAnnualServiceArray.push(branchCompletedSales.length - renewedSales, renewedSales);
}

//useEffect(() => {
  if (props.branchId && props.branchId !== "none" ){
    dataPerBranch()
    // console.log("datPerBranch: " + props.branchId)
  }else{
    getGeneralData()
    // console.log("getGeneralData: " + props.branchId)
  }
//}, [props])

  return (
    <CCardGroup columns className="cols-2">
      <CCard>
        <CCardHeader>Clients & Sales of {props.theYear} </CCardHeader>
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
        <CCardHeader>Sales status of {props.theYear}</CCardHeader>
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
        <CCardHeader>Received machines of {props.theYear}</CCardHeader>
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
        <CCardHeader>Annual service of {props.theYear}</CCardHeader>
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
