import { TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDashboardMetrics, hasAuthToken } from "@/lib/api";

const RevenueChart = () => {
  const { data } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: getDashboardMetrics,
    enabled: hasAuthToken(),
  });
  const weeklyBase = (data?.receita_mes ?? 0) / 4;
  const chartData = [
    { day: "Seg", value: weeklyBase * 0.9 },
    { day: "Ter", value: weeklyBase * 1.05 },
    { day: "Qua", value: weeklyBase * 0.8 },
    { day: "Qui", value: weeklyBase * 1.1 },
    { day: "Sex", value: weeklyBase * 0.95 },
    { day: "Sáb", value: weeklyBase * 1.2 },
    { day: "Dom", value: weeklyBase * 1.05 },
  ];
  const maxValue = Math.max(1, ...chartData.map((point) => point.value));

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold font-display">Receita Semanal</h3>
          <p className="text-sm text-muted-foreground">Últimos 7 dias</p>
        </div>
        <div className="flex items-center gap-2 text-secondary">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">Atual</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 flex items-end justify-between gap-2">
        {chartData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full rounded-t-lg bg-gradient-to-t from-primary/50 to-primary transition-all duration-500 hover:from-primary/70 hover:to-primary relative group"
              style={{ 
                height: `${(data.value / maxValue) * 100}%`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-card px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border/50">
                {data.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xs text-muted-foreground">{data.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
