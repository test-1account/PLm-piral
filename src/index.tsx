import React, { useState } from 'react';

type ActiveMFE = 'dashboard' | 'products' | 'documents' | 'changes' | 'collaboration';

const App: React.FC = () => {
  const [activeMFE, setActiveMFE] = useState<ActiveMFE>('dashboard');

  return (
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
      <main>
        {activeMFE === 'dashboard' ? (
          <div style={{ padding: '20px' }}>
            <h2>PLM Dashboard</h2>
            <p>Welcome to the Product Lifecycle Management System</p>
            <div style={{ marginTop: '20px' }}>
              <h3>Quick Stats</h3>
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

            <div style={{ marginTop: '30px' }}>
              <h3>Module Access</h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '20px',
                }}
              >
                <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
                  <h4>Product Management</h4>
                  <p>Manage product information, specifications, and lifecycle stages.</p>
                  <button
                    onClick={() => setActiveMFE('products')}
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
                  <h4>Document Control</h4>
                  <p>Manage engineering documents, drawings, and specifications.</p>
                  <button
                    onClick={() => setActiveMFE('documents')}
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
                  <h4>Change Management</h4>
                  <p>Track and manage engineering change orders and approvals.</p>
                  <button
                    onClick={() => setActiveMFE('changes')}
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
                  <h4>Project Collaboration</h4>
                  <p>Team collaboration tools and project management.</p>
                  <button
                    onClick={() => setActiveMFE('collaboration')}
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
            </div>
          </div>
        ) : (
          <div style={{ padding: '20px' }}>
            <h2>{activeMFE.charAt(0).toUpperCase() + activeMFE.slice(1)} Module</h2>
            <p>This is the {activeMFE} microfrontend.</p>
            <div
              style={{
                background: '#f0f0f0',
                padding: '16px',
                borderRadius: '8px',
                marginTop: '20px',
              }}
            >
              <h3>Coming Soon</h3>
              <p>The full {activeMFE} microfrontend functionality will be restored here.</p>
              <p>This simplified version demonstrates the navigation and basic structure.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
