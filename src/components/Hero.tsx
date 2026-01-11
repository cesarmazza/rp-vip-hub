import { Button } from "@/components/ui/button";
import { Play, MessageCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-neon" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-neon" style={{ animationDelay: '1s' }} />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="glass-card px-4 py-2 animate-fade-in">
            <span className="text-sm font-medium text-muted-foreground">
              🎮 Sistema #1 para servidores FiveM
            </span>
          </div>

          {/* Main Title */}
          <h1 
            className="section-title text-4xl md:text-5xl lg:text-7xl leading-tight animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            Automatize sua{" "}
            <span className="gradient-text">Loja VIP</span>
            <br />
            e aumente a receita do seu servidor{" "}
            <span className="neon-text">GTA RP</span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed animate-fade-in font-body"
            style={{ animationDelay: '0.2s' }}
          >
            Sistema completo de pagamentos, entrega automática de VIP e painel de gestão 
            para servidores FiveM. Tudo integrado e funcionando em minutos.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Button variant="neon" size="xl" className="group">
              <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
              Ver Demonstração
            </Button>
            <Button variant="glass" size="xl" className="group">
              <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              Falar no Discord
            </Button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 md:gap-16 pt-12 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold neon-text font-display">500+</div>
              <div className="text-sm text-muted-foreground mt-1">Servidores Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold neon-text-green font-display">R$2M+</div>
              <div className="text-sm text-muted-foreground mt-1">Processado</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold neon-text font-display">99.9%</div>
              <div className="text-sm text-muted-foreground mt-1">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
