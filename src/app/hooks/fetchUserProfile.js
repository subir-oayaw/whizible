// fetchUserProfile.js

import axios from "axios";

const fetchUserProfile = async (accessToken) => {
  try {
    const userProfileResponse = await axios.get(
      process.env.REACT_APP_BASEURL_ACCESS_CONTROL1 + "/api/UserProfile/Get",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    return userProfileResponse.data.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("Failed to fetch user profile data");
  }
};

export default fetchUserProfile;
