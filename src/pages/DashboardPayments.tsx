import { Button } from "@/components/ui/button";
import { Download, Filter, QrCode, CheckCircle, Clock, XCircle, TrendingUp, DollarSign, CreditCard } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ApiError, getPayments, hasAuthToken } from "@/lib/api";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed": return <CheckCircle className="w-4 h-4" />;
    case "pending": return <Clock className="w-4 h-4" />;
    default: return <XCircle className="w-4 h-4" />;
  }
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "completed": return "bg-secondary/20 text-secondary border-secondary/30";
    case "pending": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    default: return "bg-destructive/20 text-destructive border-destructive/30";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "completed": return "Pago";
    case "pending": return "Pendente";
    default: return "Falhou";
  }
};

const DashboardPayments = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
    enabled: hasAuthToken(),
  });
  const paymentsData = data?.payments ?? [];
  const errorMessage =
    error instanceof ApiError
      ? error.status === 401
        ? "Faça login para visualizar pagamentos."
        : error.message
      : null;
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const normalizeStatus = (status: string) => {
    if (status === "paid") {
      return "completed";
    }
    if (status === "pending") {
      return "pending";
    }
    return "failed";
  };
  const metrics = useMemo(() => {
    const paidPayments = paymentsData.filter((payment) => payment.status === "paid");
    const totalPaid = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const successRate = paymentsData.length
      ? (paidPayments.length / paymentsData.length) * 100
      : 0;

    return {
      totalPaid,
      totalCount: paymentsData.length,
      successRate,
    };
  }, [paymentsData]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Pagamentos</h1>
          <p className="text-muted-foreground">Histórico de todas as transações</p>
        </div>
        <div className="flex gap-2">
          <Button variant="glass" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
          <Button variant="neon" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <MetricCard
          title="Receita Total (Janeiro)"
          value={isLoading ? "Carregando..." : formatCurrency(metrics.totalPaid)}
          change="—"
          changeType="neutral"
          icon={DollarSign}
          iconColor="secondary"
        />
        <MetricCard
          title="Transações"
          value={isLoading ? "Carregando..." : String(metrics.totalCount)}
          change="—"
          changeType="neutral"
          icon={CreditCard}
          iconColor="primary"
        />
        <MetricCard
          title="Taxa de Sucesso"
          value={isLoading ? "Carregando..." : `${metrics.successRate.toFixed(1)}%`}
          change="—"
          changeType="neutral"
          icon={TrendingUp}
        />
      </div>

      {/* Payments Table */}
      <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="p-6 border-b border-border/50">
          <h3 className="text-lg font-bold font-display">Histórico de Transações</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30 bg-muted/30">
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Transação</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Jogador</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plano</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Valor</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td className="p-4 text-muted-foreground" colSpan={6}>
                    Carregando pagamentos...
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
              {!isLoading && !errorMessage && paymentsData.length === 0 && (
                <tr>
                  <td className="p-4 text-muted-foreground" colSpan={6}>
                    Nenhum pagamento encontrado.
                  </td>
                </tr>
              )}
              {paymentsData.map((payment, index) => {
                const status = normalizeStatus(payment.status);
                return (
                  <tr 
                    key={payment.id} 
                    className="border-b border-border/20 hover:bg-muted/20 transition-colors animate-fade-in"
                    style={{ animationDelay: `${0.1 + index * 0.03}s` }}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <QrCode className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium font-mono text-sm">#PIX-{String(payment.id).padStart(4, "0")}</div>
                          <div className="text-xs text-muted-foreground">{payment.method}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{payment.username}</div>
                    </td>
                    <td className="p-4">
                      <span className="text-primary font-medium">{payment.plan_name}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-secondary">{formatCurrency(payment.amount)}</span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusStyle(status)}`}>
                        {getStatusIcon(status)}
                        {getStatusLabel(status)}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {new Date(payment.created_at).toLocaleString("pt-BR")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPayments;
