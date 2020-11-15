//https://colinhacks.com/essays/nextjs-firebase-authentication
import { createContext, FC, useContext, useEffect, useState } from "react";
import app from "../firebase";

export interface User {
  uid: string;
}

export interface AuthState {
  user?: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthState>({ loading: false });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = app.auth().onIdTokenChanged((token) => {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      const { uid } = token;
      setUser({ uid });
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
