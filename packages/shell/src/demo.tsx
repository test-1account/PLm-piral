import React, { useState } from 'react';
import { ProductManagementPage } from '../../product-management-mfe/src/ProductManagementPage';
import { DocumentControlPage } from '../../document-control-mfe/src/DocumentControlPage';

type ActiveMFE = 'dashboard' | 'products' | 'documents' | 'changes' | 'collaboration';

const PLMShell: React.FC = () => {
  const [activeMFE, setActiveMFE] = useState<ActiveMFE>('dashboard');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Shell Navigation Header */}
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
        <div>
          <h1 style={{ margin: 0, fontSize: '20px' }}>PLM System</h1>
          <p style={{ margin: 0, fontSize: '12px', opacity: 0.8 }}>Product Lifecycle Management</p>
        </div>
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

      {/* MFE Loading Area */}
      <main style={{ minHeight: 'calc(100vh - 64px)' }}>
        {activeMFE === 'dashboard' && (
          <div style={{ padding: '20px' }}>
            <div
              style={{
                background: '#e3f2fd',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            >
              <h2 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>
                🎯 PLM Microfrontend Architecture Demo
              </h2>
              <p style={{ margin: 0, color: '#1565c0' }}>
                Each module below is a separate microfrontend with its own package.json,
                dependencies, and build process.
              </p>
            </div>

            <h2>PLM Dashboard</h2>
            <p>Welcome to the Product Lifecycle Management System</p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginTop: '20px',
              }}
            >
              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>📦 Product Management MFE</h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
                  Independent package with product data management
                </p>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                  📁 packages/product-management-mfe/
                </div>
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
                  Open MFE
                </button>
              </div>

              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>📄 Document Control MFE</h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
                  Independent package with document management
                </p>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                  📁 packages/document-control-mfe/
                </div>
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
                  Open MFE
                </button>
              </div>

              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#999' }}>🔄 Change Management MFE</h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
                  Package structure created, implementation pending
                </p>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                  📁 packages/change-management-mfe/
                </div>
                <button
                  style={{
                    background: '#ccc',
                    color: '#666',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'not-allowed',
                  }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>

              <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', color: '#999' }}>👥 Collaboration MFE</h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
                  Package structure created, implementation pending
                </p>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>
                  📁 packages/collaboration-mfe/
                </div>
                <button
                  style={{
                    background: '#ccc',
                    color: '#666',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'not-allowed',
                  }}
                  disabled
                >
                  Coming Soon
                </button>
              </div>
            </div>

            <div
              style={{
                marginTop: '30px',
                padding: '16px',
                background: '#f5f5f5',
                borderRadius: '8px',
              }}
            >
              <h3>Architecture Benefits Demonstrated:</h3>
              <ul>
                <li>✅ Each MFE has its own package.json and dependencies</li>
                <li>✅ Independent build and deployment processes</li>
                <li>✅ Teams can work on different MFEs simultaneously</li>
                <li>✅ Technology flexibility per domain</li>
                <li>✅ Gradual migration and modernization possible</li>
              </ul>
            </div>
          </div>
        )}

        {activeMFE === 'products' && (
          <div>
            <div
              style={{
                background: '#e8f5e8',
                padding: '12px 20px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <span style={{ fontSize: '14px', color: '#2e7d32' }}>
                🎯 Loading: Product Management MFE (packages/product-management-mfe/)
              </span>
            </div>
            <ProductManagementPage />
          </div>
        )}

        {activeMFE === 'documents' && (
          <div>
            <div
              style={{
                background: '#fff3e0',
                padding: '12px 20px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <span style={{ fontSize: '14px', color: '#f57c00' }}>
                🎯 Loading: Document Control MFE (packages/document-control-mfe/)
              </span>
            </div>
            <DocumentControlPage />
          </div>
        )}

        {(activeMFE === 'changes' || activeMFE === 'collaboration') && (
          <div style={{ padding: '20px' }}>
            <div
              style={{
                background: '#f3e5f5',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', color: '#7b1fa2' }}>
                🚧 {activeMFE.charAt(0).toUpperCase() + activeMFE.slice(1)} MFE - Under Development
              </h3>
              <p style={{ margin: 0, color: '#8e24aa' }}>
                Package structure exists at packages/{activeMFE}-mfe/ but implementation is pending.
              </p>
            </div>

            <h2>{activeMFE.charAt(0).toUpperCase() + activeMFE.slice(1)} Module</h2>
            <p>This microfrontend package is ready for development.</p>

            <div
              style={{
                background: '#f0f0f0',
                padding: '16px',
                borderRadius: '8px',
                marginTop: '20px',
              }}
            >
              <h4>Package Structure Created:</h4>
              <pre
                style={{
                  background: '#fff',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                {`packages/${activeMFE}-mfe/
├── package.json          # ✅ Created
├── tsconfig.json         # ⏳ Pending
└── src/
    ├── index.ts          # ⏳ Pending - MFE registration
    └── ${
      activeMFE.charAt(0).toUpperCase() + activeMFE.slice(1)
    }Page.tsx  # ⏳ Pending - Main component`}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PLMShell;
