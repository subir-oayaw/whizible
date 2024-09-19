import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useInitiativeCardViewDraft = (currentCardPage1, currentFilter, filters) => {
  const [dashboardData1, setDashboardData1] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userdata = JSON.parse(sessionStorage.getItem("user"));
  const employeeId = userdata?.employeeId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("access_token");
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL_ACCESS_CONTROL1}/api/InitiativeCardView/GetInitiativeCardViewDraft?employeeId=${employeeId}&PageNo=${currentCardPage1}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch dashboard data");
        }
        console.log("dashboardData12", response.data.data);
        setDashboardData1(response.data.data.listInitiativeCardDraftEntity);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentCardPage1, currentFilter, employeeId, filters]);

  return { dashboardData1, loading, error };
};

export default useInitiativeCardViewDraft;
