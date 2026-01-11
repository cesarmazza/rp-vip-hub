import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, UserPlus, Crown, Calendar, MoreVertical } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ApiError, getVips, hasAuthToken } from "@/lib/api";

const DashboardPlayers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["vips"],
    queryFn: getVips,
    enabled: hasAuthToken(),
  });
  const playersData = useMemo(() => {
    const vips = data?.vips ?? [];
    const uniquePlayers = new Map<number, { id: number; name: string; discord: string; vip: string | null; expiresAt: string }>();
    vips.forEach((vip) => {
      if (!uniquePlayers.has(vip.user_id)) {
        uniquePlayers.set(vip.user_id, {
          id: vip.user_id,
          name: vip.username,
          discord: vip.discord_id,
          vip: vip.plan_name,
          expiresAt: vip.expires_at,
        });
      }
    });
    return Array.from(uniquePlayers.values());
  }, [data]);
  const errorMessage =
    error instanceof ApiError
      ? error.status === 401
        ? "Faça login para visualizar jogadores."
        : error.message
      : null;

  const filteredPlayers = playersData.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.discord.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const formatDate = (value: string) => new Date(value).toLocaleDateString("pt-BR");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-display">Jogadores</h1>
          <p className="text-muted-foreground">Todos os jogadores registrados no servidor</p>
        </div>
        <Button variant="neon" size="sm" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Adicionar Jogador
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar jogador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
        <Button variant="glass" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>

      {/* Players Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        {isLoading && (
          <div className="text-muted-foreground">Carregando jogadores...</div>
        )}
        {errorMessage && (
          <div className="text-destructive">{errorMessage}</div>
        )}
        {!isLoading && !errorMessage && filteredPlayers.length === 0 && (
          <div className="text-muted-foreground">Nenhum jogador encontrado.</div>
        )}
        {filteredPlayers.map((player, index) => (
          <div 
            key={player.id}
            className="glass-card-hover p-4 animate-fade-in"
            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <span className="font-bold text-primary font-display">
                      {player.name.charAt(0)}
                    </span>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card bg-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold font-display">{player.name}</h3>
                  <p className="text-xs text-muted-foreground">{player.discord}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {player.vip ? (
                <div className="flex items-center gap-2 text-sm">
                  <Crown className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium">{player.vip}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Crown className="w-4 h-4" />
                  <span>Sem VIP</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Expira em {formatDate(player.expiresAt)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {player.vip ? "🟢 VIP ativo" : "⚫ Sem VIP"}
              </span>
              <Button variant="glass" size="sm" className="text-xs h-7">
                Ver Perfil
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPlayers;
