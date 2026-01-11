import { QrCode, CheckCircle, Clock, XCircle } from "lucide-react";
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

const PaymentsTable = () => {
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
  const formatDate = (value: string) =>
    new Date(value).toLocaleString("pt-BR");
  const normalizeStatus = (status: string) => {
    if (status === "paid") {
      return "completed";
    }
    if (status === "pending") {
      return "pending";
    }
    return "failed";
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-bold font-display">Pagamentos Recentes</h3>
        <p className="text-sm text-muted-foreground">Últimas transações PIX</p>
      </div>
      
      <div className="divide-y divide-border/20">
        {isLoading && (
          <div className="p-4 text-muted-foreground">Carregando pagamentos...</div>
        )}
        {errorMessage && (
          <div className="p-4 text-destructive">{errorMessage}</div>
        )}
        {!isLoading && !errorMessage && paymentsData.length === 0 && (
          <div className="p-4 text-muted-foreground">Nenhum pagamento encontrado.</div>
        )}
        {paymentsData.map((payment, index) => {
          const status = normalizeStatus(payment.status);
          return (
          <div 
            key={payment.id} 
            className="p-4 hover:bg-muted/20 transition-colors flex items-center justify-between animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <QrCode className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-medium">{payment.username}</div>
                <div className="text-xs text-muted-foreground">{formatDate(payment.created_at)}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-bold text-secondary">{formatCurrency(payment.amount)}</div>
                <div className="text-xs text-muted-foreground">{payment.method}</div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusStyle(status)}`}>
                {getStatusIcon(status)}
                {getStatusLabel(status)}
              </span>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentsTable;
