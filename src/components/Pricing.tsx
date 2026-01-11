import { Button } from "@/components/ui/button";
import { Check, Star, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "VIP Básico",
    price: "R$ 19,90",
    period: "/mês",
    icon: Star,
    popular: false,
    features: [
      "Acesso a veículos exclusivos",
      "Prioridade na fila",
      "Tag VIP no chat",
      "Suporte básico",
      "1 propriedade extra"
    ]
  },
  {
    name: "VIP Plus",
    price: "R$ 39,90",
    period: "/mês",
    icon: Zap,
    popular: true,
    features: [
      "Tudo do VIP Básico",
      "Veículos premium",
      "3 propriedades extras",
      "Dinheiro bônus mensal",
      "Suporte prioritário",
      "Acesso antecipado a updates"
    ]
  },
  {
    name: "VIP Black",
    price: "R$ 79,90",
    period: "/mês",
    icon: Crown,
    popular: false,
    features: [
      "Tudo do VIP Plus",
      "Veículos exclusivos Black",
      "5 propriedades extras",
      "Cargo especial no Discord",
      "Participação em eventos VIP",
      "Personalização de personagem",
      "Suporte 24/7"
    ]
  }
];

const Pricing = () => {
  return (
    <section className="py-24 relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
      
      <div className="container px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl mb-4">
            Planos <span className="neon-text-green">VIP</span> para seu servidor
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Exemplo de como seus planos podem aparecer na loja
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`card-vip relative animate-fade-in ${
                plan.popular ? 'border-primary neon-border scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold font-display">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  plan.popular ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display">{plan.name}</h3>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold font-display">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-primary' : 'text-secondary'}`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.popular ? "neon" : "glass"} 
                className="w-full"
                size="lg"
              >
                Comprar
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
