
import { ItemStatus } from "@/types";
import { getStatusColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ItemStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusText = {
    pending: 'Pending',
    scrap: 'Scrap',
    sell: 'Sell'
  }[status];

  return (
    <div className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      getStatusColor(status),
      className
    )}>
      {statusText}
    </div>
  );
}
