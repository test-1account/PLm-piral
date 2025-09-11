// Product Management Microfrontend
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../api/queryClient';

interface Product {
  id: string;
  name: string;
  partNumber: string;
  version: string;
  status: 'Draft' | 'In Review' | 'Released' | 'Obsolete';
  category: string;
  description: string;
  createdDate: string;
  modifiedDate: string;
}

// Mock data for demo
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Hydraulic Pump Assembly',
    partNumber: 'HPA-2024-001',
    version: '1.2',
    status: 'Released',
    category: 'Mechanical',
    description: 'High-pressure hydraulic pump for industrial applications',
    createdDate: '2024-01-15',
    modifiedDate: '2024-03-10',
  },
  {
    id: '2',
    name: 'Control Circuit Board',
    partNumber: 'CCB-2024-002',
    version: '2.1',
    status: 'In Review',
    category: 'Electronics',
    description: 'Main control board for system automation',
    createdDate: '2024-02-20',
    modifiedDate: '2024-09-05',
  },
  {
    id: '3',
    name: 'Safety Valve',
    partNumber: 'SV-2024-003',
    version: '1.0',
    status: 'Draft',
    category: 'Safety',
    description: 'Emergency safety valve with pressure relief',
    createdDate: '2024-08-01',
    modifiedDate: '2024-09-10',
  },
];

export const ProductManagementMFE: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // In a real app, this would fetch from API
  const { data: products = mockProducts, isLoading } = useQuery({
    queryKey: queryKeys.products,
    queryFn: () => Promise.resolve(mockProducts),
    staleTime: 5 * 60 * 1000,
  });

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.partNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'Released':
        return '#4caf50';
      case 'In Review':
        return '#ff9800';
      case 'Draft':
        return '#2196f3';
      case 'Obsolete':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading products...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Product Management</h2>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search products by name or part number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '300px',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>
        <button
          style={{
            background: '#1976d2',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px',
          }}
        >
          Add New Product
        </button>
        <button
          style={{
            background: '#388e3c',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Export to Excel
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Product List */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#f5f5f5',
                padding: '12px',
                fontWeight: 'bold',
                borderBottom: '1px solid #ddd',
              }}
            >
              Products ({filteredProducts.length})
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    backgroundColor: selectedProduct?.id === product.id ? '#e3f2fd' : 'transparent',
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{product.name}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                    {product.partNumber} v{product.version}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        background: getStatusColor(product.status),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                      }}
                    >
                      {product.status}
                    </span>
                    <span style={{ fontSize: '12px', color: '#666' }}>{product.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div style={{ flex: 1 }}>
          {selectedProduct ? (
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <h3 style={{ marginTop: 0 }}>Product Details</h3>
              <div style={{ marginBottom: '12px' }}>
                <strong>Name:</strong> {selectedProduct.name}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Part Number:</strong> {selectedProduct.partNumber}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Version:</strong> {selectedProduct.version}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    background: getStatusColor(selectedProduct.status),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                >
                  {selectedProduct.status}
                </span>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Category:</strong> {selectedProduct.category}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Description:</strong> {selectedProduct.description}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Created:</strong> {selectedProduct.createdDate}
              </div>
              <div style={{ marginBottom: '20px' }}>
                <strong>Modified:</strong> {selectedProduct.modifiedDate}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  style={{
                    background: '#1976d2',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>
                <button
                  style={{
                    background: '#388e3c',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Version History
                </button>
                <button
                  style={{
                    background: '#f57c00',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Download BOM
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                color: '#666',
              }}
            >
              Select a product to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
