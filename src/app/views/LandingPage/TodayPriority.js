import React from "react";
import { Stack, Text, Button } from "@fluentui/react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodayPriority.css"; // Add your custom styles here

const priorityItems = [
  {
    title: "Risk Managed [Initiative-1]",
    description: "Probability-5, Impact-3, Magnitude-4",
    buttonText: "Identify",
    color: "#dc3545",
    backgroundColor: "#f8d7da",
    buttonColor: "white"
  },
  {
    title: "Action Item [Initiative-2]",
    description: "Priority-High, Due date-29/07/2024",
    buttonText: "Initiated",
    color: "#ffc107",
    backgroundColor: "#fff3cd",
    buttonColor: "black"
  },
  {
    title: "Priority Checklist [Initiative-3]",
    description: "Priority Score-75%",
    buttonText: "Pending",
    color: "#ffc107",
    backgroundColor: "#fff3cd",
    buttonColor: "black"
  },
  {
    title: "New Risk Assessment [Initiative-4]",
    description: "Probability-3, Impact-2, Magnitude-5",
    buttonText: "Evaluate",
    color: "#28a745",
    backgroundColor: "#d4edda",
    buttonColor: "white"
  },
  {
    title: "High Priority Task [Initiative-5]",
    description: "Priority-Critical, Due date-10/08/2024",
    buttonText: "Complete",
    color: "#007bff",
    backgroundColor: "#cce5ff",
    buttonColor: "white"
  }
];

const TodayPriority = () => (
  <Stack tokens={{ childrenGap: 10 }}>
    <Stack
      styles={{
        root: {
          backgroundColor: "white",
          padding: "8px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          flex: 1
        }
      }}
    >
      <Text variant="medium" styles={{ root: { fontWeight: "bold", marginBottom: "16px" } }}>
        Today's Priority
      </Text>
      <div className="carousel-container" style={{ marginBottom: "20px" }}>
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
                    minWidth: "300px" // Adjust width if needed
                  }
                }}
              >
                <Text variant="medium" styles={{ root: { color: item.color } }}>
                  {item.title}
                </Text>
                <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
                  {item.description}
                </Text>
                <Button
                  styles={{
                    root: { backgroundColor: item.color, color: item.buttonColor }
                  }}
                >
                  {item.buttonText}
                </Button>
              </Stack>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="carousel-container" style={{ marginBottom: "20px" }}>
        <Carousel
          indicators={false}
          controls={false}
          interval={3500}
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
                    minWidth: "300px" // Adjust width if needed
                  }
                }}
              >
                <Text variant="medium" styles={{ root: { color: item.color } }}>
                  {item.title}
                </Text>
                <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
                  {item.description}
                </Text>
                <Button
                  styles={{
                    root: { backgroundColor: item.color, color: item.buttonColor }
                  }}
                >
                  {item.buttonText}
                </Button>
              </Stack>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className="carousel-container" style={{ marginBottom: "20px" }}>
        <Carousel
          indicators={false}
          controls={false}
          interval={4000}
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
                    minWidth: "300px" // Adjust width if needed
                  }
                }}
              >
                <Text variant="medium" styles={{ root: { color: item.color } }}>
                  {item.title}
                </Text>
                <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
                  {item.description}
                </Text>
                <Button
                  styles={{
                    root: { backgroundColor: item.color, color: item.buttonColor }
                  }}
                >
                  {item.buttonText}
                </Button>
              </Stack>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Stack>
  </Stack>
);

export default TodayPriority;
