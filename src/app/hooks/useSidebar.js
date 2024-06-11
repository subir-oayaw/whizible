import { useState, useEffect } from "react";
import axios from "axios";

const useSidebar = () => {
  const [SidebarData, setSidebarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://122.166.47.37:1001/api/Navigation");
        if (response.status !== 200) {
          throw new Error("Failed to fetch dashboard data");
        }
        setSidebarData(response.data.data.leftMenu);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { SidebarData, loading, error };
};

export default useSidebar;
