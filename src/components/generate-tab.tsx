import { Clipboard, Clock, Globe, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEmailEntries } from "@/storage/email-entries";
import { usePresets, type PresetName } from "@/storage/preset-details";

const presetIcons = [
  ["custom", PenLine],
  ["timestamp", Clock],
  ["domain", Globe],
] as const satisfies [name: PresetName, Icon: React.ComponentType][];

GenerateTab.displayName = "Generate";

export function GenerateTab(props: React.ComponentPropsWithoutRef<"div">) {
  const { selectedEntry, entries, dispatchEntries } = useEmailEntries();
  const { selectedPreset, presets, dispatchPresets } = usePresets();
  const detail = presets[selectedPreset];

  const subaddress =
    detail &&
    selectedEntry &&
    `${selectedEntry.user}${selectedEntry.separator}${detail}@${selectedEntry.domain}`;

  return (
    <div {...props}>
      <div className="flex gap-x-2">
        <Select
          value={selectedEntry?.id || ""}
          onValueChange={(id) => dispatchEntries("select", { id })}
        >
          <SelectTrigger disabled={!entries.length}>
            <SelectValue placeholder="Add an email address in settings">
              {entries.length ? subaddress : "Add an email address in settings"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {entries.map(({ id, address }) => (
              <SelectItem key={id} value={id}>
                {address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          size="icon"
          disabled={!subaddress}
          onClick={() => navigator.clipboard.writeText(subaddress!)}
        >
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Input
          readOnly={selectedPreset !== "custom"}
          value={detail}
          onChange={({ target }) =>
            dispatchPresets("update", { custom: target.value })
          }
          onFocus={({ target }) => target.select()}
        />
        <ToggleGroup
          type="single"
          value={selectedPreset}
          onValueChange={(name: PresetName) => dispatchPresets("select", name)}
        >
          {presetIcons.map(([name, Icon]) => (
            <ToggleGroupItem
              aria-label={`Use ${name} preset`}
              disabled={name === "domain" && !presets.domain}
              key={name}
              value={name}
            >
              <Icon className="h-4 w-4" />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
