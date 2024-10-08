import React, { useState } from "react";
import { Card, Col, Row, Accordion, ProgressBar } from "react-bootstrap";
import { Bar, Pie, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import initiatives from "./dummyData"; // Import the dummy data

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

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

const topNaturesData = [
  { nature: "Budget", count: 60, progressColor: "#28a745" }, // Green
  { nature: "Implementation", count: 37, progressColor: "#17a2b8" }, // Blue
  { nature: "Initiative Report", count: 67, progressColor: "#ffc107" }, // Yellow
  { nature: "Category", count: 24, progressColor: "#dc3545" }, // Red
  { nature: "Build Sea link", count: 75, progressColor: "#6f42c1" } // Purple
];

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

const InitiativeProgress = ({ nature, count, progressColor }) => (
  <div className="row mb-2">
    <div className="col-sm-6">
      <span className="skyTxt iniTxt">{nature} : </span>
    </div>
    <div className="col-sm-6">
      <ProgressBar
        now={count}
        label={`${count}`}
        style={{ backgroundColor: progressColor, height: "20px" }}
      />
    </div>
  </div>
);

const barOptions = {
  indexAxis: "y", // This makes the bar chart horizontal
  responsive: true,
  maintainAspectRatio: false // Disable aspect ratio to allow custom height
};

const scatterData = {
  labels: ["December", "November", "October", "September", "August"],
  datasets: [
    {
      label: "Monthly Data",
      data: [
        { x: "December", y: 50 },
        { x: "November", y: 45 },
        { x: "October", y: 10 },
        { x: "September", y: 68 },
        { x: "August", y: 75 }
      ],
      borderWidth: 5,
      pointBackgroundColor: ["#16872d", "#F5C330", "#F08000", "#239b9b", "#16872d"],
      pointRadius: 10,
      pointHoverRadius: 15
    }
  ]
};

const scatterOptions = {
  scales: {
    x: {
      type: "category",
      labels: ["December", "November", "October", "September", "August"],
      title: {
        display: true,
        text: "Months"
      }
    },
    y: {
      title: {
        display: true,
        text: "Values"
      }
    }
  },
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
};

const InitiativeCharts = (Graph, NOIData, ByOUData) => {
  console.log("InitiativeChartsWWW", Graph, NOIData, ByOUData);
  const orgUnitBarData = {
    labels: ["Org Unit 1", "Org Unit 2", "Org Unit 3", "Org Unit 4"],
    datasets: [
      {
        label: "Completed Initiatives",
        data: [12, 19, 3, 8],
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
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>View Charts</Accordion.Header>
        <Accordion.Body>
          <Row className="gx-3 gy-3">
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Scatter data={scatterData} options={scatterOptions} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Bar data={orgUnitBarData} options={barOptions} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <Pie data={pieData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default InitiativeCharts;
