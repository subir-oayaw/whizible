import axios from "axios";

const InitiativeCardViewDelayed = async (currentCardPage3, isListView) => {
  const accessToken = sessionStorage.getItem("access_token");
  const userdata = JSON.parse(sessionStorage.getItem("user"));
  const employeeId = userdata?.employeeId;

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASEURL_ACCESS_CONTROL1}/api/InitiativeCardView/GetInitiativeCardViewDelayed?alterType=W&employeeId=${employeeId}&PageNo=${currentCardPage3}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    console.log("dashboard88", response.data.data);
    return response.data.data.listInitiativeCardDelayedEntity;
  } catch (error) {
    console.error("Error fetching initiative cost list:", error);
    throw new Error("Failed to fetch initiative cost list");
  }
};

export default InitiativeCardViewDelayed;