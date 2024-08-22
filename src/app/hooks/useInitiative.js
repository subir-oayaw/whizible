import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useInitiative = (currentPage, currentFilter, filters) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userdata = JSON.parse(sessionStorage.getItem("user"));
  const employeeId = userdata?.employeeId;
  console.log("filters", filters);
  useEffect(() => {
    console.log("searchFilters9999", filters);
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("access_token");
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL_ACCESS_CONTROL1}/api/InitiativeList/Get?alterType=${currentFilter}&employeeId=${employeeId}&PageNo=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch dashboard data");
        }

        setDashboardData(response.data.data.initiativeList);
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
  }, [currentPage, currentFilter, employeeId, filters]); // Include currentPage and currentFilter in the dependency array

  return { dashboardData, loading, error };
};

export default useInitiative;
