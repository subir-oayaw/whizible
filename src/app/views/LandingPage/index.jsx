import React, { useState } from "react";
import { Stack, DefaultButton } from "@fluentui/react";
import ProfileCard from "./ProfileCard";
import StatisticsCard from "./StatisticsCard";
import AlertNotification from "./AlertNotification";
import TodayPriority from "./TodayPriority";
import QuickInbox from "./QuickInbox";
import MyTimeline from "./MyTimeline";

const Dashboard = () => {
  // Define initial card order
  const initialCards = [
    { id: 1, component: <ProfileCard /> },
    { id: 2, component: <StatisticsCard /> },
    { id: 3, component: <AlertNotification /> },
    { id: 4, component: <TodayPriority /> },
    { id: 5, component: <QuickInbox /> },
    { id: 6, component: <MyTimeline /> }
  ];

  // Set initial state
  const [cards, setCards] = useState(initialCards);

  // Shuffle function
  const shuffleCards = () => {
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#F9F9F9", minHeight: "100vh" }}>
      <DefaultButton text="Shuffle Cards" onClick={shuffleCards} />

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
            {cards.slice(0, 2).map((card) => (
              <div key={card.id}>{card.component}</div>
            ))}
          </Stack>
          {/* Alert/Notification */}
          <Stack
            styles={{ root: { flex: 1, minWidth: "300px", maxWidth: "30%", marginLeft: "20px" } }}
          >
            {cards.slice(2, 3).map((card) => (
              <div key={card.id}>{card.component}</div>
            ))}
          </Stack>
        </Stack>

        {/* Second Row */}
        <Stack horizontal tokens={{ childrenGap: 20 }} styles={{ root: { flexWrap: "wrap" } }}>
          {cards.slice(3).map((card) => (
            <Stack key={card.id} styles={{ root: { flex: 1, minWidth: "300px" } }}>
              {card.component}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default Dashboard;
