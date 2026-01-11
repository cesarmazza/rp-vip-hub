import { Button } from "@/components/ui/button";
import { MoreVertical, RefreshCw, XCircle, Crown, Zap, Star } from "lucide-react";

const vipData = [
  { id: 1, player: "Carlos_RP", discord: "carlos#1234", type: "VIP Black", status: "active", expires: "15/02/2025", revenue: "R$ 79,90" },
  { id: 2, player: "Maria_City", discord: "maria#5678", type: "VIP Plus", status: "active", expires: "28/01/2025", revenue: "R$ 39,90" },
  { id: 3, player: "Pedro_Gang", discord: "pedro#9012", type: "VIP Básico", status: "expired", expires: "10/01/2025", revenue: "R$ 19,90" },
  { id: 4, player: "Ana_Police", discord: "ana#3456", type: "VIP Black", status: "active", expires: "05/03/2025", revenue: "R$ 79,90" },
  { id: 5, player: "Lucas_Mafia", discord: "lucas#7890", type: "VIP Plus", status: "active", expires: "20/02/2025", revenue: "R$ 39,90" },
  { id: 6, player: "Julia_Medic", discord: "julia#2345", type: "VIP Básico", status: "pending", expires: "25/01/2025", revenue: "R$ 19,90" },
];

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
    default: return "bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-full text-xs font-medium";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "active": return "Ativo";
    case "expired": return "Expirado";
    default: return "Pendente";
  }
};

const VIPTable = () => {
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
                        {vip.player.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{vip.player}</div>
                      <div className="text-xs text-muted-foreground">{vip.discord}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${getVIPStyle(vip.type)}`}>
                    {getVIPIcon(vip.type)}
                    {vip.type}
                  </span>
                </td>
                <td className="p-4">
                  <span className={getStatusStyle(vip.status)}>
                    {getStatusLabel(vip.status)}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground hidden lg:table-cell">{vip.expires}</td>
                <td className="p-4 font-medium text-secondary hidden md:table-cell">{vip.revenue}</td>
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
