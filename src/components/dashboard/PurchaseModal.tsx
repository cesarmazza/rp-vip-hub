import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Crown, Zap, Star, Check, Copy, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  ApiError,
  confirmPayment,
  createPayment,
  getMe,
  getVips,
  hasAuthToken,
} from "@/lib/api";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseModal = ({ isOpen, onClose }: PurchaseModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [step, setStep] = useState<"select" | "payment" | "success">("select");
  const [copied, setCopied] = useState(false);
  const [paymentId, setPaymentId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAuthenticated = hasAuthToken();
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: isOpen && isAuthenticated,
  });
  const { data, isLoading, error } = useQuery({
    queryKey: ["vips"],
    queryFn: getVips,
    enabled: isOpen && isAuthenticated,
  });

  const plans = useMemo(() => {
    const planData = data?.plans ?? [];
    return planData.map((plan) => {
      const planName = plan.name.toLowerCase();
      const icon = planName.includes("black") ? Crown : planName.includes("plus") ? Zap : Star;
      const color = planName.includes("black") ? "primary" : planName.includes("plus") ? "secondary" : "muted";
      const features = plan.benefits
        ? plan.benefits.split(";").map((feature) => feature.trim()).filter(Boolean)
        : [];

      return {
        id: plan.id,
        name: plan.name,
        price: plan.price,
        icon,
        color,
        features: features.length ? features : [plan.benefits],
      };
    });
  }, [data]);

  const errorMessage =
    error instanceof ApiError
      ? error.status === 401
        ? "Faça login para adquirir VIP."
        : error.message
      : null;

  const handleSelectPlan = (planId: number) => {
    setSelectedPlan(planId);
  };

  const handleProceed = async () => {
    if (!selectedPlan || !me?.user) {
      return;
    }
    setIsSubmitting(true);
    setActionError(null);
    try {
      const payment = await createPayment({
        user_id: me.user.id,
        vip_plan_id: selectedPlan,
        method: "PIX",
      });
      setPaymentId(payment.payment.id);
      setStep("payment");
    } catch (err) {
      if (err instanceof ApiError) {
        setActionError(err.message);
      } else {
        setActionError("Nao foi possivel criar o pagamento.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!paymentId) {
      return;
    }
    setIsSubmitting(true);
    setActionError(null);
    try {
      await confirmPayment({ payment_id: paymentId });
      setStep("success");
    } catch (err) {
      if (err instanceof ApiError) {
        setActionError(err.message);
      } else {
        setActionError("Nao foi possivel confirmar o pagamento.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyPix = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep("select");
    setSelectedPlan(null);
    setPaymentId(null);
    setActionError(null);
    onClose();
  };

  if (!isOpen) return null;

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl glass-card neon-border animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-display">
              {step === "select" && "Escolha seu Plano VIP"}
              {step === "payment" && "Pagamento via PIX"}
              {step === "success" && "Pagamento Confirmado!"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {step === "select" && "Selecione o plano ideal para voce"}
              {step === "payment" && "Escaneie o QR Code ou copie o codigo"}
              {step === "success" && "Seu VIP foi ativado automaticamente"}
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {errorMessage && <p className="text-sm text-destructive mb-4">{errorMessage}</p>}
          {actionError && <p className="text-sm text-destructive mb-4">{actionError}</p>}
          {!isAuthenticated && (
            <p className="text-sm text-muted-foreground">Entre com sua conta para continuar.</p>
          )}
          {step === "select" && (
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Carregando planos...</p>
              ) : (
                <div className="grid md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => handleSelectPlan(plan.id)}
                      className={cn(
                        "relative p-4 rounded-xl border-2 transition-all duration-300 text-left",
                        selectedPlan === plan.id
                          ? "border-primary bg-primary/10"
                          : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
                        plan.color === "primary" && "bg-primary/20",
                        plan.color === "secondary" && "bg-secondary/20",
                        plan.color === "muted" && "bg-muted"
                      )}>
                        <plan.icon className={cn(
                          "w-5 h-5",
                          plan.color === "primary" && "text-primary",
                          plan.color === "secondary" && "text-secondary",
                          plan.color === "muted" && "text-muted-foreground"
                        )} />
                      </div>
                      <h3 className="font-bold font-display mb-1">{plan.name}</h3>
                      <p className="text-xl font-bold text-primary mb-3">
                        {plan.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                      <ul className="space-y-1.5">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Check className="w-3 h-3 text-secondary shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {selectedPlan === plan.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
              <Button 
                variant="neon" 
                size="lg" 
                className="w-full mt-4"
                disabled={!selectedPlan || !me?.user || isSubmitting}
                onClick={handleProceed}
              >
                {isSubmitting ? "Processando..." : "Continuar para Pagamento"}
              </Button>
            </div>
          )}

          {step === "payment" && selectedPlanData && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-muted/30">
                <selectedPlanData.icon className="w-6 h-6 text-primary" />
                <div>
                  <span className="font-bold font-display">{selectedPlanData.name}</span>
                  <span className="mx-2 text-muted-foreground">•</span>
                  <span className="text-xl font-bold text-secondary">
                    {selectedPlanData.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                {/* Fake QR Code */}
                <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center mb-4">
                  <div className="grid grid-cols-8 gap-0.5">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "w-4 h-4",
                          Math.random() > 0.5 ? "bg-black" : "bg-white"
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-full max-w-sm">
                  <p className="text-sm text-muted-foreground text-center mb-2">Ou copie o codigo PIX:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value="00020126580014br.gov.bcb.pix..."
                      className="flex-1 h-10 px-3 rounded-lg bg-muted/50 border border-border/50 text-sm text-muted-foreground"
                    />
                    <Button 
                      variant="glass" 
                      size="icon"
                      onClick={handleCopyPix}
                    >
                      {copied ? <CheckCircle className="w-4 h-4 text-secondary" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => setStep("select")}
                >
                  Voltar
                </Button>
                <Button 
                  variant="neon" 
                  size="lg" 
                  className="flex-1"
                  onClick={handleConfirmPayment}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Confirmando..." : "Ja Paguei"}
                </Button>
              </div>
            </div>
          )}

          {step === "success" && selectedPlanData && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <CheckCircle className="w-10 h-10 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold font-display mb-2">
                {selectedPlanData.name} Ativado!
              </h3>
              <p className="text-muted-foreground mb-6">
                Seu VIP ja esta disponivel no servidor. Bom jogo!
              </p>
              <Button variant="neon" size="lg" onClick={handleClose}>
                Voltar ao Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
