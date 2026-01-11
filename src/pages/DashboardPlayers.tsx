import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, UserPlus, Crown, Calendar, MoreVertical } from "lucide-react";

const playersData = [
  { id: 1, name: "Carlos_RP", discord: "carlos#1234", status: "online", vip: "VIP Black", joined: "15/06/2024", lastSeen: "Agora" },
  { id: 2, name: "Maria_City", discord: "maria#5678", status: "online", vip: "VIP Plus", joined: "20/08/2024", lastSeen: "Agora" },
  { id: 3, name: "Pedro_Gang", discord: "pedro#9012", status: "offline", vip: null, joined: "10/09/2024", lastSeen: "2h atrás" },
  { id: 4, name: "Ana_Police", discord: "ana#3456", status: "online", vip: "VIP Black", joined: "05/07/2024", lastSeen: "Agora" },
  { id: 5, name: "Lucas_Mafia", discord: "lucas#7890", status: "offline", vip: "VIP Plus", joined: "12/10/2024", lastSeen: "1d atrás" },
  { id: 6, name: "Julia_Medic", discord: "julia#2345", status: "online", vip: "VIP Básico", joined: "25/11/2024", lastSeen: "Agora" },
  { id: 7, name: "Bruno_Taxi", discord: "bruno#6789", status: "offline", vip: null, joined: "30/12/2024", lastSeen: "5h atrás" },
  { id: 8, name: "Fernanda_EMS", discord: "fer#0123", status: "online", vip: "VIP Plus", joined: "08/01/2025", lastSeen: "Agora" },
];

const DashboardPlayers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = playersData.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.discord.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <span className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                    player.status === "online" ? "bg-secondary" : "bg-muted-foreground"
                  }`} />
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
                <span>Desde {player.joined}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {player.status === "online" ? "🟢 Online" : `⚫ ${player.lastSeen}`}
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
