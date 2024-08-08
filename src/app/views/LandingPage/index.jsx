import React from "react";
import { Stack } from "@fluentui/react";
import ProfileCard from "./ProfileCard";
import StatisticsCard from "./StatisticsCard";
import AlertNotification from "./AlertNotification";
import TodayPriority from "./TodayPriority";
import QuickInbox from "./QuickInbox";
import MyTimeline from "./MyTimeline";

const Dashboard = () => (
  <div style={{ padding: "24px", backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
    <Stack tokens={{ childrenGap: 20 }}>
      {/* First Row */}
      <Stack
        horizontal
        styles={{ root: { marginBottom: "20px", width: "100%", flexWrap: "wrap" } }}
      >
        {/* Profile card and Statistics card */}
        <Stack
          tokens={{ childrenGap: 20 }}
          styles={{ root: { flex: 1, minWidth: "300px", maxWidth: "70%" } }}
        >
          <ProfileCard />
          <StatisticsCard />
        </Stack>
        {/* Alert/Notification */}
        <Stack
          styles={{ root: { flex: 1, minWidth: "300px", maxWidth: "30%", marginLeft: "20px" } }}
        >
          <AlertNotification />
        </Stack>
      </Stack>

      {/* Second Row */}
      <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { flexWrap: "wrap" } }}>
        <Stack styles={{ root: { flex: 1, minWidth: "300px" } }}>
          <TodayPriority />
        </Stack>
        <Stack styles={{ root: { flex: 1, minWidth: "300px" } }}>
          <QuickInbox />
        </Stack>
        <Stack styles={{ root: { flex: 1, minWidth: "300px" } }}>
          <MyTimeline />
        </Stack>
      </Stack>
    </Stack>
  </div>
);

export default Dashboard;
