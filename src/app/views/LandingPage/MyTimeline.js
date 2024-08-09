import React from "react";
import { Stack, Text } from "@fluentui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const dateRanges = [
  { start: new Date(2024, 7, 1), end: new Date(2024, 7, 5), color: "red" },
  { start: new Date(2024, 7, 6), end: new Date(2024, 7, 10), color: "green" },
  { start: new Date(2024, 7, 11), end: new Date(2024, 7, 15), color: "yellow" }
];

const isInRange = (date, range) => date >= range.start && date <= range.end;

const getTileClassName = ({ date, view }) => {
  if (view === "month") {
    for (const range of dateRanges) {
      if (isInRange(date, range)) {
        return `highlight-${range.color}`;
      }
    }
  }
  return null;
};

const MyTimeline = () => (
  <Stack
    styles={{
      root: {
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        flex: 1,
        maxWidth: "100%",
        boxSizing: "border-box",
        "@media (max-width: 768px)": {
          padding: "12px" // Adjust padding on smaller screens
        }
      }
    }}
  >
    <Text variant="medium" styles={{ root: { fontWeight: "bold", marginBottom: "16px" } }}>
      My Timeline
    </Text>
    <Stack>
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 20 }}
        styles={{
          root: {
            marginBottom: "16px",
            "@media (max-width: 768px)": {
              flexDirection: "column", // Stack the calendar vertically on smaller screens
              childrenGap: 10 // Adjust gap between elements
            }
          }
        }}
      >
        <Calendar
          tileClassName={getTileClassName}
          style={{
            width: "100%", // Make sure the calendar takes up full width
            "@media (max-width: 768px)": {
              width: "100%" // Ensure full width on smaller screens
            }
          }}
        />
      </Stack>
    </Stack>
  </Stack>
);

export default MyTimeline;
