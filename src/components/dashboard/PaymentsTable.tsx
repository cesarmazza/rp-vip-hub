import { QrCode, CheckCircle, Clock, XCircle } from "lucide-react";

const paymentsData = [
  { id: 1, player: "Carlos_RP", amount: "R$ 79,90", method: "PIX", status: "completed", date: "11/01/2025 14:32" },
  { id: 2, player: "Maria_City", amount: "R$ 39,90", method: "PIX", status: "completed", date: "11/01/2025 12:15" },
  { id: 3, player: "Pedro_Gang", amount: "R$ 19,90", method: "PIX", status: "pending", date: "11/01/2025 11:45" },
  { id: 4, player: "Ana_Police", amount: "R$ 79,90", method: "PIX", status: "completed", date: "10/01/2025 18:20" },
  { id: 5, player: "Lucas_Mafia", amount: "R$ 39,90", method: "PIX", status: "failed", date: "10/01/2025 16:55" },
];

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
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h3 className="text-lg font-bold font-display">Pagamentos Recentes</h3>
        <p className="text-sm text-muted-foreground">Últimas transações PIX</p>
      </div>
      
      <div className="divide-y divide-border/20">
        {paymentsData.map((payment, index) => (
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
                <div className="font-medium">{payment.player}</div>
                <div className="text-xs text-muted-foreground">{payment.date}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="font-bold text-secondary">{payment.amount}</div>
                <div className="text-xs text-muted-foreground">{payment.method}</div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getStatusStyle(payment.status)}`}>
                {getStatusIcon(payment.status)}
                {getStatusLabel(payment.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsTable;
