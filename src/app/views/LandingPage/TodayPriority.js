import React from "react";
import { Stack, Text, Button } from "@fluentui/react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodayPriority.css"; // Add your custom styles here

const TodayPriority = (tPriority) => {
  console.log("tPriority", tPriority);

  const priorityItems = tPriority?.tPriority?.listLandingDBMessage?.map((item) => ({
    title: item.typeDescription,
    description: item.content,
    buttonText: "Action", // Placeholder, you can adjust based on your needs
    color: "#007bff", // Default color, can be adjusted
    backgroundColor: "#cce5ff", // Default background color, can be adjusted
    buttonColor: "white" // Default button text color
  }));
  console.log("listLandingDBMessage", tPriority);
  return (
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
            {priorityItems?.map((item, index) => (
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
                      minWidth: "150px" // Adjust width if needed
                    }
                  }}
                >
                  <Text variant="medium" styles={{ root: { color: item.color } }}>
                    {item.title}
                  </Text>
                  <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
                    {item.description}
                  </Text>
                  {/* <Button
                    styles={{
                      root: { backgroundColor: item.color, color: item.buttonColor }
                    }}
                  >
                    {item.buttonText}
                  </Button> */}
                </Stack>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="carousel-container" style={{ marginBottom: "20px" }}>
          <Carousel
            indicators={false}
            controls={false}
            interval={3000}
            slide
            pause="hover"
            className="custom-carousel"
          >
            {priorityItems?.map((item, index) => (
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
                      minWidth: "150px" // Adjust width if needed
                    }
                  }}
                >
                  <Text variant="medium" styles={{ root: { color: item.color } }}>
                    {item.title}
                  </Text>
                  <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
                    {item.description}
                  </Text>
                  {/* <Button
                    styles={{
                      root: { backgroundColor: item.color, color: item.buttonColor }
                    }}
                  >
                    {item.buttonText}
                  </Button> */}
                </Stack>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <div className="carousel-container" style={{ marginBottom: "20px" }}>
          <Carousel
            indicators={false}
            controls={false}
            interval={3000}
            slide
            pause="hover"
            className="custom-carousel"
          >
            {priorityItems?.map((item, index) => (
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
                      minWidth: "150px" // Adjust width if needed
                    }
                  }}
                >
                  <Text variant="medium" styles={{ root: { color: item.color } }}>
                    {item.title}
                  </Text>
                  <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
                    {item.description}
                  </Text>
                  {/* <Button
                    styles={{
                      root: { backgroundColor: item.color, color: item.buttonColor }
                    }}
                  >
                    {item.buttonText}
                  </Button> */}
                </Stack>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </Stack>
    </Stack>
  );
};

export default TodayPriority;
