import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useInitiativeCardViewDelayed = (currentPage, currentFilter, filters) => {
  const [dashboardData3, setDashboardData3] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userdata = JSON.parse(sessionStorage.getItem("user"));
  const employeeId = userdata?.employeeId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("access_token");
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL_ACCESS_CONTROL1}/api/InitiativeCardView/GetInitiativeCardViewDelayed?alterType=W&employeeId=${employeeId}&PageNo=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch dashboard data");
        }

        setDashboardData3(response.data.data.listInitiativeCardDelayedEntity);
        console.log("dashboardData1222", response.data.data.listInitiativeCardDelayedEntity);
        toast.success("Dashboard data fetched successfully");
      } catch (error) {
        setError(error.message);
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, currentFilter, employeeId, filters]);

  return { dashboardData3, loading, error };
};

export default useInitiativeCardViewDelayed;
