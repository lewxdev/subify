import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmailEntry, useEmailEntries } from "@/hooks/use-email-entries";
import { cn } from "@/utils";

export function SettingsTab() {
  const [entries, dispatch] = useEmailEntries();
  return (
    <div className="space-y-2">
      <EmailEntryForm dispatch={dispatch} />
      {entries.map((entry) => (
        <EmailEntryForm dispatch={dispatch} entry={entry} key={entry.id} />
      ))}
    </div>
  );
}

type EmailEntryFormProps = {
  dispatch: ReturnType<typeof useEmailEntries>[1];
  entry?: EmailEntry;
};

function EmailEntryForm({ dispatch, entry }: EmailEntryFormProps) {
  const form = useForm({
    defaultValues: entry || { address: "", separator: "+" },
    resolver: zodResolver(EmailEntry),
  });
  const { isSubmitSuccessful, submitCount } = form.formState;
  const handleSubmit = form.handleSubmit((data, event) =>
    dispatch(!entry ? "insert" : event ? "remove" : "update", data),
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
          "flex items-center space-x-2",
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
        {entry ? (
          <Button size="icon" variant="destructive">
            <X className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </form>
    </Form>
  );
}
