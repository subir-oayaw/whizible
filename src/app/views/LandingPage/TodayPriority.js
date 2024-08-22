import React from "react";
import { Stack, Text } from "@fluentui/react";
import { Carousel } from "react-bootstrap";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CommentIcon from "@mui/icons-material/Comment";
import FlagIcon from "@mui/icons-material/Flag";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodayPriority.css";

const TodayPriority = ({ tPriority }) => {
  console.log("tPriority", tPriority);

  const priorityItems = tPriority?.listLandingDBMessage?.map((item) => ({
    title: item.typeDescription,
    description: item.content,
    color: "#007bff",
    backgroundColor: getBackgroundColor(item.typeDescription),
    IconComponent: getIconComponent(item.typeID)
  }));

  function getBackgroundColor(typeDescription) {
    switch (typeDescription) {
      case "New Risk Created":
        return "#f8d7da"; // Light red
      case "Approval Alert":
        return "#fff3cd"; // Light yellow
      case "New Initiative Is Created":
        return "#d4edda"; // Light green
      default:
        return "#f1f1f1"; // Light grey
    }
  }

  function getIconComponent(typeID) {
    switch (typeID) {
      case 3: // New Risk Created
        return NotificationsIcon;
      case 4: // Approval Alert
        return FlagIcon;
      case 5: // New Initiative Is Created
        return CommentIcon;
      default:
        return null; // Or return a default icon if needed
    }
  }

  return (
    <Stack tokens={{ childrenGap: 10 }}>
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
        <div style={{ width: "100%", height: "auto" }}>
          {priorityItems && (
            <>
              <Carousel
                indicators={false}
                controls={false}
                interval={2000}
                slide
                pause="hover"
                className="custom-carousel"
                style={{ marginBottom: "16px" }} // Space between Carousels
              >
                {priorityItems.map((item, index) => (
                  <Carousel.Item key={index}>
                    <Stack
                      horizontal
                      verticalAlign="center"
                      tokens={{ childrenGap: 10 }}
                      styles={{
                        root: {
                          backgroundColor: item.backgroundColor,
                          padding: "16px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          minWidth: "250px", // Adjust as needed
                          height: "120px" // Set height to 300px
                        }
                      }}
                    >
                      {item.IconComponent && (
                        <item.IconComponent style={{ color: "#ffc107", fontSize: 32 }} />
                      )}
                      <Stack>
                        <Text variant="medium" styles={{ root: { color: item.color } }}>
                          {item.title}
                        </Text>
                        <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
                          {item.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Carousel.Item>
                ))}
              </Carousel>

              <Carousel
                indicators={false}
                controls={false}
                interval={2500}
                slide
                pause="hover"
                className="custom-carousel"
                style={{ marginBottom: "16px" }} // Space between Carousels
              >
                {priorityItems.map((item, index) => (
                  <Carousel.Item key={index}>
                    <Stack
                      horizontal
                      verticalAlign="center"
                      tokens={{ childrenGap: 10 }}
                      styles={{
                        root: {
                          backgroundColor: item.backgroundColor,
                          padding: "16px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          minWidth: "250px", // Adjust as needed
                          height: "120px" // Set height to 300px
                        }
                      }}
                    >
                      {item.IconComponent && (
                        <item.IconComponent style={{ color: "#ffc107", fontSize: 32 }} />
                      )}
                      <Stack>
                        <Text variant="medium" styles={{ root: { color: item.color } }}>
                          {item.title}
                        </Text>
                        <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
                          {item.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Carousel.Item>
                ))}
              </Carousel>

              <Carousel
                indicators={false}
                controls={false}
                interval={3000}
                slide
                pause="hover"
                className="custom-carousel"
              >
                {priorityItems.map((item, index) => (
                  <Carousel.Item key={index}>
                    <Stack
                      horizontal
                      verticalAlign="center"
                      tokens={{ childrenGap: 10 }}
                      styles={{
                        root: {
                          backgroundColor: item.backgroundColor,
                          padding: "16px",
                          borderRadius: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          minWidth: "250px", // Adjust as needed
                          height: "120px" // Set height to 300px
                        }
                      }}
                    >
                      {item.IconComponent && (
                        <item.IconComponent style={{ color: "#ffc107", fontSize: 32 }} />
                      )}
                      <Stack>
                        <Text variant="medium" styles={{ root: { color: item.color } }}>
                          {item.title}
                        </Text>
                        <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
                          {item.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Carousel.Item>
                ))}
              </Carousel>
            </>
          )}
        </div>
      </Stack>
    </Stack>
  );
};

export default TodayPriority;
