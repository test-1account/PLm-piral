import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  version: string;
  status: 'Development' | 'Testing' | 'Production' | 'Discontinued';
  category: string;
  description: string;
  createdDate: string;
  lastModified: string;
}

const mockProducts: Product[] = [
  {
    id: 'PRD-001',
    name: 'V8 Engine Assembly',
    version: 'v2.1',
    status: 'Production',
    category: 'Automotive',
    description: 'Performance engine assembly for luxury vehicles',
    createdDate: '2025-01-15',
    lastModified: '2025-09-10',
  },
  {
    id: 'PRD-002',
    name: 'Electric Drive Unit',
    version: 'v1.0',
    status: 'Testing',
    category: 'Electronics',
    description: 'Integrated motor and gearbox for electric vehicles',
    createdDate: '2025-03-20',
    lastModified: '2025-09-11',
  },
  {
    id: 'PRD-003',
    name: 'Carbon Fiber Chassis',
    version: 'v3.2',
    status: 'Development',
    category: 'Materials',
    description: 'Lightweight chassis component for racing applications',
    createdDate: '2025-02-10',
    lastModified: '2025-09-12',
  },
];

export const ProductManagementPage: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<string>('');

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.category.toLowerCase().includes(filter.toLowerCase())
  );

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'Production':
        return '#4caf50';
      case 'Testing':
        return '#ff9800';
      case 'Development':
        return '#2196f3';
      case 'Discontinued':
        return '#f44336';
      default:
        return '#666';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0, color: '#1976d2' }}>Product Management</h1>
        <button
          style={{
            background: '#1976d2',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          + New Product
        </button>
      </div>

      {/* Search and Filter */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            width: '300px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: selectedProduct ? '1fr 400px' : '1fr',
          gap: '20px',
        }}
      >
        {/* Products List */}
        <div>
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
              <h2 style={{ margin: 0, fontSize: '18px' }}>Products ({filteredProducts.length})</h2>
            </div>
            <div style={{ maxHeight: '600px', overflow: 'auto' }}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #f0f0f0',
                    cursor: 'pointer',
                    backgroundColor: selectedProduct?.id === product.id ? '#f5f5f5' : 'white',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedProduct?.id !== product.id) {
                      e.currentTarget.style.backgroundColor = '#f9f9f9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedProduct?.id !== product.id) {
                      e.currentTarget.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#333' }}>
                        {product.name}
                      </h3>
                      <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                        {product.description}
                      </p>
                      <div
                        style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#888' }}
                      >
                        <span>ID: {product.id}</span>
                        <span>Version: {product.version}</span>
                        <span>Category: {product.category}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          background: getStatusColor(product.status),
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 500,
                        }}
                      >
                        {product.status}
                      </span>
                      <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                        Modified: {new Date(product.lastModified).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Panel */}
        {selectedProduct && (
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              height: 'fit-content',
            }}
          >
            <div
              style={{
                padding: '20px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2 style={{ margin: 0, fontSize: '18px' }}>Product Details</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: '#666',
                }}
              >
                ×
              </button>
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#333' }}>
                  {selectedProduct.name}
                </h3>
                <span
                  style={{
                    background: getStatusColor(selectedProduct.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '14px',
                  }}
                >
                  {selectedProduct.status}
                </span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    color: '#666',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                  }}
                >
                  Description
                </h4>
                <p style={{ margin: 0, lineHeight: '1.5' }}>{selectedProduct.description}</p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>
                    Product ID
                  </h4>
                  <p style={{ margin: 0, fontWeight: 500 }}>{selectedProduct.id}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Version</h4>
                  <p style={{ margin: 0, fontWeight: 500 }}>{selectedProduct.version}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Category</h4>
                  <p style={{ margin: 0, fontWeight: 500 }}>{selectedProduct.category}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Created</h4>
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    {new Date(selectedProduct.createdDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  style={{
                    flex: 1,
                    background: '#1976d2',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Edit Product
                </button>
                <button
                  style={{
                    flex: 1,
                    background: 'white',
                    color: '#666',
                    border: '1px solid #ddd',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  View History
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
