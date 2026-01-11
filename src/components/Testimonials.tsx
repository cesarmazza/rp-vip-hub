import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Depois desse painel nossas doações dobraram. O sistema de PIX automático foi um divisor de águas.",
    author: "Thunder RP",
    role: "500+ jogadores ativos",
    avatar: "T"
  },
  {
    quote: "Nunca mais precisei ativar VIP manual. O tempo que economizei já pagou o sistema várias vezes.",
    author: "City Life Brasil",
    role: "Servidor desde 2021",
    avatar: "C"
  },
  {
    quote: "Muito mais profissional. Nossos jogadores confiam mais no servidor agora que temos uma loja de verdade.",
    author: "Nova Era RP",
    role: "Top 10 servidores BR",
    avatar: "N"
  },
  {
    quote: "A integração foi super rápida. Em menos de 1 hora já estava tudo funcionando.",
    author: "Street Kings",
    role: "300+ membros VIP",
    avatar: "S"
  },
  {
    quote: "O suporte é incrível. Sempre respondem rápido e ajudam com qualquer dúvida.",
    author: "Vida Real RP",
    role: "Comunidade ativa",
    avatar: "V"
  },
  {
    quote: "Finalmente um sistema que entende as necessidades de quem gerencia servidor FiveM.",
    author: "Elite Gaming",
    role: "Rede de servidores",
    avatar: "E"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl mb-4">
            O que os <span className="gradient-text">servidores</span> dizem
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Histórias reais de administradores que transformaram seus servidores
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass-card-hover p-6 relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-primary/30 absolute top-4 right-4" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-foreground/90 mb-6 leading-relaxed font-body">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary font-display">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold font-display">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
