import { Button } from "@/components/ui/button";
import { Crown, Calendar, RefreshCw, ShoppingCart, Clock, CheckCircle } from "lucide-react";

const purchaseHistory = [
  { id: 1, plan: "VIP Black", amount: "R$ 79,90", date: "11/01/2025", status: "completed" },
  { id: 2, plan: "VIP Plus", amount: "R$ 39,90", date: "11/12/2024", status: "completed" },
  { id: 3, plan: "VIP Básico", amount: "R$ 19,90", date: "11/11/2024", status: "completed" },
];

interface PlayerCardProps {
  onBuyClick: () => void;
}

const PlayerCard = ({ onBuyClick }: PlayerCardProps) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-border/50 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border-2 border-primary/30 neon-glow">
            <span className="text-2xl font-bold text-primary font-display">C</span>
          </div>
          <div>
            <h3 className="text-xl font-bold font-display">Carlos_RP</h3>
            <p className="text-sm text-muted-foreground">carlos#1234</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Current VIP */}
        <div className="glass-card p-4 neon-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              <span className="font-semibold font-display">VIP Black</span>
            </div>
            <span className="status-active">Ativo</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <span>Expira em: 15/02/2025</span>
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
            {purchaseHistory.map((purchase) => (
              <div 
                key={purchase.id} 
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-secondary" />
                  <div>
                    <div className="font-medium text-sm">{purchase.plan}</div>
                    <div className="text-xs text-muted-foreground">{purchase.date}</div>
                  </div>
                </div>
                <span className="font-semibold text-secondary">{purchase.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
