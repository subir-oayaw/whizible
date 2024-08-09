import React from "react";
import { Stack, Text } from "@fluentui/react";
import { Carousel } from "react-bootstrap";
import "./AlertNotification.css"; // Assuming you're adding custom styles here

const notifications = [
  {
    title: "[New] Initiative Created",
    description: "Nature of Initiative/Type",
    date: "07 Aug 2022",
    color: "#ffc107",
    backgroundColor: "#fff3cd"
  },
  {
    title: "[Update] Initiative Updated",
    description: "Nature of Initiative/Type",
    date: "07 Aug 2022",
    color: "#28a745",
    backgroundColor: "#d4edda"
  },
  {
    title: "[Alert] Pending Approval",
    description: "Your approval is pending.",
    date: "08 Aug 2022",
    color: "#dc3545",
    backgroundColor: "#f8d7da"
  }
];

const AlertNotification = () => (
  <Stack
    tokens={{ childrenGap: 20 }}
    styles={{
      root: {
        flex: 1,
        backgroundColor: "white",
        padding: "23px", // Increased padding
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        "@media (max-width: 768px)": {
          padding: "16px" // Adjusted padding for smaller screens
        }
      }
    }}
  >
    <Text variant="large" styles={{ root: { fontWeight: "bold", marginBottom: "20px" } }}>
      Alert / Notification
    </Text>
    <Carousel
      indicators={false}
      controls={false}
      interval={3000}
      slide
      pause="hover"
      className="vertical-carousel"
    >
      {notifications.map((notification, index) => (
        <Carousel.Item key={index}>
          <Stack tokens={{ childrenGap: 10 }}>
            <Stack
              horizontal
              verticalAlign="center"
              tokens={{ childrenGap: 12 }}
              wrap
              styles={{
                root: {
                  backgroundColor: notification.backgroundColor,
                  padding: "24px", // Increased padding for larger card size
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  "@media (max-width: 768px)": {
                    padding: "16px", // Adjusted padding for smaller screens
                    flexDirection: "column",
                    alignItems: "flex-start"
                  }
                }
              }}
            >
              <Text variant="large" styles={{ root: { color: notification.color } }}>
                {notification.title}
              </Text>
              <Text variant="medium" styles={{ root: { color: "#6c757d" } }}>
                {notification.description}
              </Text>
              <Text
                variant="smallPlus"
                styles={{
                  root: {
                    color: "#6c757d",
                    marginLeft: "auto",
                    "@media (max-width: 768px)": {
                      marginLeft: 0,
                      marginTop: "8px"
                    }
                  }
                }}
              >
                {notification.date}
              </Text>
            </Stack>
          </Stack>
        </Carousel.Item>
      ))}
    </Carousel>
  </Stack>
);

export default AlertNotification;
