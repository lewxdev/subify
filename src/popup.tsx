import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GenerateTab } from "@/components/generate-tab";
import { HistoryTab } from "@/components/history-tab";
import { SettingsTab } from "@/components/settings-tab";
import * as ScrollArea from "@/components/ui/scroll-area";
import * as Tabs from "@/components/ui/tabs";
import { version } from "../package.json";

import "@/global.css";

const tabs = [
  ["Generate", GenerateTab],
  ["History", HistoryTab],
  ["Settings", SettingsTab],
] as const satisfies [name: string, Content: React.ComponentType][];

const queryClient = new QueryClient();

export default function Popup() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs.Root defaultValue="Generate" className="w-[500px]">
        <Tabs.List className="grid w-full auto-cols-fr grid-flow-col rounded-none">
          {tabs.map(([name]) => (
            <Tabs.Trigger key={name} value={name}>
              {name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabs.map(([name, Content]) => (
          <Tabs.Content className="m-0" key={name} value={name}>
            <ScrollArea.Root>
              <ScrollArea.Viewport className="max-h-96">
                <div className="grid gap-2 p-3">
                  <Content />
                </div>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </Tabs.Content>
        ))}
        <footer className="flex bg-gray-100 p-4 dark:bg-gray-800">
          v{version} &bull;&nbsp;
          <a
            className="text-blue-500 dark:text-blue-400"
            href="https://github.com/lewxdev/subify"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </footer>
      </Tabs.Root>
    </QueryClientProvider>
  );
}
