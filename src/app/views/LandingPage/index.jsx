import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import ProfileCard from "./ProfileCard";
import StatisticsCard from "./StatisticsCard";
import AlertNotification from "./AlertNotification";
import TodayPriority from "./TodayPriority";
import QuickInbox from "./QuickInbox";
import MyTimeline from "./MyTimeline";
import { FaSync, FaRandom } from "react-icons/fa"; // Import icons

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultLayout = [
  { i: "profile", x: 0, y: 0, w: 3, h: 1, minW: 3, maxW: 3, minH: 1, maxH: 1 },
  { i: "statistics", x: 0, y: 1, w: 3, h: 1, minW: 3, maxW: 3, minH: 1, maxH: 1 },
  { i: "alert", x: 3, y: 0, w: 1, h: 2, minW: 1, maxW: 1, minH: 2, maxH: 2 },
  { i: "timeline", x: 0, y: 2, w: 1, h: 1, minW: 1, maxW: 2, minH: 1, maxH: 1 },
  { i: "quick", x: 1, y: 2, w: 1, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 1 },
  { i: "today", x: 2, y: 2, w: 2, h: 1, minW: 1, maxW: 1, minH: 1, maxH: 1 }
];

const Dashboard = () => {
  const [layout, setLayout] = useState(defaultLayout);

  const resetLayout = () => {
    window.location.reload();
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <button
          onClick={resetLayout} // Call resetLayout on click
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#0078d4"
          }}
        >
          <FaRandom />
        </button>
        <button
          onClick={() => console.log("Refresh data")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#0078d4"
          }}
        >
          <FaSync />
        </button>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 4 }} // Number of columns in the grid
        rowHeight={150}
        width={1200}
      >
        <div key="profile" style={{ backgroundColor: "#fff", padding: "10px" }}>
          <ProfileCard />
        </div>
        <div key="statistics" style={{ backgroundColor: "#fff", padding: "10px" }}>
          <StatisticsCard />
        </div>
        <div key="alert" style={{ backgroundColor: "#fff", padding: "10px" }}>
          <AlertNotification />
        </div>
        <div key="timeline" style={{ backgroundColor: "#fff", padding: "10px" }}>
          <MyTimeline />
        </div>
        <div key="quick" style={{ backgroundColor: "#fff", padding: "10px" }}>
          <QuickInbox />
        </div>
        <div key="today" style={{ backgroundColor: "#fff", padding: "10px" }}>
          <TodayPriority />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
