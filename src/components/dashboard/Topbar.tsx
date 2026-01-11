import { Bell, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ApiError, getDiscordAuthUrl, getMe, hasAuthToken } from "@/lib/api";
import { useState } from "react";

const Topbar = () => {
  const isAuthenticated = hasAuthToken();
  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: isAuthenticated,
  });
  const [authError, setAuthError] = useState<string | null>(null);

  const handleLogin = async () => {
    setAuthError(null);
    try {
      const response = await getDiscordAuthUrl();
      window.location.href = response.auth_url;
    } catch (err) {
      if (err instanceof ApiError) {
        setAuthError(err.message);
      } else {
        setAuthError("Nao foi possivel iniciar o login.");
      }
    }
  };

  return (
    <header className="h-16 glass-card border-b border-border/50 sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar jogadores, VIPs, pagamentos..."
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </Button>

          {/* User */}
          <div className="flex items-center gap-3 pl-4 border-l border-border/50">
            {isAuthenticated ? (
              <>
                <div className="text-right">
                  <div className="font-medium text-sm">{me?.user.username ?? "Usuario"}</div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    Online
                  </div>
                </div>
                <button className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <span className="font-bold text-primary font-display">
                      {me?.user.username?.charAt(0) ?? "A"}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <Button variant="neon" size="sm" onClick={handleLogin}>
                  Entrar com Discord
                </Button>
                {authError && <span className="text-xs text-destructive">{authError}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
