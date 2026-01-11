import { Button } from "@/components/ui/button";
import { Crown, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card mx-4 mt-4 md:mx-8 rounded-xl">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-xl font-display neon-text">VIP<span className="text-foreground">Store</span></span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#solucao" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Solução
              </a>
              <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Preços
              </a>
              <a href="#depoimentos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Depoimentos
              </a>
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="glass" size="sm">Ver Demo</Button>
              <Button variant="neon" size="sm">Começar</Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 p-4">
            <nav className="flex flex-col gap-4">
              <a href="#solucao" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Solução
              </a>
              <a href="#precos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Preços
              </a>
              <a href="#depoimentos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Depoimentos
              </a>
              <div className="flex gap-2 pt-4 border-t border-border/50">
                <Button variant="glass" size="sm" className="flex-1">Ver Demo</Button>
                <Button variant="neon" size="sm" className="flex-1">Começar</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
