import React from "react";
import { Stack, Text } from "@fluentui/react";

const AlertNotification = () => (
  <Stack
    tokens={{ childrenGap: 20 }}
    styles={{
      root: {
        flex: 1,
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }
    }}
  >
    <Text variant="medium" styles={{ root: { fontWeight: "bold", marginBottom: "16px" } }}>
      Alert / Notification
    </Text>
    <Stack tokens={{ childrenGap: 10 }}>
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
          [New] Initiative Created
        </Text>
        <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
          Nature of Initiative/Type
        </Text>
        <Text variant="small" styles={{ root: { color: "#6c757d", marginLeft: "auto" } }}>
          07 Aug 2022
        </Text>
      </Stack>
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 10 }}
        styles={{
          root: {
            backgroundColor: "#d4edda",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }
        }}
      >
        <Text variant="medium" styles={{ root: { color: "#28a745" } }}>
          [Update] Initiative Updated
        </Text>
        <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
          Nature of Initiative/Type
        </Text>
        <Text variant="small" styles={{ root: { color: "#6c757d", marginLeft: "auto" } }}>
          07 Aug 2022
        </Text>
      </Stack>
    </Stack>
  </Stack>
);

export default AlertNotification;
