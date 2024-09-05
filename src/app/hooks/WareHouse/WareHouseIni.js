import { useState, useEffect } from "react";
import axios from "axios";

const WareHouseIni = (searchParams) => {
  const [wareHouseIni, setWareHouseIni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = sessionStorage.getItem("access_token");
        const url = `${process.env.REACT_APP_BASEURL_ACCESS_CONTROL1}/api/WareHouseIni/Get`;

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
        setWareHouseIni(response.data.data);
      } catch (error) {
        setError(error.message || "An unexpected error occurred");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]); // Depend on searchParams

  return { wareHouseIni, loading, error };
};

export default WareHouseIni;
