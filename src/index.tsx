// Entry point for the Piral microfrontend boilerplate
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Import microfrontends
import {
  ProductManagementMFE,
  DocumentControlMFE,
  ChangeManagementMFE,
  CollaborationMFE,
} from './microfrontends';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

type ActiveMFE = 'dashboard' | 'products' | 'documents' | 'changes' | 'collaboration';

const App: React.FC = () => {
  const [activeMFE, setActiveMFE] = useState<ActiveMFE>('dashboard');

  const renderMFE = () => {
    switch (activeMFE) {
      case 'products':
        return <ProductManagementMFE />;
      case 'documents':
        return <DocumentControlMFE />;
      case 'changes':
        return <ChangeManagementMFE />;
      case 'collaboration':
        return <CollaborationMFE />;
      default:
        return <PLMDashboard onNavigate={setActiveMFE} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Navigation Header */}
        <header
          style={{
            background: '#1976d2',
            color: 'white',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1 style={{ margin: 0, fontSize: '20px' }}>PLM System</h1>
          <nav style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => setActiveMFE('dashboard')}
              style={{
                background: activeMFE === 'dashboard' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveMFE('products')}
              style={{
                background: activeMFE === 'products' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Products
            </button>
            <button
              onClick={() => setActiveMFE('documents')}
              style={{
                background: activeMFE === 'documents' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveMFE('changes')}
              style={{
                background: activeMFE === 'changes' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Changes
            </button>
            <button
              onClick={() => setActiveMFE('collaboration')}
              style={{
                background: activeMFE === 'collaboration' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Projects
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main>{renderMFE()}</main>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

// Dashboard Component
interface PLMDashboardProps {
  onNavigate: (mfe: ActiveMFE) => void;
}

const PLMDashboard: React.FC<PLMDashboardProps> = ({ onNavigate }) => {
  return (
    <div style={{ padding: '20px' }}>
      <header
        style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}
      >
        <h1>PLM Dashboard</h1>
        <p>Welcome to the Product Lifecycle Management System</p>
        <span style={{ background: '#e3f2fd', padding: '4px 8px', borderRadius: '4px' }}>
          Role: Admin
        </span>
      </header>

      <div style={{ marginBottom: '30px' }}>
        <h2>Quick Stats</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              background: '#f3e5f5',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', color: '#7b1fa2' }}>123</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>Active Products</p>
          </div>
          <div
            style={{
              background: '#e8f5e8',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', color: '#388e3c' }}>456</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>Documents</p>
          </div>
          <div
            style={{
              background: '#fff3e0',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', color: '#f57c00' }}>78</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>Pending Changes</p>
          </div>
          <div
            style={{
              background: '#e3f2fd',
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>12</h3>
            <p style={{ margin: 0, fontSize: '14px' }}>Active Projects</p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px',
        }}
      >
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h3>Product Management</h3>
          <p>Manage product information, specifications, and lifecycle stages.</p>
          <button
            onClick={() => onNavigate('products')}
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            View Products
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h3>Document Control</h3>
          <p>Manage engineering documents, drawings, and specifications.</p>
          <button
            onClick={() => onNavigate('documents')}
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            View Documents
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h3>Change Management</h3>
          <p>Track and manage engineering change orders and approvals.</p>
          <button
            onClick={() => onNavigate('changes')}
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            View Changes
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h3>Project Collaboration</h3>
          <p>Team collaboration tools and project management.</p>
          <button
            onClick={() => onNavigate('collaboration')}
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            View Projects
          </button>
        </div>
      </div>

      <div
        style={{
          padding: '16px',
          background: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h3>Recent Activity</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Product XYZ-123 specifications updated</li>
          <li>Engineering change ECO-456 approved</li>
          <li>New document DOC-789 uploaded</li>
          <li>Project Alpha milestone completed</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
