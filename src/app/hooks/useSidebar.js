import { useState, useEffect } from "react";
import axios from "axios";

const useSidebar = () => {
  const [SidebarData, setSidebarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userdata = JSON.parse(sessionStorage.getItem("user"));
  const employeeId = userdata?.employeeId;
  const accessToken = sessionStorage.getItem("access_token");

  useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) {
        setError("No access token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASEURL_ACCESS_CONTROL1}/api/Navigation/Get?employeeId=${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch sidebar data");
        }
        setSidebarData(response.data.data.leftMenu);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken, employeeId]); // Add accessToken and employeeId as dependencies

  return { SidebarData, loading, error };
};

export default useSidebar;
