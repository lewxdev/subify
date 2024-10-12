import { intlFormatDistance } from "date-fns";
import { Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { history } from "@/storage/history";

export function HistoryTab() {
  const queryHistory = history.useQuery();
  const removeHistory = history.useMutation("remove");

  return (
    <>
      {!queryHistory.data?.length && (
        <p className="text-center text-gray-500">That&apos;s all she wrote.</p>
      )}
      {queryHistory.data?.map((entry) => (
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
            onClick={() => navigator.clipboard.writeText(entry.value)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </>
  );
}
