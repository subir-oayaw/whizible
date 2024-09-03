import axios from "axios";

const GetInitiativeTimeline = async (IdeaId, UserId) => {
  const userdata = JSON.parse(sessionStorage.getItem("user"));
  const employeeId = userdata?.employeeId;
  const accessToken = sessionStorage.getItem("access_token");
  try {
    const response = await axios.get(
      `https://pms.whizible.com/INI_API_Main_Dev/api/InitiativeDetail/GetInitiativeTimeline`,
      {
        params: { IdeaId, UserId },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching initiative timeline:", error);
    throw new Error("Failed to fetch initiative timeline");
  }
};

export default GetInitiativeTimeline;
