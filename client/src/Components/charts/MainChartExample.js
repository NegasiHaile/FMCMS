import React, { useContext, useEffect } from "react";

import { GlobalState } from "../../GlobalState";

import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";

const brandSuccess = getStyle("success") || "#4dbd74";
const brandInfo = getStyle("info") || "#20a8d8";
const brandDanger = getStyle("danger") || "#f86c6b";

const MainChartExample = (attributes) => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;

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

  const machineSales = [];
  const annualMaintenance = [];
  const incidentMaintenance = [];
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const generalData = () => {
    let elements = months.length - 1;
    for (let i = 0; i <= elements; i++) {
      machineSales.push(
        Sales.filter(
          (sale) =>
            new Date(sale.createdAt).toLocaleString("en-us", {
              month: "short",
            }) == months[i]
        ).length
      );
      annualMaintenance.push(random(40, 100));
      // incidentMaintenance.push(65);
      incidentMaintenance.push(random(70, 150));
    }
  };

  const branchData = () => {
    let elements = months.length - 1;
    for (let i = 0; i <= elements; i++) {
      machineSales.push(
        Sales.filter(
          (sale) =>
            sale.branchId === user.branch &&
            new Date(sale.createdAt).toLocaleString("en-us", {
              month: "short",
            }) == months[i]
        ).length
      );
      annualMaintenance.push(random(40, 100));
      incidentMaintenance.push(random(70, 150));
    }
  };

  // useEffect(() => {
  //   if (user.branch) {
  //     branchData();
  //   } else {
  //     generalData();
  //   }
  // }, [user, Sales]);
  const defaultDatasets = (() => {
    if (user.branch) {
      branchData();
    } else {
      generalData();
    }
    return [
      {
        label: "Machine sales",
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: machineSales,
      },
      {
        label: "Annual Maintenance",
        backgroundColor: "transparent",
        borderColor: brandSuccess,
        pointHoverBackgroundColor: brandSuccess,
        borderWidth: 2,
        data: annualMaintenance,
      },
      {
        label: "Incident Maintenance",
        backgroundColor: "transparent",
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 1,
        borderDash: [8, 5],
        data: incidentMaintenance,
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,

      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
            scaleLabel: {
              labelString: "Months",
              display: true,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(250 / 5),
              max: 250,
            },
            scaleLabel: {
              labelString: "Machine quantity",
              display: true,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  // render
  return (
    <CChartLine
      {...attributes}
      datasets={defaultDatasets}
      options={defaultOptions}
      labels={months}
    />
  );
};

export default MainChartExample;

// CChartBar;
// CChartLine;
// CChartHorizontalBar;
// CChartDoughnut;
// CChartRadar;
// CChartPie;
// CChartPolarArea;
