import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import type { User, UserForm } from "../../types/authTypes";

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  });

  const login = (user: UserForm): User | undefined => {
    const { email, password } = user;

    if (email === "admin@email.com" && password === "12345678") {
      const session: User = { email, role: "admin" };
      setUser(session);
      localStorage.setItem("session", JSON.stringify(session));
      toast.success("Welcome back, Admin!");
      return session;
    }

    if (email === "user@email.com" && password === "12345678") {
      const session: User = { email, role: "user" };
      setUser(session);
      localStorage.setItem("session", JSON.stringify(session));
      toast.success("Login successful!");
      return session;
    }

    toast.error("Invalid email or password");
  };

  const logout = (): void => {
    localStorage.removeItem("session");
    setUser(null);
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
