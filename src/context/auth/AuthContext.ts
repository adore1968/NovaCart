import { createContext, useContext } from "react";
import type { User, UserForm } from "../../types/authTypes";

export type AuthContextType = {
  user: User | null;
  login: (user: UserForm) => User | undefined;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside of AuthProvider");
  }
  return context;
};
