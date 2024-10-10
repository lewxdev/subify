import { useMutation, useQuery } from "@tanstack/react-query";
import { Clipboard, Clock, Globe, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Select from "@/components/ui/select";
import * as ToggleGroup from "@/components/ui/toggle-group";
import { useTab } from "@/hooks/use-tab";
import * as storage from "@/storage";

const presetIcons = [
  ["custom", PenLine],
  ["timestamp", Clock],
  ["domain", Globe],
] as const satisfies [name: storage.PresetName, Icon: React.ComponentType][];

export function GenerateTab() {
  const queryEmails = useQuery(storage.emails.queryOptions());
  const queryPresets = useQuery(storage.presets.queryOptions());
  const updateEmail = useMutation(storage.emails.update);
  const updatePreset = useMutation(storage.presets.update);
  const selectPreset = useMutation(storage.presets.select);
  const insertHistory = useMutation(storage.history.insert);

  const { data: tab } = useTab();
  const domain =
    tab?.url ? new URL(tab.url).hostname.replace(/^www\./, "") : "";

  const preset = queryPresets.data?.name;
  const email = queryEmails.data?.find(({ isSelected }) => isSelected);
  const detail =
    preset === "custom" ? queryPresets.data?.custom || ""
    : preset === "domain" ? domain
    : preset === "timestamp" ? Date.now().toString()
    : "";
  const subaddress =
    detail && email ?
      `${email.user}${email.separator}${detail}@${email.domain}`
    : email?.address;

  return (
    <>
      <div className="flex gap-x-2">
        <Select.Root
          value={email?.id || ""}
          onValueChange={(id) =>
            updateEmail.mutateAsync({ id, isSelected: true })
          }
        >
          <Select.Trigger
            className="w-0 flex-1"
            disabled={!queryEmails.data?.length}
          >
            <Select.Value placeholder="Add an email address in settings">
              {subaddress}
            </Select.Value>
          </Select.Trigger>
          <Select.Content className="max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]">
            {queryEmails.data?.map(({ id, address }) => (
              <Select.Item key={id} value={id}>
                {address}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Button
          size="icon"
          disabled={!subaddress}
          onClick={async () => {
            if (!subaddress) return;
            navigator.clipboard.writeText(subaddress);
            insertHistory.mutateAsync({ url: domain!, value: subaddress });
          }}
        >
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Input
          readOnly={preset !== "custom"}
          value={detail}
          onChange={({ target }) => updatePreset.mutateAsync(target.value)}
          onFocus={({ target }) => target.select()}
        />
        <ToggleGroup.Root
          type="single"
          value={preset || ""}
          onValueChange={(name: storage.PresetName) =>
            selectPreset.mutateAsync(name)
          }
        >
          {presetIcons.map(([name, Icon]) => (
            <ToggleGroup.Item
              aria-label={`Use ${name} preset`}
              disabled={name === "domain" && !domain}
              key={name}
              value={name}
            >
              <Icon className="h-4 w-4" />
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
    </>
  );
}
