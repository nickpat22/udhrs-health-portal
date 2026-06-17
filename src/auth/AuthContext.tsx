import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, ROLES, DEMO_ACCOUNTS } from './types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userId: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  selectedRole: UserRole | null;
  setSelectedRole: (role: UserRole | null) => void;
  hasPermission: (permission: string) => boolean;
  canAccessModule: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userId: string, password: string): { success: boolean; error?: string } => {
    const account = DEMO_ACCOUNTS[userId as keyof typeof DEMO_ACCOUNTS];
    if (!account) {
      return { success: false, error: 'Invalid user ID' };
    }
    if (account.password !== password) {
      return { success: false, error: 'Invalid password' };
    }
    const userData = account.user;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setSelectedRole(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    const role = ROLES[user.role];
    return role?.permissions.includes(permission as any) || false;
  };

  const canAccessModule = (module: string): boolean => {
    if (!user) return false;
    const role = ROLES[user.role];
    return role?.dashboardModules.includes(module) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        selectedRole,
        setSelectedRole,
        hasPermission,
        canAccessModule,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
