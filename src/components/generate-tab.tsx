import { Clipboard, Clock, Globe, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Select from "@/components/ui/select";
import * as ToggleGroup from "@/components/ui/toggle-group";
import { useEmailEntries } from "@/storage/email-entries";
import { useHistoryEntries } from "@/storage/history-entries";
import { usePresetDetails, type PresetName } from "@/storage/preset-details";

const presetIcons = [
  ["custom", PenLine],
  ["timestamp", Clock],
  ["domain", Globe],
] as const satisfies [name: PresetName, Icon: React.ComponentType][];

export function GenerateTab() {
  const { selectedEntry, entries, dispatchEntries } = useEmailEntries();
  const { selectedPreset, presets, dispatchPresets } = usePresetDetails();
  const { dispatchHistory } = useHistoryEntries();

  const detail = presets[selectedPreset];
  const subaddress =
    detail &&
    selectedEntry &&
    `${selectedEntry.user}${selectedEntry.separator}${detail}@${selectedEntry.domain}`;

  return (
    <>
      <div className="flex gap-x-2">
        <Select.Root
          value={selectedEntry?.id || ""}
          onValueChange={(id) => dispatchEntries("select", { id })}
        >
          <Select.Trigger className="w-0 flex-1" disabled={!entries.length}>
            <Select.Value>
              {entries.length
                ? `${subaddress} \u00a0`
                : "Add an email address in settings"}
            </Select.Value>
          </Select.Trigger>
          <Select.Content className="max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]">
            {entries.map(({ id, address }) => (
              <Select.Item key={id} value={id}>
                {address}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <Button
          size="icon"
          disabled={!subaddress}
          onClick={() => {
            if (!subaddress) return;
            navigator.clipboard.writeText(subaddress);
            dispatchHistory("insert", {
              url: presets.domain,
              value: subaddress,
            });
          }}
        >
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Input
          readOnly={selectedPreset !== "custom"}
          value={detail}
          onChange={({ target }) =>
            dispatchPresets("update", () => ({ custom: target.value }))
          }
          onFocus={({ target }) => target.select()}
        />
        <ToggleGroup.Root
          type="single"
          value={selectedPreset}
          onValueChange={(name: PresetName) => dispatchPresets("select", name)}
        >
          {presetIcons.map(([name, Icon]) => (
            <ToggleGroup.Item
              aria-label={`Use ${name} preset`}
              disabled={name === "domain" && !presets.domain}
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
