import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {
        id: 'usr-admin-1',
        email: 'admin@silvex-outdoor.com',
        firstName: 'Alexander',
        lastName: 'Vance',
        phone: '+1 (555) 234-5678',
        role: 'SUPER_ADMIN',
        isActive: true,
        createdAt: '2026-01-01T00:00:00Z',
      },
      token: 'mock-jwt-silvex-superadmin-token-2026',
      isAuthenticated: true,
      isAdmin: true,

      login: (user, token) => {
        const isAdminRole = ['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(user.role);
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: isAdminRole,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
        });
      },

      updateProfile: (updated) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updated } : null,
        }));
      },
    }),
    {
      name: 'silvex-auth-v1',
    }
  )
);
