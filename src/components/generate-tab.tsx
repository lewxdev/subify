import { Clipboard, Clock, Globe, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Select from "@/components/ui/select";
import * as ToggleGroup from "@/components/ui/toggle-group";
import { useTab } from "@/hooks/use-tab";
import { useEmails } from "@/storage/emails";
import { useHistory } from "@/storage/history";
import { Preset, usePresets } from "@/storage/presets";

const presetIcons = [
  [Preset.Custom, PenLine],
  [Preset.Timestamp, Clock],
  [Preset.Domain, Globe],
] as const satisfies [name: Preset, Icon: React.ComponentType][];

export function GenerateTab() {
  const [emailsQuery, emailsMutation] = useEmails();
  const [presetQuery, presetMutation] = usePresets();
  const [, historyMutation] = useHistory();

  const { data: tab } = useTab();
  const domain =
    tab?.url ? new URL(tab.url).hostname.replace(/^www\./, "") : "";

  const preset = presetQuery.data?.selected;
  const email = emailsQuery.data?.find(({ isSelected }) => isSelected);
  const detail =
    preset === Preset.Custom ? presetQuery.data?.custom || ""
    : preset === Preset.Domain ? domain
    : preset === Preset.Timestamp ? Date.now().toString()
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
          onValueChange={(id) => emailsMutation.mutate(["select", { id }])}
        >
          <Select.Trigger
            className="w-0 flex-1"
            disabled={!emailsQuery.data?.length}
          >
            <Select.Value placeholder="Add an email address in settings">
              {subaddress}
            </Select.Value>
          </Select.Trigger>
          <Select.Content className="max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]">
            {emailsQuery.data?.map(({ id, address }) => (
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
            historyMutation.mutate([
              "insert",
              { url: domain!, value: subaddress },
            ]);
          }}
        >
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-x-2">
        <Input
          readOnly={preset !== "custom"}
          value={detail}
          onChange={({ target }) =>
            presetMutation.mutate(["update", target.value])
          }
          onFocus={({ target }) => target.select()}
        />
        <ToggleGroup.Root
          type="single"
          value={preset || ""}
          onValueChange={(name: Preset) =>
            presetMutation.mutate(["select", name])
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
