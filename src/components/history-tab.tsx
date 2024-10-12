import { useState } from "react";
import { intlFormatDistance } from "date-fns";
import { Check, Copy, X } from "lucide-react";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { history, type History } from "@/storage/history";

export function HistoryTab() {
  const lastCopy = useState<string>();
  const queryHistory = history.useQuery();

  return (
    <>
      {!queryHistory.data?.length && (
        <p className="text-center text-gray-500">That&apos;s all she wrote.</p>
      )}
      {queryHistory.data?.map((entry) => (
        <HistoryEntry key={entry.id} entry={entry} lastCopy={lastCopy} />
      ))}
    </>
  );
}

function HistoryEntry({
  entry,
  lastCopy: [lastCopy, setLastCopy],
}: {
  entry: z.infer<History>;
  lastCopy: [
    string | undefined,
    React.Dispatch<React.SetStateAction<string | undefined>>,
  ];
}) {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const removeHistory = history.useMutation("remove");
  const isDisabled = timeoutId && lastCopy === entry.value;

  return (
    <div key={entry.value} className="flex items-center gap-2">
      <p className="flex-1 truncate pr-2 text-sm" title={entry.value}>
        {entry.value}
        <br />
        <span className="select-none text-xs text-gray-500">
          {entry.url && `${entry.url} • `}
          {intlFormatDistance(entry.createdAt, Date.now(), {
            style: "narrow",
            locale: navigator.language,
          })}
        </span>
      </p>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => removeHistory.mutateAsync(entry)}
      >
        <X className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        onClick={async () => {
          if (isDisabled) return;
          if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(undefined);
          }
          await navigator.clipboard.writeText(entry.value);
          setLastCopy(entry.value);
          const callback = () => {
            setTimeoutId(undefined);
            setLastCopy(undefined);
          };
          setTimeoutId(setTimeout(callback, 2000));
        }}
      >
        {isDisabled ?
          <Check className="h-4 w-4" />
        : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  );
}
