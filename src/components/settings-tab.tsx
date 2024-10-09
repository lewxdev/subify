import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Form from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Email, useEmails } from "@/hooks/use-emails";
import { cn } from "@/utils";

export function SettingsTab() {
  const [emailsQuery] = useEmails();
  return (
    <>
      <EmailForm />
      {emailsQuery.data?.map((email) => (
        <EmailForm email={email} key={email.id} />
      ))}
    </>
  );
}

function EmailForm({ email }: { email?: Email }) {
  const [, emailsMutation] = useEmails();

  const form = useForm({
    defaultValues: email || { address: "", separator: "+" },
    resolver: zodResolver(Email),
  });
  const { isSubmitSuccessful, submitCount } = form.formState;
  const handleSubmit = form.handleSubmit((data, event) =>
    emailsMutation.mutateAsync([
      !email ? "insert"
      : event ? "remove"
      : "update",
      data,
    ]),
  );

  useEffect(() => {
    if (!email) return;
    return form.watch(() => handleSubmit()).unsubscribe;
  }, [email, form, handleSubmit]);

  useEffect(() => {
    if (email || !isSubmitSuccessful) return;
    form.reset();
  }, [email, form, isSubmitSuccessful]);

  const [Icon, buttonVariant] = email ? [X, "destructive" as const] : [Check];
  return (
    <Form.Root {...form}>
      <form
        className={cn(
          "flex gap-x-2",
          !email && !!submitCount && !isSubmitSuccessful && "animate-shake",
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
