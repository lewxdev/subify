// generated with `pnpm dlx shadcn@latest add scroll-area`
// see: https://ui.shadcn.com/docs/components/scroll-area
/* eslint-disable react/prop-types */

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@/utils";

export const Root = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    {children}
    <Scrollbar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
Root.displayName = ScrollAreaPrimitive.Root.displayName;

const Scrollbar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-200 dark:bg-gray-800" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
Scrollbar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export const Viewport = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ScrollAreaPrimitive.Viewport
    className={cn("h-full w-full rounded-[inherit]", className)}
    ref={ref}
    {...props}
  />
));
Viewport.displayName = ScrollAreaPrimitive.Viewport.displayName;
