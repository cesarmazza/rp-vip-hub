import { Button } from "@/components/ui/button";
import { 
  Users, 
  Crown, 
  TrendingUp, 
  DollarSign,
  MoreVertical,
  CheckCircle,
  XCircle
} from "lucide-react";

const stats = [
  { label: "Usuários VIP", value: "1,284", icon: Users, change: "+12%" },
  { label: "Receita Mensal", value: "R$ 45.890", icon: DollarSign, change: "+23%" },
  { label: "Taxa de Conversão", value: "68%", icon: TrendingUp, change: "+5%" },
  { label: "VIPs Ativos", value: "892", icon: Crown, change: "+8%" },
];

const vipUsers = [
  { id: 1, name: "Carlos_Silva", discord: "carlos#1234", plan: "VIP Black", status: "active", expires: "15/02/2025" },
  { id: 2, name: "Maria_Santos", discord: "maria#5678", plan: "VIP Plus", status: "active", expires: "28/01/2025" },
  { id: 3, name: "Pedro_Costa", discord: "pedro#9012", plan: "VIP Básico", status: "expired", expires: "10/01/2025" },
  { id: 4, name: "Ana_Oliveira", discord: "ana#3456", plan: "VIP Black", status: "active", expires: "05/03/2025" },
  { id: 5, name: "Lucas_Ferreira", discord: "lucas#7890", plan: "VIP Plus", status: "active", expires: "20/02/2025" },
];

const Dashboard = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl mb-4">
            Painel <span className="gradient-text">Administrativo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Interface profissional para gerenciar todos os VIPs do seu servidor
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="glass-card p-4 md:p-8 neon-glow animate-fade-in">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold font-display">Dashboard</h3>
              <p className="text-sm text-muted-foreground">Visão geral do sistema</p>
            </div>
            <div className="flex gap-2">
              <Button variant="glass" size="sm">Exportar</Button>
              <Button variant="neon" size="sm">+ Novo VIP</Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="dashboard-card">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs text-secondary font-medium">{stat.change}</span>
                </div>
                <div className="text-2xl font-bold font-display">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* VIP Table */}
          <div className="dashboard-card overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <h4 className="font-semibold font-display">Lista de VIPs</h4>
              <Button variant="ghost" size="sm">Ver todos</Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Usuário</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Discord</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Plano</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Expira</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {vipUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">{user.discord}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          user.plan === 'VIP Black' ? 'bg-primary/20 text-primary' :
                          user.plan === 'VIP Plus' ? 'bg-secondary/20 text-secondary' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {user.plan}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={user.status === 'active' ? 'status-active' : 'status-expired'}>
                          {user.status === 'active' ? 'Ativo' : 'Expirado'}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground hidden lg:table-cell">{user.expires}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          {user.status === 'expired' ? (
                            <Button variant="neonGreen" size="sm" className="text-xs">
                              <CheckCircle className="w-3 h-3" />
                              Ativar
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm" className="text-xs text-destructive hover:text-destructive">
                              <XCircle className="w-3 h-3" />
                              Suspender
                            </Button>
                          )}
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
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
