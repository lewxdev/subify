import { GenerateTab } from "@/components/generate-tab";
import { SettingsTab } from "@/components/settings-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { version } from "../package.json";

import "@/global.css";

const tabs = [
  GenerateTab,
  SettingsTab,
] as const satisfies React.ComponentType[];

export default function Popup() {
  return (
    <Tabs defaultValue={GenerateTab.displayName} className="w-[500px]">
      <TabsList className="grid w-full auto-cols-fr grid-flow-col rounded-none">
        {tabs.map((Content) => (
          <TabsTrigger key={Content.displayName} value={Content.displayName}>
            {Content.displayName}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((Content) => {
        const { displayName } = Content;
        return (
          <TabsContent className="m-0" key={displayName} value={displayName}>
            <Content className="space-y-2 p-4" />
          </TabsContent>
        );
      })}
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
    </Tabs>
  );
}
