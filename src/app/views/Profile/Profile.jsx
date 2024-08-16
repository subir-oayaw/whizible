import * as React from "react";
import { Stack, Text, DefaultButton, Persona, PersonaSize, Separator } from "@fluentui/react";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const profileContainerStyles = mergeStyles({
  maxWidth: 600,
  padding: 20,
  margin: "auto",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  borderRadius: 10,
  backgroundColor: "#f3f2f1",
  border: "1px solid #e1dfdd",
  position: "relative" // Enables absolute positioning for children
});

const profilePictureContainerStyles = mergeStyles({
  position: "relative", // Enables absolute positioning within this container
  display: "inline-block"
});

const editIconStyles = mergeStyles({
  position: "absolute",
  bottom: 0,
  right: 0,
  backgroundColor: "#ffffff",
  borderRadius: "50%",
  cursor: "pointer",
  padding: 5,
  fontSize: 24,
  color: "#000000", // Black color for the pencil icon
  zIndex: 10 // Ensures the icon is on top of the Persona
});

const buttonGroupStyles = mergeStyles({
  display: "flex",
  justifyContent: "flex-end",
  gap: 10
});

const ProfilePage = () => {
  const userdata = JSON.parse(sessionStorage.getItem("user"));

  const [profileData, setProfileData] = React.useState(userdata);
  const {
    employeeName,
    roleName,
    emailId,
    location,
    department,
    address,
    employeeType,
    birthDate,
    currentAddress,
    currentCity,
    currentCountry,
    phone,
    pinCode
  } = profileData;
  const [image, setImage] = React.useState(null);

  const handleDelete = () => {
    // Handle delete logic
  };

  const handleInputChange = (e, field) => {
    setProfileData({ ...profileData, [field]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const renderField = (label, value) => (
    <Text>
      <strong>{label}:</strong> {value || "N/A"}
    </Text>
  );

  return (
    <div className={profileContainerStyles}>
      <Stack tokens={{ childrenGap: 20 }}>
        <div className={profilePictureContainerStyles}>
          <Persona
            size={PersonaSize.size72}
            text={employeeName || "N/A"}
            secondaryText={roleName || "N/A"}
            imageUrl={image}
          />
          <EditOutlinedIcon
            className={editIconStyles}
            onClick={() => document.getElementById("uploadImage").click()}
          />
          <input
            type="file"
            id="uploadImage"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <Separator />
        <Stack tokens={{ childrenGap: 12 }}>
          {renderField("User Name", employeeName)}
          {renderField("Birth Date", birthDate)}
          {renderField("Email ID", emailId)}
          {renderField("Current Address", currentAddress)}
          {renderField("Address", address)}
          {renderField("City", currentCity)}
          {renderField("State", currentCountry)}
          {renderField("Zip Code", pinCode)}
          {renderField("Phone", phone)}
        </Stack>

        <div className={buttonGroupStyles}>
          <DefaultButton
            text="Delete Profile"
            onClick={handleDelete}
            styles={{ root: { color: "#d13438", borderColor: "#d13438" } }}
          />
        </div>
      </Stack>
    </div>
  );
};

export default ProfilePage;
