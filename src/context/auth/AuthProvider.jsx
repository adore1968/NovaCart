import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem("session");
    return session ? JSON.parse(session) : null;
  });

  const login = (data) => {
    const { email, password } = data;

    if (email === "admin@email.com" && password === "12345678") {
      const session = { email, role: "admin" };
      setUser(session);
      localStorage.setItem("session", JSON.stringify(session));
      toast.success("Welcome back, Admin!");
      return session;
    }

    if (email === "user@email.com" && password === "12345678") {
      const session = { email, role: "user" };
      setUser(session);
      localStorage.setItem("session", JSON.stringify(session));
      toast.success("Login successful!");
      return session;
    }

    toast.error("Invalid email or password");
  };

  const logout = () => {
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
