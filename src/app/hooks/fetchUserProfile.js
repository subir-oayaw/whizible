import axios from "axios";

const fetchUserProfile = async (accessToken) => {
  try {
    const userProfileResponse = await axios.get(
      `${process.env.REACT_APP_BASEURL_ACCESS_CONTROL1}/api/UserProfile/Get`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const userProfileData = userProfileResponse.data.data;

    if (userProfileData && userProfileData.employeeId) {
      await fetchProfileImage(accessToken, userProfileData.employeeId);
    }

    return userProfileData;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile data");
  }
};

const fetchProfileImage = async (accessToken, employeeId) => {
  try {
    const profileImageResponse = await axios.get(
      `https://pms.whizible.com/INI_API_Main_Dev/api/FileUpDown/GetProfileImage?logID=${employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "*/*"
        }
      }
    );
    sessionStorage.setItem("UserProfilePic", profileImageResponse.data);

    console.log("Profile image fetched successfully:", profileImageResponse.data);
  } catch (error) {
    console.error("Error fetching profile image:", error);
    throw new Error("Failed to fetch profile image");
  }
};

export default fetchUserProfile;
