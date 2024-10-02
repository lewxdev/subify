import { SettingsTab } from "@/components/settings-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { version } from "../package.json";

import "@/global.css";

const tabs = [
  { value: "Generate", content: "The generate tab" },
  { value: "History", content: "The history tab" },
  { value: "Settings", content: <SettingsTab /> },
] as const satisfies { value: string; content: React.ReactNode }[];

const [{ value: defaultValue }] = tabs;
const tabCount = tabs.length;

export default function Popup() {
  return (
    <Tabs defaultValue={defaultValue} className="w-[500px]">
      <TabsList
        className="grid w-full rounded-none"
        style={{ gridTemplateColumns: `repeat(${tabCount}, minmax(0, 1fr))` }}
      >
        {tabs.map(({ value }) => (
          <TabsTrigger key={value} value={value}>
            {value}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ value, content }) => (
        <TabsContent className="m-0 p-4" key={value} value={value}>
          {content}
        </TabsContent>
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
    </Tabs>
  );
}
