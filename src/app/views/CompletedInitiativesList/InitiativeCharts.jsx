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
  console.log("Graph-cc4", Graph, NOIData, ByOUData);
  // Replacing dummy data with actual data
  const topNaturesData = NOIData?.listCompletedIniByConvertedToEntity?.map((item) => ({
    nature: item?.convertedTo,
    count: item?.countOfInitiative,
    progressColor: "#28a745" // Customize colors as needed
  }));
  console.log("Graph-cc1", topNaturesData);
  const orgUnitBarData = {
    labels: Graph?.listCompletedIniByOUEntity?.map((item) => item.location),
    datasets: [
      {
        label: "Completed Initiatives",
        data: Graph?.listCompletedIniByOUEntity?.map((item) => item.countOfInitiative),
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  const pieData = {
    labels: ByOUData?.listCompletedIniByNOIEntity?.map((item) => item.natureofDemand),
    datasets: [
      {
        data: ByOUData?.listCompletedIniByNOIEntity?.map((item) => item.countOfInitiative),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
      }
    ]
  };
  console.log("Graph-cc12", pieData);
  return (
    <Row className="gx-3 gy-3">
      <Col md={4}>
        <Card className="h-100">
          <Card.Header>By Organization Unit</Card.Header>
          <Card.Body>
            <Bar data={orgUnitBarData} options={barOptions} />
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100">
          <Card.Header>Top 5 Nature of Initiative</Card.Header>
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
          <Card.Header>Converted to Project / Milestone / Deliverable / Module</Card.Header>
          <Card.Body>
            <Pie data={pieData} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default InitiativeCharts;
