import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "@/global.css";

const tabs = [
  ["Generate", "The generate tab"],
  ["History", "The history tab"],
  ["Settings", "The settings tab"],
] as const satisfies [value: string, content: React.ReactNode][];

const [[defaultValue]] = tabs;

export default function Popup() {
  return (
    <Tabs defaultValue={defaultValue} className="w-[500px]">
      <TabsList
        className="grid w-full"
        style={{
          gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
        }}
      >
        {tabs.map(([value]) => (
          <TabsTrigger key={value} value={value}>
            {value}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(([value, content]) => (
        <TabsContent key={value} value={value}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
