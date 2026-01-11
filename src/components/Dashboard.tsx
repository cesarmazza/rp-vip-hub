import { Button } from "@/components/ui/button";
import { 
  Users, 
  Crown, 
  TrendingUp, 
  DollarSign,
  MoreVertical,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiError, getDashboardMetrics, getVips, hasAuthToken } from "@/lib/api";

const Dashboard = () => {
  const isAuthenticated = hasAuthToken();
  const { data: metrics, error: metricsError } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: getDashboardMetrics,
    enabled: isAuthenticated,
  });
  const { data: vipsData, error: vipsError } = useQuery({
    queryKey: ["vips"],
    queryFn: getVips,
    enabled: isAuthenticated,
  });
  const formatCurrency = (value: number | undefined) =>
    (value ?? 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const stats = useMemo(() => [
    { label: "Usuários VIP", value: String(metrics?.vips_ativos ?? 0), icon: Users, change: "—" },
    { label: "Receita Mensal", value: formatCurrency(metrics?.receita_mes), icon: DollarSign, change: "—" },
    { label: "Taxa de Conversão", value: "—", icon: TrendingUp, change: "—" },
    { label: "VIPs Ativos", value: String(metrics?.vips_ativos ?? 0), icon: Crown, change: "—" },
  ], [metrics]);
  const vipUsers = useMemo(() => {
    const entries = vipsData?.vips ?? [];
    return entries.slice(0, 5).map((vip) => ({
      id: vip.id,
      name: vip.username,
      discord: vip.discord_id,
      plan: vip.plan_name,
      status: vip.status,
      expires: new Date(vip.expires_at).toLocaleDateString("pt-BR"),
    }));
  }, [vipsData]);
  const errorMessage =
    metricsError instanceof ApiError || vipsError instanceof ApiError
      ? "Faça login para visualizar os dados completos."
      : null;

  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl mb-4">
            Painel <span className="gradient-text">Administrativo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Interface profissional para gerenciar todos os VIPs do seu servidor
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="glass-card p-4 md:p-8 neon-glow animate-fade-in">
          {errorMessage && (
            <div className="mb-6 text-sm text-muted-foreground">{errorMessage}</div>
          )}
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold font-display">Dashboard</h3>
              <p className="text-sm text-muted-foreground">Visão geral do sistema</p>
            </div>
            <div className="flex gap-2">
              <Button variant="glass" size="sm">Exportar</Button>
              <Button variant="neon" size="sm">+ Novo VIP</Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="dashboard-card">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-secondary font-medium">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold font-display">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* VIP Table */}
          <div className="dashboard-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <h4 className="font-semibold font-display">Lista de VIPs</h4>
              <Button variant="ghost" size="sm">Ver todos</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Usuário</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Discord</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Plano</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Expira</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {vipUsers.length === 0 && (
                    <tr>
                      <td className="p-4 text-muted-foreground" colSpan={6}>
                        Nenhum VIP encontrado.
                      </td>
                    </tr>
                  )}
                  {vipUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">{user.discord}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          user.plan === 'VIP Black' ? 'bg-primary/20 text-primary' :
                          user.plan === 'VIP Plus' ? 'bg-secondary/20 text-secondary' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={user.status === 'active' ? 'status-active' : 'status-expired'}>
                          {user.status === 'active' ? 'Ativo' : 'Expirado'}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground hidden lg:table-cell">{user.expires}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          {user.status === 'expired' ? (
                            <Button variant="neonGreen" size="sm" className="text-xs">
                              <CheckCircle className="w-3 h-3" />
                              Ativar
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive">
                              <XCircle className="w-3 h-3" />
                              Suspender
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" className="w-8 h-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
