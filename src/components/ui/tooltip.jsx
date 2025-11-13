import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../lib/utils";

const TooltipProvider = ({ delayDuration = 0, ...props }) => {
  return (
    <TooltipPrimitive.Provider
      data-slop="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
};

const Tooltip = ({ ...props }) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slop="tooltip" {...props} />
    </TooltipProvider>
  );
};

const TooltipTrigger = ({ ...props }) => {
  return <TooltipPrimitive.Trigger data-slop="tooltip-trigger" {...props} />;
};

const TooltipContent = ({ className, sideOffset = 0, children, ...props }) => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slop="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          `bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-ou-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance`,
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
