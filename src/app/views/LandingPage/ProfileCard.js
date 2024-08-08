import React from "react";
import { Stack, Text, Persona, PersonaSize } from "@fluentui/react";
import { Carousel } from "react-bootstrap";
import profImg1 from "../../../assets/img/profImg1.jpg";
import profImg2 from "../../../assets/Images/Loginframe.png";

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
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }
    }}
  >
    <Persona
      text="Mary McDonnell"
      secondaryText="Developer"
      size={PersonaSize.size72}
      imageUrl={profImg1}
      imageAlt="User"
      styles={{
        primaryText: { display: "none" },
        secondaryText: { display: "none" }
      }}
    />
    <Stack>
      <Text variant="large">Welcome, Mary McDonnell</Text>
      <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
        Have a Wonderful Day!
      </Text>
      <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
        You have pending notifications.
      </Text>
    </Stack>
    <Stack verticalAlign="end" styles={{ root: { flex: 1, textAlign: "right" } }}>
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
              src={profImg2} // Replace with your image path
              alt="Description"
              style={{ width: 50, height: 50, borderRadius: "50%" }} // Adjust styling as needed
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
              "Today One approval is Pending. Kindly review and approve."
            </Text>
          </Stack>
        </Carousel.Item>
        <Carousel.Item>
          <Stack horizontalAlign="center" verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Text variant="large" styles={{ root: { color: "green" } }}>
              New Initiative Created
            </Text>
            <Text variant="small" styles={{ root: { color: "#6c757d" } }}>
              "A new Initiative created. Let's get started!"
            </Text>
          </Stack>
        </Carousel.Item>
      </Carousel>
    </Stack>
  </Stack>
);

export default ProfileCard;
