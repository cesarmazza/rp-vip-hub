import { 
  QrCode, 
  Zap, 
  User, 
  Settings, 
  History, 
  Shield,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "Pagamento via PIX",
    description: "Integração completa com PIX. Pagamentos instantâneos e sem taxas abusivas."
  },
  {
    icon: Zap,
    title: "Entrega automática no jogo",
    description: "VIP ativado automaticamente após confirmação. Zero intervenção manual."
  },
  {
    icon: User,
    title: "Painel do jogador",
    description: "Interface moderna onde jogadores gerenciam suas assinaturas e histórico."
  },
  {
    icon: Settings,
    title: "Painel administrativo",
    description: "Dashboard completo para gestão de vendas, usuários e configurações."
  },
  {
    icon: History,
    title: "Histórico e logs",
    description: "Rastreabilidade total de todas as transações e ações do sistema."
  },
  {
    icon: Shield,
    title: "Segurança contra fraude",
    description: "Proteção avançada contra chargebacks e tentativas de fraude."
  }
];

const Solution = () => {
  return (
    <section className="py-24 relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">A Solução</span>
          </div>
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-4">
            Sistema de <span className="gradient-text">Loja VIP Automática</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Tudo que você precisa para monetizar seu servidor de forma profissional
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card-hover p-6 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 font-display">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-body">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
