import React from "react";
import { Stack, Text, Button } from "@fluentui/react";

const TodayPriority = () => (
  <Stack
    styles={{
      root: {
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        flex: 1
      }
    }}
  >
    <Text variant="medium" styles={{ root: { fontWeight: "bold", marginBottom: "16px" } }}>
      Today's Priority
    </Text>
    <Stack tokens={{ childrenGap: 10 }}>
      {" "}
      <Stack
        styles={{
          root: {
            backgroundColor: "white",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            flex: 1
          }
        }}
      >
        <Text variant="medium" styles={{ root: { fontWeight: "bold", marginBottom: "16px" } }}>
          Today's Priority
        </Text>
        <Stack tokens={{ childrenGap: 10 }}>
          <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 10 }}
            styles={{
              root: {
                backgroundColor: "#f8d7da",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              }
            }}
          >
            <Text variant="medium" styles={{ root: { color: "#dc3545" } }}>
              Risk Managed [Initiative-1]
            </Text>
            <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
              Probability-5, Impact-3, Magnitude-4
            </Text>
            <Button
              styles={{
                root: { backgroundColor: "#dc3545", color: "white" }
              }}
            >
              Identify
            </Button>
          </Stack>
          <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 10 }}
            styles={{
              root: {
                backgroundColor: "#fff3cd",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              }
            }}
          >
            <Text variant="medium" styles={{ root: { color: "#ffc107" } }}>
              Action Item [Initiative-2]
            </Text>
            <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
              Priority-High, Due date-29/07/2024
            </Text>
            <Button
              styles={{
                root: { backgroundColor: "#ffc107", color: "black" }
              }}
            >
              Initiated
            </Button>
          </Stack>
          <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 10 }}
            styles={{
              root: {
                backgroundColor: "#fff3cd",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              }
            }}
          >
            <Text variant="medium" styles={{ root: { color: "#ffc107" } }}>
              Priority Checklist [Initiative-3]
            </Text>
            <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
              Priority Score-75%
            </Text>
            <Button
              styles={{
                root: { backgroundColor: "#ffc107", color: "black" }
              }}
            >
              Pending
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  </Stack>
);

export default TodayPriority;
