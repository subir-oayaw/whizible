import axios from "axios";

// Update the function to accept parameters dynamically
const GetInitiativeStageActionItems = async ({
  IdeaId = 61,
  employeeId = 61,
  pageNo = 1,
  initiativeTitle,
  submittedBy,
  stageID,
  statusID,
  assignedBy,
  actionItem,
  submittedOn,
  dueDate,
  priority
}) => {
  const accessToken = sessionStorage.getItem("access_token");

  try {
    const response = await axios.get(
      `https://pms.whizible.com/INI_API_Main_Dev/api/InitiativeList/GetInitiativeStageActionItems`,
      {
        params: {
          UserID: employeeId,
          PageNo: pageNo,
          InitiativeTitle: initiativeTitle || IdeaId, // Use IdeaId or default value
          SubmittedBy: submittedBy,
          StageID: stageID,
          StatusID: statusID,
          AssignedBy: assignedBy,
          ActionItem: actionItem,
          SubmittedOn: submittedOn,
          DueDate: dueDate,
          Priority: priority
        },
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    console.log("API response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching initiative detail:", error);
    throw new Error("Failed to fetch initiative detail");
  }
};

export default GetInitiativeStageActionItems;
