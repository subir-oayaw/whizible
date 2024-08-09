import React from "react";
import { Stack, Text } from "@fluentui/react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const polarAreaChartData = {
  labels: ["Label 1", "Label 2", "Label 3"],
  datasets: [
    {
      data: [10, 20, 30],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      borderWidth: 1
    }
  ]
};

const QuickInbox = () => (
  <Stack
    styles={{
      root: {
        backgroundColor: "white",
        padding: "8px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        flex: 1
      }
    }}
  >
    <Text variant="medium" styles={{ root: { fontWeight: "bold", marginBottom: "16px" } }}>
      Quick InBox
    </Text>
    <div style={{ width: "100%", height: "300px" }}>
      <PolarArea data={polarAreaChartData} />
    </div>
  </Stack>
);

export default QuickInbox;
