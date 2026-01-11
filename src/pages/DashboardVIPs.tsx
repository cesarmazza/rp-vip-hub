import { Button } from "@/components/ui/button";
import { Plus, Filter, Download } from "lucide-react";
import VIPTable from "@/components/dashboard/VIPTable";

const DashboardVIPs = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">VIPs</h1>
          <p className="text-muted-foreground">Gerencie todos os VIPs do servidor</p>
        </div>
        <div className="flex gap-2">
          <Button variant="glass" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
          <Button variant="glass" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button variant="neon" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Novo VIP
          </Button>
        </div>
      </div>

      {/* VIP Table */}
      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <VIPTable />
      </div>
    </div>
  );
};

export default DashboardVIPs;
