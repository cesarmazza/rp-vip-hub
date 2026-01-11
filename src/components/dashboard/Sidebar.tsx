import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Crown, 
  Users, 
  CreditCard, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Gamepad2
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Crown, label: "VIPs", path: "/dashboard/vips" },
  { icon: Users, label: "Jogadores", path: "/dashboard/players" },
  { icon: CreditCard, label: "Pagamentos", path: "/dashboard/payments" },
  { icon: FileText, label: "Logs", path: "/dashboard/logs" },
  { icon: Settings, label: "Configurações", path: "/dashboard/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 glass-card border-r border-border/50 transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 neon-border">
            <Gamepad2 className="w-6 h-6 text-primary" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="font-bold text-lg font-display neon-text">City</span>
              <span className="font-bold text-lg font-display text-foreground"> RP</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/dashboard" && location.pathname === "/dashboard");
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary/20 text-primary neon-border" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0 transition-colors",
                isActive && "text-primary"
              )} />
              {!collapsed && (
                <span className="font-medium truncate">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-border/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Recolher</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
