import React from "react";
import { Stack, Text } from "@fluentui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Helper function to map color codes
const getColorCode = (timelineEntry) => {
  if (timelineEntry.isRed) return "red";
  if (timelineEntry.isGreen) return "green";
  if (timelineEntry.isBlue) return "blue";
  return null;
};

const getTileClassName = ({ date, view }, highlightedDates) => {
  if (view === "month") {
    const matchingDate = highlightedDates?.find(
      (d) => d.date.toDateString() === date.toDateString()
    );
    if (matchingDate) {
      return `highlight-${matchingDate.color}`;
    }
  }
  return null;
};

const MyTimeline = ({ mTimeline }) => {
  const highlightedDates = mTimeline?.landingDBMTimeline
    ?.map((entry) => {
      const color = getColorCode(entry);
      if (color) {
        return { date: new Date(entry.year, entry.monthName - 1, entry.day), color };
      }
      return null;
    })
    .filter(Boolean);

  return (
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
            tileClassName={(props) => getTileClassName(props, highlightedDates)}
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
};

export default MyTimeline;
