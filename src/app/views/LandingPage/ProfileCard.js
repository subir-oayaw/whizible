import React from "react";
import { Stack, Text, Persona, PersonaSize } from "@fluentui/react";
import { Carousel } from "react-bootstrap";
import profImg1 from "../../../assets/img/profImg1.jpg";
import profImg2 from "../../../assets/Images/Loginframe.png";
import { FaPlus, FaBirthdayCake, FaExclamationCircle } from "react-icons/fa";

// Sample data for carousel items
const carouselItems = [
  {
    title: "New Initiative Created",
    text: "A new Initiative created. Let's get started!",
    icon: <FaPlus />, // Use react-icons component
    bannerColor: "#fff3cd"
  },
  {
    title: "Birthday",
    text: "It's Madhuri's Birthday!",
    icon: <FaBirthdayCake />, // Use react-icons component
    bannerColor: "#d4edda"
  },
  {
    title: "Approval Alert",
    text: "Today one approval is pending. Kindly review and approve.",
    icon: <FaExclamationCircle />, // Use react-icons component
    bannerColor: "#f8d7da"
  },
  {
    title: "New Initiative Created",
    text: "A new initiative created. Let's get started!",
    icon: <FaPlus />, // Use react-icons component
    bannerColor: "#d4edda"
  }
];

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
        {carouselItems.map((item, index) => (
          <Carousel.Item key={index}>
            <Stack
              verticalAlign="center"
              tokens={{ childrenGap: 10 }}
              styles={{
                root: {
                  backgroundColor: item.bannerColor,
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }
              }}
            >
              <Stack
                horizontal
                verticalAlign="center"
                horizontalAlign="center"
                tokens={{ childrenGap: 10 }}
              >
                {item.icon}
                <Text variant="large" styles={{ root: { color: "black" } }}>
                  {item.title}
                </Text>
              </Stack>
              <Text
                variant="small"
                styles={{ root: { color: "black", marginTop: "8px", textAlign: "center" } }}
              >
                {item.text}
              </Text>
            </Stack>
          </Carousel.Item>
        ))}
      </Carousel>
    </Stack>
  </Stack>
);

export default ProfileCard;
