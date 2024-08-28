import { useState, useEffect } from "react";
import axios from "axios";

const CompletedIni = (searchParams) => {
  const [completedIni, setCompletedIni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("access_token");
        const url = `${process.env.REACT_APP_BASEURL_ACCESS_CONTROL1}/api/ConvertedIni/Get`;

        const response = await axios.get(url, {
          params: {
            ...searchParams,
            PageNo: 1
          },
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.status !== 200) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        console.log("Graph Data:", response.data);
        setCompletedIni(response.data.data);
      } catch (error) {
        setError(error.message || "An unexpected error occurred");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]); // Depend on searchParams

  return { completedIni, loading, error };
};

export default CompletedIni;
