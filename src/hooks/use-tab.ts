import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTab(
  queryInfo: chrome.tabs.QueryInfo = { active: true, currentWindow: true },
) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["tab"],
    queryFn: async () => {
      const [tab] = await chrome.tabs.query(queryInfo);
      return tab;
    },
  });

  useEffect(() => {
    const callback = () => queryClient.invalidateQueries({ queryKey: ["tab"] });
    chrome.tabs.onUpdated.addListener(callback);
    return () => chrome.tabs.onUpdated.removeListener(callback);
  }, [queryClient]);

  return query;
}
