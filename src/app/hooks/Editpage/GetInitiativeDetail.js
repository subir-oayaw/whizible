import axios from "axios";

const GetInitiativeDetail = async (IdeaId, userID) => {
  console.log("GetInitiativeDetail", IdeaId, userID);
  const accessToken = sessionStorage.getItem("access_token");

  try {
    const response = await axios.get(
      `https://pms.whizible.com/INI_API_Main_Dev/api/InitiativeDetail/GET`,
      {
        params: { IdeaId, userID },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching initiative detail:", error);
    throw new Error("Failed to fetch initiative detail");
  }
};

export default GetInitiativeDetail;
