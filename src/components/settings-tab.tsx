import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import * as Form from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmailEntry, useEmailEntries } from "@/storage/email-entries";
import { cn } from "@/utils";

export function SettingsTab() {
  const data = useEmailEntries();
  return (
    <>
      <EmailEntryForm {...data} />
      {data.entries.map((entry) => (
        <EmailEntryForm {...data} entry={entry} key={entry.id} />
      ))}
    </>
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
    <Form.Root {...form}>
      <form
        className={cn(
          "flex gap-x-2",
          !entry && !!submitCount && !isSubmitSuccessful && "animate-shake",
        )}
        onSubmit={handleSubmit}
      >
        <Form.Field
          control={form.control}
          name="address"
          render={({ field }) => (
            <Form.Item className="flex-1">
              <Form.Control>
                <Input
                  autoComplete="email"
                  placeholder="Enter an email address"
                  {...field}
                />
              </Form.Control>
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="separator"
          render={({ field }) => (
            <Form.Item>
              <Form.Control>
                <Input maxLength={1} className="w-10 text-center" {...field} />
              </Form.Control>
            </Form.Item>
          )}
        />
        <Button className="w-16" variant={entry ? "destructive" : "default"}>
          {entry ? "Delete" : "Add"}
        </Button>
      </form>
    </Form.Root>
  );
}
