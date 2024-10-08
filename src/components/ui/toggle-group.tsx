// generated with `pnpm dlx shadcn@latest add toggle-group`
// see: https://ui.shadcn.com/docs/components/toggle-group

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/utils";

const Context = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

export const Root = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <Context.Provider value={{ variant, size }}>{children}</Context.Provider>
  </ToggleGroupPrimitive.Root>
));
Root.displayName = ToggleGroupPrimitive.Root.displayName;

export const Item = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(Context);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});
Item.displayName = ToggleGroupPrimitive.Item.displayName;
