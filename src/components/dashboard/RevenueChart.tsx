import { TrendingUp } from "lucide-react";

const chartData = [
  { day: "Seg", value: 65 },
  { day: "Ter", value: 80 },
  { day: "Qua", value: 45 },
  { day: "Qui", value: 90 },
  { day: "Sex", value: 75 },
  { day: "Sáb", value: 100 },
  { day: "Dom", value: 85 },
];

const maxValue = Math.max(...chartData.map(d => d.value));

const RevenueChart = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold font-display">Receita Semanal</h3>
          <p className="text-sm text-muted-foreground">Últimos 7 dias</p>
        </div>
        <div className="flex items-center gap-2 text-secondary">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+23%</span>
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
                R$ {(data.value * 45.9).toFixed(0)}
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
