import { useState } from "react";
import { DollarSign, Crown, Users, RefreshCw } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import VIPTable from "@/components/dashboard/VIPTable";
import PaymentsTable from "@/components/dashboard/PaymentsTable";
import PlayerCard from "@/components/dashboard/PlayerCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import PurchaseModal from "@/components/dashboard/PurchaseModal";

const Dashboard = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="animate-fade-in">
        <h1 className="text-2xl md:text-3xl font-bold font-display">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo de volta, Admin</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <MetricCard
            title="Receita do Mês"
            value="R$ 12.458"
            change="+23%"
            changeType="positive"
            icon={DollarSign}
            iconColor="secondary"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
          <MetricCard
            title="VIPs Ativos"
            value="284"
            change="+12%"
            changeType="positive"
            icon={Crown}
            iconColor="primary"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <MetricCard
            title="Jogadores Registrados"
            value="1.847"
            change="+8%"
            changeType="positive"
            icon={Users}
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
          <MetricCard
            title="Renovações Hoje"
            value="18"
            change="+5"
            changeType="positive"
            icon={RefreshCw}
            iconColor="secondary"
          />
        </div>
      </div>

      {/* Charts and Player Card Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <RevenueChart />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
          <PlayerCard onBuyClick={() => setIsPurchaseModalOpen(true)} />
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <VIPTable />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.45s" }}>
          <PaymentsTable />
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal 
        isOpen={isPurchaseModalOpen} 
        onClose={() => setIsPurchaseModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
