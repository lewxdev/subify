import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";

export const useWriteClipboard = () => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const writeClipboard = useMutation({
    mutationFn: (data: string) => navigator.clipboard.writeText(data),
    onSettled: () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(writeClipboard.reset, 2000);
    },
  });
  return writeClipboard;
};
