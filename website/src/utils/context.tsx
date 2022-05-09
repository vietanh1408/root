import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import JWTManager from "./jwt";

interface IAuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  checkAuth: () => Promise<void>;
  logoutClient: () => void;
}

const defaultIsAuthenticated = false;

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: defaultIsAuthenticated,
  setIsAuthenticated: () => null,
  checkAuth: () => Promise.resolve(),
  logoutClient: () => null,
});

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultIsAuthenticated
  );

  const checkAuth = useCallback(async () => {
    const token = JWTManager.getToken();

    if (token) setIsAuthenticated(true);
    else {
      const success = await JWTManager.getRefreshToken();
      if (success) setIsAuthenticated(true);
    }
  }, []);

  const logoutClient = () => {
    JWTManager.deleteToken();
    setIsAuthenticated(false);
  };

  const authContextData = {
    isAuthenticated,
    setIsAuthenticated,
    checkAuth,
    logoutClient,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
