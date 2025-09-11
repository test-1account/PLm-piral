// React Context for global state management
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User } from '../auth/jwt';

// State interface
export interface AppState {
  user: User | null;
  isLoading: boolean;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
}

// Notification interface
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
}

// Action types
export type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_THEME' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

// Initial state
const initialState: AppState = {
  user: null,
  isLoading: false,
  theme: 'light',
  sidebarOpen: true,
  notifications: [],
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
            id: Date.now().toString(),
            timestamp: Date.now(),
          },
        ],
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Action creators (helper functions)
export const appActions = {
  setUser: (user: User | null): AppAction => ({ type: 'SET_USER', payload: user }),
  setLoading: (loading: boolean): AppAction => ({ type: 'SET_LOADING', payload: loading }),
  toggleTheme: (): AppAction => ({ type: 'TOGGLE_THEME' }),
  toggleSidebar: (): AppAction => ({ type: 'TOGGLE_SIDEBAR' }),
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>): AppAction => ({
    type: 'ADD_NOTIFICATION',
    payload: notification,
  }),
  removeNotification: (id: string): AppAction => ({ type: 'REMOVE_NOTIFICATION', payload: id }),
  clearNotifications: (): AppAction => ({ type: 'CLEAR_NOTIFICATIONS' }),
};
