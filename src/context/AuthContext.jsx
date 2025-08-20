import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const uRaw = localStorage.getItem("user");

    if (t && uRaw) {
      const payload = parseJwt(t);
      const now = Date.now();
      const expMs = payload?.exp ? payload.exp * 1000 : null;

      if (!expMs || expMs > now) {
        setToken(t);
        setUser(JSON.parse(uRaw));
        if (expMs) {
          const msToExpire = expMs - now;
          const timer = setTimeout(() => logout(), msToExpire);
          return () => clearTimeout(timer);
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token) return;
    const payload = parseJwt(token);
    const expMs = payload?.exp ? payload.exp * 1000 : null;
    if (!expMs) return;

    const now = Date.now();
    const msToExpire = expMs - now;
    if (msToExpire <= 0) {
      logout();
      return;
    }
    const timer = setTimeout(() => logout(), msToExpire);
    return () => clearTimeout(timer);
  }, [token]);

  const login = ({ token, user }) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoading(false);
  };

  const isAdmin = user?.rol === "admin";
  const hasRole = (role) => user?.rol === role;

  const value = useMemo(
    () => ({ token, user, isAdmin, hasRole, login, logout, loading }),
    [token, user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
