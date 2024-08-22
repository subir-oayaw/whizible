import React, { useState, useEffect } from "react";
import { Stack, Text } from "@fluentui/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MyTimeline.css";
const getColorCode = (timelineEntry) => {
  if (timelineEntry.isRed) return "red";
  if (timelineEntry.isGreen) return "green";
  if (timelineEntry.isBlue) return "blue";
  return null;
};

const tileContent = ({ date, view }, highlightedDates) => {
  if (view === "month") {
    const matchingDate = highlightedDates?.find(
      (d) =>
        d.date.getDate() === date.getDate() &&
        d.date.getMonth() === date.getMonth() &&
        d.date.getFullYear() === date.getFullYear()
    );
    if (matchingDate) {
      return (
        <div className="highlighted-date">
          <div
            className="circle"
            style={{
              backgroundColor: matchingDate.color
            }}
          >
            {date.getDate()}
          </div>
        </div>
      );
    }
  }
  return null;
};

const tileClassName = ({ date, view }, highlightedDates) => {
  if (view === "month") {
    const matchingDate = highlightedDates?.find(
      (d) =>
        d.date.getDate() === date.getDate() &&
        d.date.getMonth() === date.getMonth() &&
        d.date.getFullYear() === date.getFullYear()
    );
    if (matchingDate) {
      return "highlighted-date";
    }
  }
  return null;
};

const MyTimeline = ({ mTimeline, prevMonth, prevYear, setPrevMonth, setPrevYear }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {}, [mTimeline]);

  const highlightedDates = mTimeline?.landingDBMTimeline
    ?.map((entry) => {
      const color = getColorCode(entry);
      if (color) {
        return {
          date: new Date(
            entry.year,
            new Date(Date.parse(entry.monthName + " 1, 2021")).getMonth(),
            entry.day
          ),
          color
        };
      }
      return null;
    })
    .filter(Boolean);

  const handleDateChange = (newDate) => {
    const newMonth = newDate.getMonth();
    const newYear = newDate.getFullYear();

    if (newMonth !== prevMonth || newYear !== prevYear) {
      console.log(`Month changed to: ${newMonth}`);
      console.log(`Year changed to: ${newYear}`);
      setPrevMonth(newMonth);
      setPrevYear(newYear);
    }

    setDate(newDate);
    console.log(`Selected Date: ${newDate.toDateString()}`);
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    const newMonth = activeStartDate.getMonth();
    const newYear = activeStartDate.getFullYear();

    if (newMonth !== prevMonth || newYear !== prevYear) {
      console.log(`Month changed to: ${newMonth + 1}`);
      console.log(`Year changed to: ${newYear}`);
      setPrevMonth(newMonth);
      setPrevYear(newYear);
    }
  };

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
            padding: "12px"
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
                flexDirection: "column",
                childrenGap: 10
              }
            }
          }}
        >
          <Calendar
            onChange={handleDateChange}
            value={date}
            tileContent={(props) => tileContent(props, highlightedDates)}
            tileClassName={(props) => tileClassName(props, highlightedDates)}
            onActiveStartDateChange={handleActiveStartDateChange}
            style={{
              width: "100%",
              "@media (max-width: 768px)": {
                width: "100%"
              }
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MyTimeline;
