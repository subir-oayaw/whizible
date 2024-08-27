// hooks/useCardViewData.js
import { useState, useEffect } from "react";
import GetInitiativeCardViewDraft from "./GetInitiativeCardViewDraft";

import GetInitiativeCardViewDelayed from "./GetInitiativeCardViewDelayed";

import GetInitiativeCardViewOnTime from "./GetInitiativeCardViewOnTime";

const useCardViewData = (currentPage, filters) => {
  const [draftData, setDraftData] = useState([]);
  const [delayedData, setDelayedData] = useState([]);
  const [onTimeData, setOnTimeData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCardViewData = async () => {
      setLoading(true);
      try {
        const draft = await GetInitiativeCardViewDraft(currentPage, filters);
        const delayed = await GetInitiativeCardViewDelayed(currentPage, filters);
        const onTime = await GetInitiativeCardViewOnTime(currentPage, filters);

        setDraftData(draft);
        setDelayedData(delayed);
        setOnTimeData(onTime);
      } catch (error) {
        console.error("Failed to fetch card view data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardViewData();
  }, [currentPage, filters]);

  return { draftData, delayedData, onTimeData, loading };
};

export default useCardViewData;
