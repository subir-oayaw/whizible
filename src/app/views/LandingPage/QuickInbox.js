import React from "react";
import { Stack, Text } from "@fluentui/react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const QuickInbox = ({ qinbox }) => {
  console.log("qinbox", qinbox);

  // Extracting labels and data from qinbox.listLandingDBQinbox
  const labels = qinbox?.listLandingDBQinbox?.map((item) => item.natureofDemand) || [];
  const data = qinbox?.listLandingDBQinbox?.map((item) => item.countOfInitiative) || [];

  const polarAreaChartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ["#f8d7da", "#36A2EB", "#FFCE56", "#4BC0C0"], // Add more colors if needed
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };

  return (
    <Stack
      styles={{
        root: {
          backgroundColor: "white",
          padding: "16px", // Adjust padding if needed
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          flex: 1
        }
      }}
    >
      <Text variant="medium" styles={{ root: { fontWeight: "bold", marginBottom: "16px" } }}>
        Quick InBox
      </Text>
      <div style={{ width: "100%", height: "400px" }}>
        {" "}
        {/* Increased height */}
        <PolarArea data={polarAreaChartData} options={options} />
      </div>
    </Stack>
  );
};

export default QuickInbox;
