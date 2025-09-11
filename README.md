# PLM Piral Microfrontend Boilerplate

A comprehensive boilerplate for building PLM (Product Lifecycle Management) microfrontends using Piral framework with React and TypeScript.

## 🚀 Features

### Core Technologies

- **Piral** - Microfrontend framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **JWT Authentication** - Secure user authentication
- **React Query** - Data fetching and caching

### State Management Options

Choose your preferred state management solution:

- **React Context** - Built-in React state management
- **Redux Toolkit** - Predictable state container
- **Zustand** - Lightweight state management

### Code Quality & Testing

- **ESLint** - Code linting with TypeScript and React rules
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **Coverage reporting** - 70% threshold for all metrics

## 📁 Project Structure

```
plm-piral/
├── src/
│   ├── auth/
│   │   ├── jwt.ts          # JWT utilities
│   │   └── jwt.test.ts     # JWT tests
│   ├── api/
│   │   └── queryClient.ts  # React Query setup
│   ├── state/
│   │   ├── context.tsx     # React Context
│   │   ├── redux.ts        # Redux Toolkit
│   │   └── zustand.ts      # Zustand store
│   ├── components/         # Reusable components
│   ├── index.tsx          # Entry point
│   └── setupTests.ts      # Test configuration
├── .eslintrc.json         # ESLint configuration
├── .prettierrc           # Prettier configuration
├── jest.config.js        # Jest configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🛠️ Available Scripts

```bash
# Testing
npm test              # Run tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint          # Lint code
npm run lint:fix      # Fix linting issues
npm run format        # Format code
npm run format:check  # Check formatting
npm run type-check    # Check TypeScript types
npm run quality       # Run all quality checks

# Development
npm start            # Start development server (when Piral is set up)
npm run build        # Build for production (when Piral is set up)
```

## 🔧 Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up Piral (if not already done):**

   ```bash
   npm install -g piral-cli
   piral new my-piral-shell --target react
   ```

3. **Run quality checks:**
   ```bash
   npm run quality
   ```

## 🏗️ State Management Usage

### React Context

```typescript
import { AppProvider, useAppContext } from '@/state/context';

// Wrap your app
<AppProvider>
  <App />
</AppProvider>

// Use in components
const { state, dispatch } = useAppContext();
```

### Redux Toolkit

```typescript
import { Provider } from 'react-redux';
import { reduxStore, useAppSelector, useAppDispatch } from '@/state/redux';

// Wrap your app
<Provider store={reduxStore}>
  <App />
</Provider>

// Use in components
const user = useAppSelector(state => state.app.user);
const dispatch = useAppDispatch();
```

### Zustand

```typescript
import { useZustandStore, useUser } from '@/state/zustand';

// Use in components
const { user, setUser } = useZustandStore();
// Or use specific selectors
const user = useUser();
```

## 🔐 Authentication

JWT authentication utilities are provided in `src/auth/jwt.ts`:

```typescript
import { setToken, getCurrentUser, hasRole } from '@/auth/jwt';

// Set token after login
setToken(authToken);

// Get current user
const user = getCurrentUser();

// Check user roles
const isAdmin = hasRole('admin');
```

## 📊 API Integration

React Query is configured for data fetching:

```typescript
import { useQuery } from '@tanstack/react-query';
import { apiRequest, queryKeys } from '@/api/queryClient';

// Use in components
const { data, isLoading } = useQuery({
  queryKey: queryKeys.users,
  queryFn: () => apiRequest('/users'),
});
```

## 🧪 Testing

Comprehensive testing setup with mocks for localStorage and common browser APIs:

```typescript
// Example test
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

test('renders component', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

## 📝 Environment Variables

Create a `.env` file for environment-specific configuration:

```
REACT_APP_API_URL=http://localhost:3001/api
```

## 🤝 Contributing

1. Follow the established code style (ESLint + Prettier)
2. Write tests for new features
3. Ensure all quality checks pass: `npm run quality`
4. Use conventional commit messages

## 📄 License

MIT License - see LICENSE file for details.
