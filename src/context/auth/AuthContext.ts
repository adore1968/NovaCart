import { createContext, useContext } from "react";
import type { User } from "../../types/authTypes";

export type AuthContextType = {
  user: User;
};

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside of AuthProvider");
  }
  return context;
};
