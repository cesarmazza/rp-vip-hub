import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DashboardVIPs from "./pages/DashboardVIPs";
import DashboardPlayers from "./pages/DashboardPlayers";
import DashboardPayments from "./pages/DashboardPayments";
import DashboardLogs from "./pages/DashboardLogs";
import DashboardSettings from "./pages/DashboardSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="vips" element={<DashboardVIPs />} />
            <Route path="players" element={<DashboardPlayers />} />
            <Route path="payments" element={<DashboardPayments />} />
            <Route path="logs" element={<DashboardLogs />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
