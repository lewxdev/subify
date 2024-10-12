import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import * as Form from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Email, emails } from "@/storage/emails";
import { cn } from "@/utils";

export function SettingsTab() {
  const queryEmails = emails.useQuery();

  return (
    <>
      <EmailForm />
      {queryEmails.data?.map((entry) => (
        <EmailForm entry={entry} key={entry.id} />
      ))}
    </>
  );
}

function EmailForm({ entry }: { entry?: z.infer<Email> }) {
  const insertEmail = emails.useMutation("insert");
  const updateEmail = emails.useMutation("update");
  const removeEmail = emails.useMutation("remove");

  const form = useForm({
    defaultValues: entry || { address: "", separator: "+" },
    resolver: zodResolver(Email),
  });
  const { isSubmitSuccessful, submitCount } = form.formState;
  const handleSubmit = form.handleSubmit((data, event) =>
    !entry ? insertEmail.mutateAsync(data)
    : event ? removeEmail.mutateAsync(data)
    : updateEmail.mutateAsync(data),
  );

  const [Icon, buttonVariant] = entry ? [X, "destructive" as const] : [Check];

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
        <Button size="icon" variant={buttonVariant}>
          <Icon className="h-4 w-4" />
        </Button>
      </form>
    </Form.Root>
  );
}
