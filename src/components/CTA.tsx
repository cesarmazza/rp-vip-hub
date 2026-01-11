import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="glass-card p-8 md:p-16 text-center neon-border animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Comece agora mesmo</span>
          </div>

          {/* Title */}
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl mb-6 max-w-4xl mx-auto">
            Pronto para transformar seu servidor em uma{" "}
            <span className="gradient-text">máquina de faturamento</span>?
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto font-body">
            Junte-se a centenas de servidores que já automatizaram suas vendas VIP e 
            aumentaram sua receita de forma consistente.
          </p>

          {/* CTA Button */}
          <Button variant="neon" size="xl" className="group text-lg">
            <MessageCircle className="w-6 h-6" />
            Falar no Discord
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Suporte em português
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Instalação em minutos
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              Garantia de 7 dias
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
