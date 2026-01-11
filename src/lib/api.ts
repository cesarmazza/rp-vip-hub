export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const TOKEN_KEY = "vip_jwt";

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
};

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);
export const setAuthToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearAuthToken = () => localStorage.removeItem(TOKEN_KEY);
export const hasAuthToken = () => Boolean(getAuthToken());

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers ?? {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = "Erro ao carregar dados.";
    try {
      const data = (await response.json()) as { error?: string };
      if (data?.error) {
        message = data.error;
      }
    } catch {
      // ignore
    }
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export interface MeResponse {
  user: {
    id: number;
    username: string;
    discord_id?: string;
    avatar?: string | null;
    role: string;
    vip_ativo?: string | null;
    expires_at?: string | null;
  };
}

export interface MetricsResponse {
  receita_mes: number;
  vips_ativos: number;
  total_jogadores: number;
  renovacoes_hoje: number;
}

export interface VipPlan {
  id: number;
  name: string;
  price: number;
  duration_days: number;
  benefits: string;
}

export interface VipEntry {
  id: number;
  user_id: number;
  username: string;
  discord_id: string;
  status: string;
  expires_at: string;
  plan_name: string;
  plan_price: number;
}

export interface VipsResponse {
  plans: VipPlan[];
  vips: VipEntry[];
}

export interface PaymentEntry {
  id: number;
  user_id: number;
  vip_plan_id: number;
  amount: number;
  method: string;
  status: string;
  created_at: string;
  username: string;
  discord_id: string;
  plan_name: string;
}

export interface PaymentsResponse {
  payments: PaymentEntry[];
}

export interface PaymentCreateResponse {
  payment: {
    id: number;
    user_id: number;
    vip_plan_id: number;
    amount: number;
    method: string;
    status: string;
  };
}

export interface LogEntry {
  id: number;
  action: string;
  user_id: number | null;
  data: string | null;
  created_at: string;
}

export interface LogsResponse {
  logs: LogEntry[];
}

export interface DiscordAuthResponse {
  auth_url: string;
}

export const getMe = () => request<MeResponse>("/me");
export const getDashboardMetrics = () => request<MetricsResponse>("/dashboard/metrics");
export const getVips = () => request<VipsResponse>("/vips");
export const getPayments = () => request<PaymentsResponse>("/payments");
export const getLogs = () => request<LogsResponse>("/logs");
export const getDiscordAuthUrl = () => request<DiscordAuthResponse>("/auth/discord");

export const createPayment = (payload: { user_id: number; vip_plan_id: number; method?: string }) =>
  request<PaymentCreateResponse>("/payment/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const confirmPayment = (payload: { payment_id: number; vip_plan_id?: number }) =>
  request<{ payment: { id: number; status: string }; vip: unknown }>("/payment/confirm", {
    method: "POST",
    body: JSON.stringify(payload),
  });
