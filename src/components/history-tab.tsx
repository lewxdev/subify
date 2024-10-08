import { intlFormatDistance } from "date-fns";
import { Clipboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHistoryEntries } from "@/storage/history-entries";

export function HistoryTab() {
  const { history, dispatchHistory } = useHistoryEntries();
  return (
    <>
      {!history.length && (
        <p className="text-center text-gray-500">That&apos;s all she wrote.</p>
      )}
      {history.map((entry) => (
        <div key={entry.value} className="flex items-center gap-2">
          <p className="flex-1 truncate pr-2 text-sm" title={entry.value}>
            {entry.value}
            <br />
            <span className="text-xs text-gray-500">
              {entry.url} &bull;{" "}
              {intlFormatDistance(entry.createdAt, Date.now(), {
                style: "narrow",
                locale: navigator.language,
              })}
            </span>
          </p>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => dispatchHistory("remove", entry)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => navigator.clipboard.writeText(entry.value)}
          >
            <Clipboard className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </>
  );
}
