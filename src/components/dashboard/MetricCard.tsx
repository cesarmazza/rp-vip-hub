import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: "primary" | "secondary" | "destructive";
}

const MetricCard = ({ title, value, change, changeType, icon: Icon, iconColor = "primary" }: MetricCardProps) => {
  return (
    <div className="glass-card-hover p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
          iconColor === "primary" && "bg-primary/10 group-hover:bg-primary/20",
          iconColor === "secondary" && "bg-secondary/10 group-hover:bg-secondary/20",
          iconColor === "destructive" && "bg-destructive/10 group-hover:bg-destructive/20"
        )}>
          <Icon className={cn(
            "w-6 h-6",
            iconColor === "primary" && "text-primary",
            iconColor === "secondary" && "text-secondary",
            iconColor === "destructive" && "text-destructive"
          )} />
        </div>
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          changeType === "positive" && "bg-secondary/20 text-secondary",
          changeType === "negative" && "bg-destructive/20 text-destructive",
          changeType === "neutral" && "bg-muted text-muted-foreground"
        )}>
          {change}
        </span>
      </div>
      <div className="space-y-1">
        <h3 className="text-3xl font-bold font-display">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;
