import * as AvatarPrimiry from "@radix-ui/react-avatar";
import { cn } from "./utils";

const Avatar = ({ className, ...props }) => {
  return (
    <AvatarPrimiry.Root
      data-slot="avatar"
      className={cn(
        `relative flex size-10 shrink-0 overflow-hidden rounded-full`,
        className,
      )}
      {...props}
    />
  );
};

const AvatarImage = ({ className, ...props }) => {
  return (
    <AvatarPrimiry.Image
      data-slot="avatar-image"
      className={cn(``, className)}
      {...props}
    />
  );
};

const AvatarFallback = ({ className, ...props }) => {
  return (
    <AvatarPrimiry.Fallback
      data-slot="avatar-fallback"
      className={cn(
        `bg-muted flex size-full items-center justify-center rounded-full`,
        className,
      )}
      {...props}
    />
  );
};

export { Avatar, AvatarImage, AvatarFallback };
