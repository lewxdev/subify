// generated with `pnpm dlx shadcn@latest add form`
// see: https://ui.shadcn.com/docs/components/form
/* eslint-disable react/prop-types */

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import * as LabelStyled from "@/components/ui/label";
import { cn } from "@/utils";

export const Root = FormProvider;

type FieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

export const Field = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FieldContext.Provider>
  );
};

export const useField = () => {
  const fieldContext = React.useContext(FieldContext);
  const itemContext = React.useContext(ItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useField should be used within <FormField>");
  }

  if (!itemContext) {
    throw new Error("useField should be used within <ItemContext>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type ItemContextValue = {
  id: string;
};

const ItemContext = React.createContext<ItemContextValue | null>(null);

export const Item = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <ItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </ItemContext.Provider>
  );
});
Item.displayName = "FormItem";

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useField();

  return (
    <LabelStyled.Root
      ref={ref}
      className={cn(error && "text-red-500 dark:text-red-900", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
Label.displayName = "FormLabel";

export const Control = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error ?
          `${formDescriptionId}`
        : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
Control.displayName = "FormControl";

export const Description = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
      {...props}
    />
  );
});
Description.displayName = "FormDescription";

export const Message = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useField();
  const body = error ? String(error?.message) : children;

  return !body ? null : (
      <p
        ref={ref}
        id={formMessageId}
        className={cn(
          "text-sm font-medium text-red-500 dark:text-red-900",
          className,
        )}
        {...props}
      >
        {body}
      </p>
    );
});
Message.displayName = "FormMessage";
