import { Button } from "@/components/ui/button";
import { Save, Globe, Bell, Shield, Palette, Webhook, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const settingsSections = [
  {
    id: "general",
    icon: Globe,
    title: "Configurações Gerais",
    description: "Nome do servidor, logo e informações básicas",
  },
  {
    id: "payments",
    icon: CreditCard,
    title: "Pagamentos",
    description: "Configurar chaves PIX e métodos de pagamento",
  },
  {
    id: "notifications",
    icon: Bell,
    title: "Notificações",
    description: "Alertas de pagamentos e VIPs expirando",
  },
  {
    id: "webhooks",
    icon: Webhook,
    title: "Webhooks & Integrações",
    description: "Discord, FiveM e outras integrações",
  },
  {
    id: "security",
    icon: Shield,
    title: "Segurança",
    description: "Autenticação, permissões e logs",
  },
  {
    id: "appearance",
    icon: Palette,
    title: "Aparência",
    description: "Cores, temas e personalização visual",
  },
];

const DashboardSettings = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do sistema</p>
        </div>
        <Button variant="neon" size="sm" className="gap-2">
          <Save className="w-4 h-4" />
          Salvar Alterações
        </Button>
      </div>

      {/* Settings Grid */}
      <div className="grid md:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {settingsSections.map((section, index) => (
          <button
            key={section.id}
            className={cn(
              "glass-card-hover p-6 text-left group animate-fade-in"
            )}
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold font-display mb-1">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Example Settings Form */}
      <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <h3 className="text-lg font-bold font-display mb-6">Configurações Gerais</h3>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Servidor</label>
              <input
                type="text"
                defaultValue="City RP"
                className="w-full h-10 px-4 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Discord Webhook</label>
              <input
                type="text"
                defaultValue="https://discord.com/api/webhooks/..."
                className="w-full h-10 px-4 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Chave PIX</label>
            <input
              type="text"
              defaultValue="cidade.rp@email.com"
              className="w-full h-10 px-4 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Preço VIP Básico</label>
              <input
                type="text"
                defaultValue="R$ 19,90"
                className="w-full h-10 px-4 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preço VIP Plus</label>
              <input
                type="text"
                defaultValue="R$ 39,90"
                className="w-full h-10 px-4 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preço VIP Black</label>
              <input
                type="text"
                defaultValue="R$ 79,90"
                className="w-full h-10 px-4 rounded-xl bg-muted/50 border border-border/50 text-sm focus:outline-none focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div>
              <h4 className="font-medium">Notificações por Email</h4>
              <p className="text-sm text-muted-foreground">Receber alertas de pagamentos</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-primary relative transition-colors">
              <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary-foreground transition-all" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
            <div>
              <h4 className="font-medium">Entrega Automática</h4>
              <p className="text-sm text-muted-foreground">Ativar VIP automaticamente após pagamento</p>
            </div>
            <button className="w-12 h-6 rounded-full bg-primary relative transition-colors">
              <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-primary-foreground transition-all" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
