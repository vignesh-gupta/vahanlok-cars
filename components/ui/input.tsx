import * as React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Input
// A clean controlled input field that follows the vahanlok design system.
// Supports all native <input> props plus optional className overrides.
// ---------------------------------------------------------------------------

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // Layout & sizing
          "flex h-10 w-full rounded-md px-3 py-2",
          // Colors
          "bg-white text-[#1A1A1A]",
          // Border
          "border border-gray-300",
          // Placeholder
          "placeholder:text-gray-400",
          // Focus ring — brand red
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D72828] focus-visible:ring-offset-1 focus-visible:border-[#D72828]",
          // Typography
          "text-sm md:text-sm",
          // File input reset
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#1A1A1A]",
          // Disabled state
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
          // Transition
          "transition-colors duration-150",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
