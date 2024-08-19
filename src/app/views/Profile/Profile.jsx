import * as React from "react";
import { Stack, Text, DefaultButton, Separator, Image, ImageFit } from "@fluentui/react";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { uploadImage } from "../../hooks/userProfile/useProfileImage";
import fetchUserProfile from "../../hooks/fetchUserProfile";

const profileContainerStyles = mergeStyles({
  maxWidth: 1200,
  padding: 20,
  margin: "auto",
  borderRadius: 10,
  position: "relative"
});

const profilePictureContainerStyles = mergeStyles({
  position: "relative",
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
  color: "#000000",
  zIndex: 10
});

const buttonGroupStyles = mergeStyles({
  position: "absolute",
  top: 20,
  right: 20,
  zIndex: 10
});

const profilePictureStyles = mergeStyles({
  borderRadius: "50%",
  width: 72,
  height: 72,
  objectFit: "cover",
  border: "2px solid #e1dfdd"
});

const fieldContainerStyles = mergeStyles({
  display: "flex",
  alignItems: "flex-start",
  gap: 20
});

const fieldGroupStyles = mergeStyles({
  flexBasis: "48%"
});

const verticalBarStyles = mergeStyles({
  width: 1,
  backgroundColor: "#e1dfdd",
  height: "auto",
  alignSelf: "stretch"
});

const ProfilePage = () => {
  const [profileData, setProfileData] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const fetchProfileData = async () => {
    try {
      const accessToken = sessionStorage.getItem("access_token");

      const user = await fetchUserProfile(accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));
      setProfileData(user);
      setImage(user.profileImage || null); // Assuming `profileImage` is the key in the fetched data
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  React.useEffect(() => {
    fetchProfileData();
  }, []);

  const handleDelete = () => {
    // Handle delete logic
  };

  const handleInputChange = (e, field) => {
    setProfileData({ ...profileData, [field]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const result = await uploadImage(formData);
        console.log("Image uploaded successfully:", result);
        setImage(result.imageUrl || URL.createObjectURL(file));

        // Update profile data after image upload
        await fetchProfileData();
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }
  };

  const renderField = (label, value, showValue = true, marginTop = 0) => (
    <Text block style={{ marginTop }}>
      <strong>{label}:</strong> {showValue && value ? value : "N/A"}
    </Text>
  );

  if (!profileData) return <div>Loading...</div>;

  const {
    employeeName,
    roleName,
    emailId,
    address,
    phone,
    birthDate,
    currentCity,
    currentCountry,
    pinCode,
    businessGroupId
  } = profileData;

  return (
    <div className={profileContainerStyles}>
      <DefaultButton
        text="Delete Profile"
        onClick={handleDelete}
        styles={{ root: { color: "#d13438", borderColor: "#d13438" } }}
        className={buttonGroupStyles}
      />
      <Stack tokens={{ childrenGap: 20 }}>
        <Stack horizontal tokens={{ childrenGap: 20 }}>
          <div className={profilePictureContainerStyles}>
            <Image
              src={image || "https://via.placeholder.com/72"}
              alt={employeeName || "Profile Picture"}
              className={profilePictureStyles}
              imageFit={ImageFit.cover}
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
          <Stack>
            <Text variant="xLarge">{employeeName || "N/A"}</Text>
            <Text variant="mediumPlus" style={{ color: "#605e5c" }}>
              {roleName || "N/A"}
            </Text>
          </Stack>
        </Stack>
        <Separator />
        <div className={fieldContainerStyles}>
          <div className={fieldGroupStyles}>
            {renderField("User Name", employeeName)}
            {renderField("Birth Date", birthDate)}
            {renderField("Email ID", emailId)}
            {renderField("Address", address)}
            {renderField("Phone", phone)}
            {renderField("Current Address", true, "5px")}
            {renderField("City", currentCity)}
            {renderField("State", currentCountry)}
            {renderField("Zip Code", pinCode)}
          </div>
          <div className={verticalBarStyles}></div>
          <div className={fieldGroupStyles}>
            {renderField("Role Name", roleName)}
            {renderField("Business Group Id", businessGroupId)}
            {renderField("Organiztion Unit", currentCountry)}
            {renderField("Delivery Unit", pinCode)}
            {renderField("Permanent Address", true, "5px")}
            {renderField("Phone", phone)}
            {renderField("City", currentCity)}
            {renderField("State", currentCountry)}
            {renderField("Zip Code", pinCode)}
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default ProfilePage;
