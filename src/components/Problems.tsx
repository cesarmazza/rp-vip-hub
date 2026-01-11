import { Clock, XCircle, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "VIP manual dá dor de cabeça",
    description: "Staff perdendo tempo ativando VIP manualmente. Horas gastas em tarefas repetitivas que poderiam ser automatizadas.",
    color: "primary"
  },
  {
    icon: XCircle,
    title: "Jogadores desistem de comprar",
    description: "Pagamentos confusos e sem confirmação. Processo complicado que faz potenciais clientes abandonarem a compra.",
    color: "destructive"
  },
  {
    icon: TrendingDown,
    title: "Você perde dinheiro",
    description: "Falta de automação reduz conversão. Cada minuto de demora na ativação é uma venda que você pode perder.",
    color: "secondary"
  }
];

const Problems = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl mb-4">
            Problemas que você <span className="text-destructive">enfrenta</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Se você gerencia um servidor FiveM, provavelmente já passou por isso
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="glass-card-hover p-8 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                problem.color === 'primary' ? 'bg-primary/10 group-hover:bg-primary/20' :
                problem.color === 'destructive' ? 'bg-destructive/10 group-hover:bg-destructive/20' :
                'bg-secondary/10 group-hover:bg-secondary/20'
              }`}>
                <problem.icon className={`w-8 h-8 ${
                  problem.color === 'primary' ? 'text-primary' :
                  problem.color === 'destructive' ? 'text-destructive' :
                  'text-secondary'
                }`} />
              </div>
              
              <h3 className="text-xl font-bold mb-3 font-display">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed font-body">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
