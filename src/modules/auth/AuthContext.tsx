import { createContext, useContext, useState, useEffect } from "react";
import api from "../../lib/axios";
import { User } from "../../types";

export type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: "CLIENT" | "FREELANCER",
    phone: string,
    skills: string[]
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user_data");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const { data } = await api.post("/auth/login", { email, password });

    if (data.token && data.user) {
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user_data", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
    }
  }

  async function register(
    name: string,
    email: string,
    password: string,
    role: "CLIENT" | "FREELANCER",
    phone: string,
    skills: string[] = []
  ) {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
      phone,
      skills,
    });

    if (data.token && data.user) {
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user_data", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_data");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
