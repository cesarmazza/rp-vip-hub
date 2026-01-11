import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Crown, Users, RefreshCw } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import VIPTable from "@/components/dashboard/VIPTable";
import PaymentsTable from "@/components/dashboard/PaymentsTable";
import PlayerCard from "@/components/dashboard/PlayerCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import PurchaseModal from "@/components/dashboard/PurchaseModal";
import { ApiError, getDashboardMetrics, getMe, hasAuthToken } from "@/lib/api";

const Dashboard = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const isAuthenticated = hasAuthToken();
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: getDashboardMetrics,
    enabled: isAuthenticated,
  });
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: isAuthenticated,
  });

  const metricsMessage = useMemo(() => {
    if (!isAuthenticated) {
      return "Faça login para visualizar as métricas do painel.";
    }
    if (metricsError instanceof ApiError) {
      return metricsError.status === 401
        ? "Sessão expirada. Faça login novamente."
        : metricsError.message;
    }
    return null;
  }, [isAuthenticated, metricsError]);

  const formatCurrency = (value: number | undefined) =>
    (value ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold font-display">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta{me?.user?.username ? `, ${me.user.username}` : ""}
        </p>
      </div>

      {metricsMessage && (
        <div className="glass-card p-4 text-sm text-muted-foreground">{metricsMessage}</div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <MetricCard
            title="Receita do Mês"
            value={metricsLoading ? "Carregando..." : formatCurrency(metrics?.receita_mes)}
            change="—"
            changeType="neutral"
            icon={DollarSign}
            iconColor="secondary"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <MetricCard
            title="VIPs Ativos"
            value={metricsLoading ? "Carregando..." : String(metrics?.vips_ativos ?? 0)}
            change="—"
            changeType="neutral"
            icon={Crown}
            iconColor="primary"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <MetricCard
            title="Jogadores Registrados"
            value={metricsLoading ? "Carregando..." : String(metrics?.total_jogadores ?? 0)}
            change="—"
            changeType="neutral"
            icon={Users}
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <MetricCard
            title="Renovações Hoje"
            value={metricsLoading ? "Carregando..." : String(metrics?.renovacoes_hoje ?? 0)}
            change="—"
            changeType="neutral"
            icon={RefreshCw}
            iconColor="secondary"
          />
        </div>
      </div>

      {/* Charts and Player Card Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <RevenueChart />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <PlayerCard onBuyClick={() => setIsPurchaseModalOpen(true)} />
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <VIPTable />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.45s" }}>
          <PaymentsTable />
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal 
        isOpen={isPurchaseModalOpen} 
        onClose={() => setIsPurchaseModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
