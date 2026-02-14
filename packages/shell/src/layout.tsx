import * as React from 'react';

// Define our own interface since we're not using full Piral yet
interface LayoutProps {
  children: React.ReactNode;
}

interface ErrorProps {
  type?: string;
}

export const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      {/* PLM Shell Header */}
      <header
        style={{
          background: '#1976d2',
          color: 'white',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '20px' }}>PLM System</h1>
        <nav style={{ display: 'flex', gap: '16px' }}>
          <a
            href="/dashboard"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            Dashboard
          </a>
          <a
            href="/products"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            Products
          </a>
          <a
            href="/documents"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            Documents
          </a>
          <a
            href="/changes"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            Changes
          </a>
          <a
            href="/collaboration"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            Projects
          </a>
        </nav>
      </header>

      {/* Main Content Area - Where MFEs will be loaded */}
      <main style={{ padding: '20px', minHeight: 'calc(100vh - 64px)' }}>{children}</main>
    </div>
  );
};

export const errors: React.FC<ErrorProps> = ({ type }) => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Something went wrong</h2>
      <p>Please try refreshing the page or contact support if the problem persists.</p>
    </div>
  );
};
