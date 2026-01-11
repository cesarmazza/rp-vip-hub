import { Button } from "@/components/ui/button";
import { Filter, Download, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ApiError, getLogs, hasAuthToken } from "@/lib/api";

const getLogIcon = (type: string) => {
  switch (type) {
    case "success": return CheckCircle;
    case "error": return AlertCircle;
    case "warning": return AlertTriangle;
    default: return Info;
  }
};

const getLogStyle = (type: string) => {
  switch (type) {
    case "success": return "text-secondary bg-secondary/10 border-secondary/30";
    case "error": return "text-destructive bg-destructive/10 border-destructive/30";
    case "warning": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
    default: return "text-primary bg-primary/10 border-primary/30";
  }
};

const DashboardLogs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["logs"],
    queryFn: getLogs,
    enabled: hasAuthToken(),
  });
  const logsData = data?.logs ?? [];
  const errorMessage =
    error instanceof ApiError
      ? error.status === 401
        ? "Faça login para visualizar os logs."
        : error.message
      : null;
  const formatDate = (value: string) => new Date(value);
  const getLogType = (action: string) => {
    if (action.includes("vip")) {
      return "success";
    }
    if (action.includes("payment")) {
      return "warning";
    }
    if (action.includes("error")) {
      return "error";
    }
    return "info";
  };
  const getLogLabel = (action: string) =>
    action
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  const getLogDescription = (action: string, data?: string | null) => {
    if (!data) {
      return `Evento: ${action}`;
    }
    try {
      const parsed = JSON.parse(data) as Record<string, unknown>;
      return `${action}: ${Object.entries(parsed)
        .map(([key, value]) => `${key}=${value}`)
        .join(", ")}`;
    } catch {
      return `Evento: ${action}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Logs do Sistema</h1>
          <p className="text-muted-foreground">Registro de todas as atividades</p>
        </div>
        <div className="flex gap-2">
          <Button variant="glass" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filtrar
          </Button>
          <Button variant="neon" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filter Badges */}
      <div className="flex flex-wrap gap-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <button className="px-3 py-1.5 rounded-lg bg-muted/50 text-sm font-medium hover:bg-muted transition-colors border border-border/50">
          Todos
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-sm font-medium hover:bg-secondary/20 transition-colors border border-secondary/30">
          Sucesso
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors border border-primary/30">
          Info
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-yellow-500/10 text-yellow-500 text-sm font-medium hover:bg-yellow-500/20 transition-colors border border-yellow-500/30">
          Aviso
        </button>
        <button className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-sm font-medium hover:bg-destructive/20 transition-colors border border-destructive/30">
          Erro
        </button>
      </div>

      {/* Logs List */}
      <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="divide-y divide-border/20">
          {isLoading && (
            <div className="p-4 text-muted-foreground">Carregando logs...</div>
          )}
          {errorMessage && (
            <div className="p-4 text-destructive">{errorMessage}</div>
          )}
          {!isLoading && !errorMessage && logsData.length === 0 && (
            <div className="p-4 text-muted-foreground">Nenhum log encontrado.</div>
          )}
          {logsData.map((log, index) => {
            const type = getLogType(log.action);
            const Icon = getLogIcon(type);
            const logDate = formatDate(log.created_at);
            return (
              <div 
                key={log.id}
                className="p-4 hover:bg-muted/20 transition-colors flex items-start gap-4 animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.03}s` }}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                  getLogStyle(type)
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold font-display">{getLogLabel(log.action)}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-xs font-medium border",
                      getLogStyle(type)
                    )}>
                      {type === "success" ? "Sucesso" : 
                       type === "error" ? "Erro" :
                       type === "warning" ? "Aviso" : "Info"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getLogDescription(log.action, log.data)}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-medium">
                    {logDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {logDate.toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardLogs;
