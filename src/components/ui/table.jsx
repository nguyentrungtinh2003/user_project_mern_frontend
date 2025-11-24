import { cn } from "../../lib/utils";

const Table = ({ className, ...props }) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
};
const TableHeader = ({ className, ...props }) => {
  return (
    <thead
      data-slot="table-header"
      className={cn(`[&_tr]:border-b`, className)}
      {...props}
    />
  );
};
const TableBody = ({ className, ...props }) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn(`[&_tr:last-child]:border-0`, className)}
      {...props}
    />
  );
};
const TableFooter = ({ }) => { };
const TableRow = ({ className, ...props }) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        `hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors`,
        className,
      )}
      {...props}
    />
  );
};
const TableHead = ({ className, ...props }) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        `text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:translate-y-[2px] [&:has([role=checkbox])]:pr-0`,
        className,
      )}
      {...props}
    />
  );
};
const TableCell = ({ className, ...props }) => {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        `p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:translate-y-[2px] [&:has([role=checkbox])]:pr-0`,
        className,
      )}
      {...props}
    />
  );
};
const TableCaption = ({ }) => { };

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
