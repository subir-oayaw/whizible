import React from "react";
import { Stack, Text, Persona, PersonaSize } from "@fluentui/react";
import { Carousel } from "react-bootstrap";
import profImg1 from "../../../assets/img/profImg1.jpg";
import profImg2 from "../../../assets/Images/Loginframe.png";
import { use } from "echarts";

const user = JSON.parse(sessionStorage.getItem("user"));
console.log("user", user);
const ProfileCard = () => (
  <Stack
    horizontal
    verticalAlign="center"
    tokens={{ childrenGap: 20 }}
    styles={{
      root: {
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        flexDirection: "row", // Default horizontal layout
        "@media (max-width: 768px)": {
          flexDirection: "column", // Switch to vertical layout on smaller screens
          textAlign: "center" // Center-align text on smaller screens
        }
      }
    }}
  >
    <Persona
      text={user.employeeName}
      secondaryText={user.department}
      size={PersonaSize.size72}
      imageUrl={profImg1}
      imageAlt="User"
      styles={{
        primaryText: { display: "none" },
        secondaryText: { display: "none" },
        root: {
          "@media (max-width: 768px)": {
            alignSelf: "center" // Center the persona image on smaller screens
          }
        }
      }}
    />
    <Stack styles={{ root: { flex: 1 } }}>
      <Text variant="large">Welcome {user.employeeName},</Text>
      <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
        Have a Wonderful Day!
      </Text>
      <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
        You have pending notifications.
      </Text>
    </Stack>
    <Stack
      verticalAlign="end"
      styles={{
        root: {
          flex: 1,
          textAlign: "right",
          "@media (max-width: 768px)": {
            textAlign: "center", // Center the carousel on smaller screens
            marginTop: "16px" // Add space between text and carousel on smaller screens
          }
        }
      }}
    >
      <Carousel indicators={false} controls={false} interval={3000}>
        <Carousel.Item>
          <Stack horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Text variant="large">New Initiative Created</Text>
            <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
              "A new Initiative created. Let's get started!"
            </Text>
          </Stack>
        </Carousel.Item>
        <Carousel.Item>
          <Stack horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <img
              src={profImg2}
              alt="Description"
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            <Text variant="large" styles={{ root: { color: "#0078d4" } }}>
              Birthday
            </Text>
            <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
              "It's Madhuri's Birthday!"
            </Text>
          </Stack>
        </Carousel.Item>
        <Carousel.Item>
          <Stack horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Text variant="large" styles={{ root: { color: "red" } }}>
              Approval Alert
            </Text>
            <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
              "Today one approval is pending. Kindly review and approve."
            </Text>
          </Stack>
        </Carousel.Item>
        <Carousel.Item>
          <Stack horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Text variant="large" styles={{ root: { color: "green" } }}>
              New Initiative Created
            </Text>
            <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
              "A new initiative created. Let's get started!"
            </Text>
          </Stack>
        </Carousel.Item>
      </Carousel>
    </Stack>
  </Stack>
);

export default ProfileCard;
