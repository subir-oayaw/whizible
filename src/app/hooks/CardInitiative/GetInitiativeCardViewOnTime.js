import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useInitiativeCardViewOnTime = (currentCardPage2, currentFilter, filters) => {
  const [dashboardData2, setDashboardData2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userdata = JSON.parse(sessionStorage.getItem("user"));
  const employeeId = userdata?.employeeId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("access_token");
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL_ACCESS_CONTROL1}/api/InitiativeCardView/GetInitiativeCardViewOnTime?alterType=T&employeeId=${employeeId}&PageNo=${currentCardPage2}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch dashboard data");
        }

        setDashboardData2(response.data.data.listInitiativeCardOnTimeEntity);
        console.log("dashboardData12", response.data.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentCardPage2, currentFilter, employeeId, filters]);

  return { dashboardData2, loading, error };
};

export default useInitiativeCardViewOnTime;
