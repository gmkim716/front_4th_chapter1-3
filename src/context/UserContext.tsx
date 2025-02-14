import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { User } from "../types";
import { useNotification } from "./NotificationContext";

// 1. type
interface UserContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
}

// 2. context
const UserContext = createContext<UserContextType | null>(null);

// 3. provider
export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotification();

  const login = useCallback(
    (name: string, email: string) => {
      setUser({ id: 1, name, email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const value = useMemo(() => {
    return {
      user,
      login,
      logout,
    };
  }, [user, login, logout]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 4. hook
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
