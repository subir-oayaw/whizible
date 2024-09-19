import axios from "axios";

// Update the function to accept dynamic parameters
const WatchListConfiguration = async ({
  PageNo,
  InitiativeTitle,
  StatusID,
  NatureofInitiativeId,
  BusinessGroupId,
  OrganizationUnitId,
  InitiativeCode,
  CurrentStageID,
  CurrentStageApprover
}) => {
  console.log("WatchListConfiguration", {
    PageNo,
    InitiativeTitle,
    StatusID,
    NatureofInitiativeId,
    BusinessGroupId,
    OrganizationUnitId,
    InitiativeCode,
    CurrentStageID,
    CurrentStageApprover
  });

  const accessToken = sessionStorage.getItem("access_token");

  try {
    const response = await axios.get(
      `https://pms.whizible.com/INI_API_Main_Dev/api/InitiativeList/WatchListConfiguration`,
      {
        params: {
          PageNo,
          InitiativeTitle,
          StatusID,
          NatureofInitiativeId,
          BusinessGroupId,
          OrganizationUnitId,
          InitiativeCode,
          CurrentStageID,
          CurrentStageApprover
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching watch list configuration:", error);
    throw new Error("Failed to fetch watch list configuration");
  }
};

export default WatchListConfiguration;
