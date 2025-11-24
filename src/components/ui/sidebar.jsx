import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useIsMobile } from "./use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";
import { Slot } from "@radix-ui/react-slot";
import { Button } from "./button";
import { PanelLeftIcon } from "lucide-react";
import { Separator } from "./separator";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = createContext(null);

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
};

const SidebarProvider = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component
  const [_open, _setOpen] = useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? "expanded" : "collapsed";

  const contextValue = useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={{
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            ...style,
          }}
          className={cn(
            `group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full`,
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
};

const Sidebar = ({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          `bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col`,
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
          style={{
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          }}
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex size-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          `relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear group-data-[collapsible=offcanvas]:w-0 group-data-[side=right]:rotate-180`,
          variant === "floating" || variant === "inset"
            ? `group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]`
            : `group-data-[collapsible=icon]:w-(--sidebar-width-icon)`,
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          `fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex`,
          side === "left"
            ? `left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]`
            : `right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]`,
          //Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? `p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]`
            : `group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l`,
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={`bg-sidebar group-data-[variant=floating]:border-sidebar-border flex size-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};


const SidebarTrigger = ({ className, ref, onClick, ...props }) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = ({ }) => { };

const SidebarInset = ({ className, ...props }) => {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        `bg-background relative flex w-full flex-1 flex-col md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2`,
        className,
      )}
      {...props}
    />
  );
};

const SidebarInput = ({ }) => { };

const SidebarHeader = ({ className, ...props }) => {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
};

const SidebarFooter = ({ className, ...props }) => {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
};

const SidebarSeparator = ({ className, ...props }) => {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-side="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
};

const SidebarContent = ({ className, ...props }) => {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
};

const SidebarGroup = ({ className, ...props }) => {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(`relative flex w-full min-w-0 flex-col p-2`, className)}
      {...props}
    />
  );
};

const SidebarGroupLabel = ({ }) => { };

SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = ({ }) => { };

SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = ({ className, ...props }) => {
  return (
    <div
      data-slot="sidebar-group-content"
      data-siderbar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
};

const SidebarMenu = ({ className, ...props }) => {
  return (
    <ul
      data-slot="sidebar-nemu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  );
};

const SidebarMenuItem = ({ className, ...props }) => {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  );
};

const sidebarMenuButtonVariants = cva(
  `peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden
    ring-sidebar-ring transition-[width,height,padding] 
    hover:bg-sidebar-accent
    hover:text-sidebar-accent-foreground
    focus-visible:ring-2
    active:bg-sidebar-accent
    active:text-sidebar-accent-foreground
    disabled:pointer-events-none
    disabled:opacity-50
    group-has-data-[sidebar=menu-action]/menu-item:pr-8
    aria-disabled:pointer-events-none
    aria-disabled:opacity-50
    data-[active=true]:bg-sidebar-accent
    data-[active=true]:font-medium
    data-[active=true]:text-sidebar-accent-foreground
    data-[state=open]:hover:bg-sidebar-accent
    data-[state=open]:hover:text-sidebar-accent-foreground
    group-data-[collapsible=icon]:size-8!
    group-data-[collapsible=icon]:p-2!
    [&>span:last-child]:truncate
    [&>svg]:size-4
    [&>svg]:shrink-0
    `,
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: `bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] 
            hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
            hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]`,
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = ({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  ref,
  className,
  ...props
}) => {
  const Comp = asChild ? Slot : "button";

  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      ref={ref}
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
};

SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = ({ }) => { };

SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = ({ }) => { };

const SidebarMenuSkeleton = ({ }) => { };

const SidebarMenuSub = ({ }) => { };

const SidebarMenuSubItem = ({ }) => { };

const SidebarMenuSubButton = ({ }) => { };

SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,

  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  useSidebar,
};
