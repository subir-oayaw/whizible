import React from "react";
import { Stack, Text, Persona, PersonaSize } from "@fluentui/react";
import { Carousel } from "react-bootstrap";
import { FaPlus, FaBirthdayCake, FaExclamationCircle } from "react-icons/fa";
import profImg1 from "../../../assets/img/profImg1.jpg";
import profImg2 from "../../../assets/Images/Loginframe.png";

// Function to map typeID to icon and bannerColor
const getIconAndColor = (typeID) => {
  switch (typeID) {
    case 3:
    case 5:
      return { icon: <FaPlus />, bannerColor: "#fff3cd" };
    case 4:
      return { icon: <FaExclamationCircle />, bannerColor: "#f8d7da" };
    case 1:
    case 2:
      return { icon: <FaPlus />, bannerColor: "#d4edda" };
    default:
      return { icon: <FaPlus />, bannerColor: "#e2e3e5" };
  }
};

const ProfileCard = ({ usermessage }) => {
  const storedImage = sessionStorage.getItem("UserProfilePic");
  const carouselItems = usermessage?.listLandingDBMessage?.map((message) => {
    const { icon, bannerColor } = getIconAndColor(message.typeID);
    return {
      title: message.typeDescription,
      text: message.content,
      icon,
      bannerColor
    };
  });

  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log("user", user);

  return (
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
          flexDirection: "row",
          "@media (max-width: 768px)": {
            flexDirection: "column",
            textAlign: "center"
          }
        }
      }}
    >
      <Persona
        text={user.employeeName}
        secondaryText={user.department}
        size={PersonaSize.size72}
        imageUrl={storedImage}
        imageAlt="User"
        styles={{
          primaryText: { display: "none" },
          secondaryText: { display: "none" },
          root: {
            "@media (max-width: 768px)": {
              alignSelf: "center"
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
              textAlign: "center",
              marginTop: "16px"
            }
          }
        }}
      >
        <Carousel indicators={false} controls={false} interval={3000}>
          {carouselItems?.map((item, index) => (
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
                  styles={{
                    root: {
                      color: "black",
                      marginTop: "8px",
                      textAlign: "center"
                    }
                  }}
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
};

export default ProfileCard;
