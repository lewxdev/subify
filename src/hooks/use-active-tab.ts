import { useEffect } from "react";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/components/query-provider";

const activeTabQuery = queryOptions({
  queryKey: ["activeTab"],
  queryFn: async () => {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    return activeTab;
  },
});

export const useActiveTab = () => {
  useEffect(() => {
    const callback = () => queryClient.invalidateQueries(activeTabQuery);
    chrome.tabs.onUpdated.addListener(callback);
    return () => chrome.tabs.onUpdated.removeListener(callback);
  }, []);

  return useQuery(activeTabQuery);
};
