import { Check, Clock, Copy, Globe, PenLine } from "lucide-react";
import { useWriteClipboard } from "@/components/hooks/use-write-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Select from "@/components/ui/select";
import * as ToggleGroup from "@/components/ui/toggle-group";
import { emails } from "@/storage/emails";
import { history } from "@/storage/history";
import { presets, type PresetName } from "@/storage/presets";
import { getDomain } from "@/utils";

const presetIcons = [
  ["custom", PenLine],
  ["timestamp", Clock],
  ["domain", Globe],
] as const satisfies [name: PresetName, Icon: React.ComponentType][];

export function GenerateTab() {
  const writeClipboard = useWriteClipboard();
  const queryEmails = emails.useQuery();
  const queryPresets = presets.useQuery();
  const updateEmail = emails.useMutation("update");
  const updatePreset = presets.useMutation("update");
  const selectPreset = presets.useMutation("select");
  const insertHistory = history.useMutation("insert");

  const email = queryEmails.data?.find(({ isSelected }) => isSelected);
  const detail = queryPresets.data?.detail || "";
  const preset = queryPresets.data?.presetName || "domain";

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
            if (writeClipboard.isPending || writeClipboard.isSuccess) return;
            const url = (preset === "domain" && detail) || (await getDomain());
            const value = subaddress!; // disabled when subaddress is not present
            // todo: add feedback when history insertion fails
            insertHistory.mutateAsync({ url, value });
            writeClipboard.mutateAsync(value);
          }}
        >
          {writeClipboard.isSuccess ?
            <Check className="h-4 w-4" />
          : <Copy className="h-4 w-4" />}
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
          value={preset}
          onValueChange={(name: typeof preset) =>
            selectPreset.mutateAsync(name)
          }
        >
          {presetIcons.map(([name, Icon]) => (
            <ToggleGroup.Item
              aria-label={`Use ${name} preset`}
              disabled={name === "domain" && preset === "domain" && !detail}
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
