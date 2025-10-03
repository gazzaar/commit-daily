import React, { createContext, useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User } from '../types';
import { API_URL } from '../config';

type AuthContextType = {
  user: User | null | undefined;
  login: ReturnType<typeof useMutation<{ user: User }, Error, { email: string; password: string }>>;
  register: ReturnType<
    typeof useMutation<unknown, Error, { fullName: string; email: string; password: string }>
  >;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  // validate token is now just "get user from server using cookie"
  const { data: user, isLoading } = useQuery<User | null, Error>({
    queryKey: ['validateToken'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/auth`, {
        method: 'GET',
        credentials: 'include', // send cookies
      });

      if (response.status === 401) {
        return null;
      }

      if (!response.ok) {
        throw new Error('Failed to validate session');
      }

      const data = await response.json();
      return data as User;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const isAuthenticated = !!user;

  const login = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await fetch(`${API_URL}/auth/log-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // cookie will be set here by server
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    },

    onSuccess: (data) => {
      if (data.user) {
        queryClient.setQueryData(['validateToken'], data.user);
      } else {
        queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      }
    },
  });

  const register = useMutation({
    mutationFn: async ({
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    }) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['validateToken'] });
    },
  });

  const logout = async () => {
    await fetch(`${API_URL}/auth/log-out`, {
      method: 'POST',
      credentials: 'include',
    });
    queryClient.setQueryData(['validateToken'], null);
    queryClient.invalidateQueries({ queryKey: ['validateToken'] });
    queryClient.removeQueries({ queryKey: ['habits'] });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
