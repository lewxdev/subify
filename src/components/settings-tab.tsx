import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmailEntry, useEmailEntries } from "@/storage/email-entries";
import { cn } from "@/utils";

SettingsTab.displayName = "Settings";

export function SettingsTab(props: React.ComponentPropsWithoutRef<"div">) {
  const data = useEmailEntries();
  return (
    <div {...props}>
      <EmailEntryForm {...data} />
      {data.entries.map((entry) => (
        <EmailEntryForm {...data} entry={entry} key={entry.id} />
      ))}
    </div>
  );
}

type EmailEntryFormProps = ReturnType<typeof useEmailEntries> & {
  entry?: EmailEntry;
};

function EmailEntryForm({ dispatchEntries, entry }: EmailEntryFormProps) {
  const form = useForm({
    defaultValues: entry || { address: "", separator: "+" },
    resolver: zodResolver(EmailEntry),
  });
  const { isSubmitSuccessful, submitCount } = form.formState;
  const handleSubmit = form.handleSubmit((data, event) =>
    dispatchEntries(!entry ? "insert" : event ? "remove" : "update", data),
  );

  useEffect(() => {
    if (!entry) return;
    return form.watch(() => handleSubmit()).unsubscribe;
  }, [entry, form, handleSubmit]);

  useEffect(() => {
    if (entry || !isSubmitSuccessful) return;
    form.reset();
  }, [entry, form, isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex gap-x-2",
          !entry && !!submitCount && !isSubmitSuccessful && "animate-shake",
        )}
        onSubmit={handleSubmit}
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  autoComplete="email"
                  placeholder="Enter an email address"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="separator"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input maxLength={1} className="w-10 text-center" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-16" variant={entry ? "destructive" : "default"}>
          {entry ? "Delete" : "Add"}
        </Button>
      </form>
    </Form>
  );
}
