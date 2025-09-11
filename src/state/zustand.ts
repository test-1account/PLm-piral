// Zustand store for lightweight state management
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { User } from '../auth/jwt';

// State interface (consistent with other state solutions)
export interface ZustandAppState {
  user: User | null;
  isLoading: boolean;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: ZustandNotification[];
}

export interface ZustandNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
}

// Actions interface
interface ZustandAppActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  addNotification: (notification: Omit<ZustandNotification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  resetState: () => void;
}

// Combined store type
type ZustandStore = ZustandAppState & ZustandAppActions;

// Initial state
const initialState: ZustandAppState = {
  user: null,
  isLoading: false,
  theme: 'light',
  sidebarOpen: true,
  notifications: [],
};

// Create Zustand store
export const useZustandStore = create<ZustandStore>()(
  devtools(
    subscribeWithSelector((set, _get) => ({
      // State
      ...initialState,

      // Actions
      setUser: (user) => set({ user }, false, 'setUser'),

      setLoading: (loading) => set({ isLoading: loading }, false, 'setLoading'),

      toggleTheme: () =>
        set(
          (state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }),
          false,
          'toggleTheme'
        ),

      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'toggleSidebar'),

      addNotification: (notification) =>
        set(
          (state) => ({
            notifications: [
              ...state.notifications,
              {
                ...notification,
                id: Date.now().toString(),
                timestamp: Date.now(),
              },
            ],
          }),
          false,
          'addNotification'
        ),

      removeNotification: (id) =>
        set(
          (state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }),
          false,
          'removeNotification'
        ),

      clearNotifications: () => set({ notifications: [] }, false, 'clearNotifications'),

      resetState: () => set(initialState, false, 'resetState'),
    })),
    {
      name: 'plm-app-store', // unique name for devtools
    }
  )
);

// Selectors for performance optimization
export const zustandSelectors = {
  user: (state: ZustandStore) => state.user,
  isLoading: (state: ZustandStore) => state.isLoading,
  theme: (state: ZustandStore) => state.theme,
  sidebarOpen: (state: ZustandStore) => state.sidebarOpen,
  notifications: (state: ZustandStore) => state.notifications,
  hasNotifications: (state: ZustandStore) => state.notifications.length > 0,
};

// Custom hooks for specific state slices
export const useUser = () => useZustandStore(zustandSelectors.user);
export const useTheme = () => useZustandStore(zustandSelectors.theme);
export const useNotifications = () => useZustandStore(zustandSelectors.notifications);
