import axios from "axios";

const GetInitiativeDocumentList = async (IdeaId, UserId) => {
  const accessToken = sessionStorage.getItem("access_token");
  const userdata = JSON.parse(sessionStorage.getItem("user"));
  const employeeId = userdata?.employeeId;

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASEURL_ACCESS_CONTROL1}/api/InitiativeDetail/GetInitiativeDocumentList`,
      {
        params: { IdeaId, UserId },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching initiative document list:", error);
    throw new Error("Failed to fetch initiative document list");
  }
};

export default GetInitiativeDocumentList;
