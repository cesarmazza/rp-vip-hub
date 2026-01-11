import { Button } from "@/components/ui/button";
import { Crown, Calendar, RefreshCw, ShoppingCart, Clock, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ApiError, getMe, getPayments, hasAuthToken } from "@/lib/api";

interface PlayerCardProps {
  onBuyClick: () => void;
}

const PlayerCard = ({ onBuyClick }: PlayerCardProps) => {
  const isAuthenticated = hasAuthToken();
  const { data: me, error: meError } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: isAuthenticated,
  });
  const { data: paymentsData } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
    enabled: isAuthenticated,
  });
  const user = me?.user;
  const recentPayments =
    paymentsData?.payments
      .filter((payment) => payment.user_id === user?.id)
      .slice(0, 3) ?? [];
  const errorMessage =
    meError instanceof ApiError
      ? meError.status === 401
        ? "Faça login para ver seus dados."
        : meError.message
      : null;
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("pt-BR");

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border-2 border-primary/30 neon-glow">
            <span className="text-2xl font-bold text-primary font-display">
              {user?.username?.charAt(0) ?? "?"}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold font-display">{user?.username ?? "Visitante"}</h3>
            <p className="text-sm text-muted-foreground">{user?.discord_id ?? "—"}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

        {/* Current VIP */}
        <div className="glass-card p-4 neon-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              <span className="font-semibold font-display">{user?.vip_ativo ?? "Sem VIP ativo"}</span>
            </div>
            <span className={user?.vip_ativo ? "status-active" : "status-expired"}>
              {user?.vip_ativo ? "Ativo" : "Inativo"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <span>
              Expira em: {user?.expires_at ? formatDate(user.expires_at) : "—"}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="neon" size="sm" className="flex-1 gap-2">
              <RefreshCw className="w-4 h-4" />
              Renovar VIP
            </Button>
            <Button variant="glass" size="sm" className="gap-2" onClick={onBuyClick}>
              <ShoppingCart className="w-4 h-4" />
              Upgrade
            </Button>
          </div>
        </div>

        {/* Purchase History */}
        <div>
          <h4 className="font-semibold font-display mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Histórico de Compras
          </h4>
          <div className="space-y-2">
            {recentPayments.length === 0 && (
              <div className="text-sm text-muted-foreground">Nenhuma compra encontrada.</div>
            )}
            {recentPayments.map((purchase) => (
              <div 
                key={purchase.id} 
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <div>
                    <div className="font-medium text-sm">{purchase.plan_name}</div>
                    <div className="text-xs text-muted-foreground">{formatDate(purchase.created_at)}</div>
                  </div>
                </div>
                <span className="font-semibold text-secondary">{formatCurrency(purchase.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
