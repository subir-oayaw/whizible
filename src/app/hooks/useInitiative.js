import { useState, useEffect } from "react";
import axios from "axios";

const useInitiative = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://122.166.47.37:1001/api/Dashboard");
        if (response.status !== 200) {
          throw new Error("Failed to fetch dashboard data");
        }
        console.log("inboxForInitiative", response.data.data.inboxForInitiative);
        setDashboardData(response.data.data.inboxForInitiative);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { dashboardData, loading, error };
};

export default useInitiative;
