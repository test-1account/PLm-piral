// Redux store setup using Redux Toolkit
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../auth/jwt';

// State interface (same as Context for consistency)
export interface ReduxAppState {
  user: User | null;
  isLoading: boolean;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: ReduxNotification[];
}

export interface ReduxNotification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
}

// Initial state
const initialState: ReduxAppState = {
  user: null,
  isLoading: false,
  theme: 'light',
  sidebarOpen: true,
  notifications: [],
};

// App slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (
      state,
      action: PayloadAction<Omit<ReduxNotification, 'id' | 'timestamp'>>
    ) => {
      state.notifications.push({
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

// Export actions
export const {
  setUser,
  setLoading,
  toggleTheme,
  toggleSidebar,
  addNotification,
  removeNotification,
  clearNotifications,
} = appSlice.actions;

// Configure store
export const reduxStore = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

// Typed hooks for Redux
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
