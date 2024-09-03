import React from "react";
import { Card, Col, Row, ProgressBar } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const InitiativeProgress = ({ nature, count, progressColor }) => {
  const maxCount = 10;
  const progressValue = (count / maxCount) * 100; // Calculate the percentage

  return (
    <div className="row mb-2">
      <div className="col-sm-6">
        <span className="skyTxt iniTxt">{nature} </span>
      </div>
      <div className="col-sm-6">
        <ProgressBar now={progressValue} label={`${count}`} style={{ height: "20px" }} />
      </div>
    </div>
  );
};

const barOptions = {
  indexAxis: "y", // This makes the bar chart horizontal
  responsive: true,
  maintainAspectRatio: false // Disable aspect ratio to allow custom height
};

const InitiativeCharts = ({ Graph, NOIData, ByOUData }) => {
  // Replacing dummy data with actual data
  const topNaturesData = NOIData?.listWareHouseIniByNOIEntity?.map((item) => ({
    nature: item?.noi,
    count: item?.countOfInitiative,
    progressColor: "#28a745" // Customize colors as needed
  }));

  const orgUnitBarData = {
    labels: Graph?.listWareHouseIniByStatusEntity?.map((item) => item.status),
    datasets: [
      {
        label: "Count of Initiatives",
        data: Graph?.listWareHouseIniByStatusEntity?.map((item) => item.countOfInitiative),
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  const pieData = {
    labels: ByOUData?.listWareHouseIniByMonthVM?.map((item) => item.monthName),
    datasets: [
      {
        data: ByOUData?.listWareHouseIniByMonthVM?.map((item) => item.countOfInitiative),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
      }
    ]
  };

  // Adding console logs for debugging
  console.log("Graph:", Graph);
  console.log("NOIData:", NOIData);
  console.log("ByOUData:", ByOUData);
  console.log("topNaturesData:", topNaturesData);
  console.log("orgUnitBarData:", orgUnitBarData);
  console.log("pieData:", pieData);

  return (
    <Row className="gx-3 gy-3">
      <Col md={4}>
        <Card className="h-100">
          <Card.Header>By Status</Card.Header>
          <Card.Body>
            <Bar data={orgUnitBarData} options={barOptions} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100">
          <Card.Header>Top Nature of Initiatives</Card.Header>
          <Card.Body>
            <div className="topIniDiv">
              {topNaturesData?.map((item, index) => (
                <InitiativeProgress
                  key={index}
                  nature={item.nature}
                  count={item.count}
                  progressColor={item?.progressColor}
                />
              ))}
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100">
          <Card.Header>Initiatives by Month</Card.Header>
          <Card.Body>
            <Pie data={pieData} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default InitiativeCharts;
