import { Button } from "@/components/ui/button";
import { Filter, Download, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const logsData = [
  { id: 1, type: "success", action: "VIP Ativado", description: "Carlos_RP ativou VIP Black via PIX", time: "14:32", date: "11/01/2025" },
  { id: 2, type: "info", action: "Login Admin", description: "Admin logou no painel", time: "14:30", date: "11/01/2025" },
  { id: 3, type: "warning", action: "Pagamento Pendente", description: "Pedro_Gang iniciou pagamento mas não finalizou", time: "11:45", date: "11/01/2025" },
  { id: 4, type: "success", action: "VIP Renovado", description: "Maria_City renovou VIP Plus", time: "12:15", date: "11/01/2025" },
  { id: 5, type: "error", action: "Pagamento Falhou", description: "Lucas_Mafia - erro na transação PIX", time: "16:55", date: "10/01/2025" },
  { id: 6, type: "info", action: "Configuração", description: "Admin alterou preço do VIP Black", time: "15:20", date: "10/01/2025" },
  { id: 7, type: "success", action: "VIP Ativado", description: "Ana_Police ativou VIP Black via PIX", time: "18:20", date: "10/01/2025" },
  { id: 8, type: "warning", action: "VIP Expirando", description: "5 VIPs expiram nos próximos 3 dias", time: "09:00", date: "10/01/2025" },
  { id: 9, type: "success", action: "VIP Ativado", description: "Julia_Medic ativou VIP Básico via PIX", time: "14:30", date: "10/01/2025" },
  { id: 10, type: "info", action: "Backup", description: "Backup automático do banco de dados realizado", time: "03:00", date: "10/01/2025" },
];

const getLogIcon = (type: string) => {
  switch (type) {
    case "success": return CheckCircle;
    case "error": return AlertCircle;
    case "warning": return AlertTriangle;
    default: return Info;
  }
};

const getLogStyle = (type: string) => {
  switch (type) {
    case "success": return "text-secondary bg-secondary/10 border-secondary/30";
    case "error": return "text-destructive bg-destructive/10 border-destructive/30";
    case "warning": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
    default: return "text-primary bg-primary/10 border-primary/30";
  }
};

const DashboardLogs = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Logs do Sistema</h1>
          <p className="text-muted-foreground">Registro de todas as atividades</p>
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

      {/* Filter Badges */}
      <div className="flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <button className="px-3 py-1.5 rounded-lg bg-muted/50 text-sm font-medium hover:bg-muted transition-colors border border-border/50">
          Todos
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-sm font-medium hover:bg-secondary/20 transition-colors border border-secondary/30">
          Sucesso
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors border border-primary/30">
          Info
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-500 text-sm font-medium hover:bg-yellow-500/20 transition-colors border border-yellow-500/30">
          Aviso
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors border border-destructive/30">
          Erro
        </button>
      </div>

      {/* Logs List */}
      <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="divide-y divide-border/20">
          {logsData.map((log, index) => {
            const Icon = getLogIcon(log.type);
            return (
              <div 
                key={log.id}
                className="p-4 hover:bg-muted/20 transition-colors flex items-start gap-4 animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.03}s` }}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                  getLogStyle(log.type)
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold font-display">{log.action}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium border",
                      getLogStyle(log.type)
                    )}>
                      {log.type === "success" ? "Sucesso" : 
                       log.type === "error" ? "Erro" :
                       log.type === "warning" ? "Aviso" : "Info"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-medium">{log.time}</div>
                  <div className="text-xs text-muted-foreground">{log.date}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardLogs;
