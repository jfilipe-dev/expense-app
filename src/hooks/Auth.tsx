import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

interface User {
  _id: string;
  email: string;
  token: string;
}

interface AuthContextData {
  start(email: string): Promise<void>;
  user: User | null;
  logOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const start = useCallback(async (email) => {
    try {
      const response = await api.get(`/start/${email}`);

      setUser(response.data);

      api.defaults.headers.authorization = `Bearer ${response.data.token}`;

      const jsonValue = JSON.stringify(response.data)
      await AsyncStorage.setItem('@expenseApp:user', jsonValue)
    } catch (error) {

    }
  }, [])

  const logOut = useCallback(async () => {
    try {
      setUser(null);
      await AsyncStorage.setItem('@expenseApp:user', '');
    } catch (error) {

    }
  }, [])

  useEffect(() => {
    const getUserProps = async () => {
      const jsonValue = await AsyncStorage.getItem('@expenseApp:user');

      if (jsonValue) {
        const userProps = JSON.parse(jsonValue);
        setUser(userProps);
        api.defaults.headers.authorization = `Bearer ${userProps.token}`;
      }
    }

    getUserProps();
  }, [])

  return (
    <AuthContext.Provider
      value={{ start, user, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAith must be used within as Authprovider');
  }

  return context;
}
