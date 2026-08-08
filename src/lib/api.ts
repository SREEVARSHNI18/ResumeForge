import { mockApi } from "./mockApi";

// In dev, leave this unset and let vite.config.ts's proxy handle /api.
// In a standalone/production build, set VITE_API_BASE_URL to your backend's
// real URL (e.g. https://api.yourapp.com) — see .env.example.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

// Set VITE_USE_MOCK_API=true in .env to test the UI with zero backend —
// every api.* call below returns fake data instead of hitting fetch.
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === "true";

const TOKEN_KEY = "resume_tailor_token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
      // response wasn't JSON — fall back to statusText
    }
    if (res.status === 401) clearToken();
    throw new ApiError(res.status, detail);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export interface User {
  id: string;
  email: string;
}

export interface Resume {
  id: string;
  original_filename: string;
  parsed_data: {
    contact: string[];
    skills: string[];
    experience: string[];
    projects: string[];
    education: string[];
    raw_text: string;
  };
}

export const api = {
  async signup(email: string, password: string): Promise<User> {
    if (USE_MOCK_API) return mockApi.signup(email, password);
    return request<User>("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  },

  async login(email: string, password: string): Promise<string> {
    if (USE_MOCK_API) return mockApi.login(email, password);
    // FastAPI's OAuth2PasswordRequestForm expects form-encoded data, not JSON.
    const body = new URLSearchParams({ username: email, password });
    const { access_token } = await request<{ access_token: string }>("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    setToken(access_token);
    return access_token;
  },

  async uploadResume(file: File): Promise<Resume> {
    if (USE_MOCK_API) return mockApi.uploadResume(file);
    const formData = new FormData();
    formData.append("file", file);
    return request<Resume>("/resumes", { method: "POST", body: formData });
  },

  async getResume(id: string): Promise<Resume> {
    if (USE_MOCK_API) return mockApi.getResume(id);
    return request<Resume>(`/resumes/${id}`);
  },
};
