import { createContext, useState, useContext, ReactNode } from "react";
import { UserAddEditSchemaType } from "../utiles/validation/schema";
import { user_role_listcontext } from "./userliststore";

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: UserAddEditSchemaType | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<
    UserAddEditSchemaType[] | null
  >(null);

  const { getCombinedUsers } = useContext(user_role_listcontext);

  const login = (email: string, password: string) => {
    const combinedUsers = getCombinedUsers();
    const user = combinedUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      console.log("Logged in as:", user.name);
      // alert("added");
      setCurrentUser(user);
      setIsLoggedIn(true);
      return true;
    } else {
      console.log("Invalid credentials");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
