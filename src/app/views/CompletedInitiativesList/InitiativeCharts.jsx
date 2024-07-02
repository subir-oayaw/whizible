import React from "react";
import { Card, Col, Row } from "react-bootstrap";
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
import initiatives from "./dummyData"; // Import the dummy data

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

// Calculate top 5 natures of initiatives
const natureCount = initiatives.reduce((acc, initiative) => {
  acc[initiative.nature] = (acc[initiative.nature] || 0) + 1;
  return acc;
}, {});

const topNatures = Object.entries(natureCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .reduce(
    (acc, [nature, count]) => {
      acc.labels.push(nature);
      acc.data.push(count);
      return acc;
    },
    { labels: [], data: [] }
  );

const barData = {
  labels: topNatures.labels,
  datasets: [
    {
      label: "Top 5 Nature of Initiatives",
      data: topNatures.data,
      backgroundColor: "rgba(75,192,192,0.6)"
    }
  ]
};

const InitiativeCharts = () => {
  const orgUnitBarData = {
    labels: ["Org Unit 1", "Org Unit 2", "Org Unit 3"],
    datasets: [
      {
        label: "Completed Initiatives",
        data: [12, 19, 3],
        backgroundColor: "rgba(75,192,192,0.6)"
      }
    ]
  };

  const pieData = {
    labels: ["Project", "Milestone", "Deliverable", "Module"],
    datasets: [
      {
        data: [10, 20, 30, 40],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
      }
    ]
  };

  return (
    <Row className="gx-3 gy-3">
      <Col md={4}>
        <Card className="h-100">
          <Card.Header>By Organization Unit</Card.Header>
          <Card.Body>
            <Bar data={orgUnitBarData} />
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
      <Col md={4}>
        <Card className="h-100">
          <Card.Header>Top 5 Nature of Initiatives</Card.Header>
          <Card.Body>
            <Bar data={barData} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default InitiativeCharts;
