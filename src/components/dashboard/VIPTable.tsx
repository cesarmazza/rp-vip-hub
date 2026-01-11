import { Button } from "@/components/ui/button";
import { MoreVertical, RefreshCw, XCircle, Crown, Zap, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ApiError, getVips, hasAuthToken } from "@/lib/api";

const getVIPIcon = (type: string) => {
  switch (type) {
    case "VIP Black": return <Crown className="w-4 h-4" />;
    case "VIP Plus": return <Zap className="w-4 h-4" />;
    default: return <Star className="w-4 h-4" />;
  }
};

const getVIPStyle = (type: string) => {
  switch (type) {
    case "VIP Black": return "bg-primary/20 text-primary border-primary/30";
    case "VIP Plus": return "bg-secondary/20 text-secondary border-secondary/30";
    default: return "bg-muted text-muted-foreground border-border/30";
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "active": return "status-active";
    case "expired": return "status-expired";
    case "suspended": return "bg-destructive/20 text-destructive border border-destructive/30 px-3 py-1 rounded-full text-xs font-medium";
    default: return "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-medium";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "active": return "Ativo";
    case "expired": return "Expirado";
    case "suspended": return "Suspenso";
    default: return "Pendente";
  }
};

const VIPTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vips"],
    queryFn: getVips,
    enabled: hasAuthToken(),
  });
  const vipData = data?.vips ?? [];
  const errorMessage =
    error instanceof ApiError
      ? error.status === 401
        ? "Faça login para visualizar os VIPs."
        : error.message
      : null;
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("pt-BR");

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold font-display">VIPs Recentes</h3>
          <p className="text-sm text-muted-foreground">Últimas atualizações de VIP</p>
        </div>
        <Button variant="glass" size="sm">
          Ver todos
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30 bg-muted/30">
              <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Jogador</th>
              <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tipo VIP</th>
              <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Expira</th>
              <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Valor</th>
              <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="p-4 text-muted-foreground" colSpan={6}>
                  Carregando VIPs...
                </td>
              </tr>
            )}
            {errorMessage && (
              <tr>
                <td className="p-4 text-destructive" colSpan={6}>
                  {errorMessage}
                </td>
              </tr>
            )}
            {!isLoading && !errorMessage && vipData.length === 0 && (
              <tr>
                <td className="p-4 text-muted-foreground" colSpan={6}>
                  Nenhum VIP encontrado.
                </td>
              </tr>
            )}
            {vipData.map((vip, index) => (
              <tr 
                key={vip.id} 
                className="border-b border-border/20 hover:bg-muted/20 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                      <span className="text-sm font-bold text-primary font-display">
                        {vip.username.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{vip.username}</div>
                      <div className="text-xs text-muted-foreground">{vip.discord_id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getVIPStyle(vip.plan_name)}`}>
                    {getVIPIcon(vip.plan_name)}
                    {vip.plan_name}
                  </span>
                </td>
                <td className="p-4">
                  <span className={getStatusStyle(vip.status)}>
                    {getStatusLabel(vip.status)}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground hidden lg:table-cell">{formatDate(vip.expires_at)}</td>
                <td className="p-4 font-medium text-secondary hidden md:table-cell">{formatCurrency(vip.plan_price)}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-primary hover:text-primary hover:bg-primary/10">
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Renovar</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10">
                      <XCircle className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Suspender</span>
                    </Button>
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
  );
};

export default VIPTable;
