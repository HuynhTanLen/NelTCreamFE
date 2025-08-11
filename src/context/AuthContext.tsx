import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, User, Seller } from '../types';
import { Cal_login } from '../services/auth';


interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, fullName: string) => Promise<void>;
  registerSeller: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  seller: null,
  isAdmin: false,
  isAuthenticated: false,
  token: null,
};

type AuthAction =
  | { type: 'AUTH_SUCCESS'; payload: { user: User; seller?: Seller; token: string; isAdmin: boolean } }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_LOADING'; payload: boolean };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        user: action.payload.user,
        seller: action.payload.seller || null,
        isAdmin: action.payload.isAdmin,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'AUTH_LOGOUT':
      return initialState;
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
      
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await Cal_login(email, password);
      const { user, seller, token, isAdmin } = response.data as { user: User; seller?: Seller; token: string; isAdmin: boolean };
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('seller', JSON.stringify(seller));
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: { user, seller, token, isAdmin },
      });
    } catch (error) {
      // Xử lý lỗi nếu cần
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, fullName: string) => {
  
  };

  const registerSeller = async (email: string, password: string, fullName: string) => {
    
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('seller');
    localStorage.removeItem('isAdmin');
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, registerSeller, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}