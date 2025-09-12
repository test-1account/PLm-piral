import React, { useState } from 'react';

interface Document {
  id: string;
  title: string;
  version: string;
  type: 'Drawing' | 'Specification' | 'Manual' | 'Report';
  status: 'Draft' | 'Under Review' | 'Approved' | 'Obsolete';
  author: string;
  createdDate: string;
  lastModified: string;
  description: string;
}

const mockDocuments: Document[] = [
  {
    id: 'DOC-001',
    title: 'V8 Engine Assembly Drawing',
    version: 'Rev C',
    type: 'Drawing',
    status: 'Approved',
    author: 'John Smith',
    createdDate: '2025-01-10',
    lastModified: '2025-09-05',
    description: 'Technical drawing for V8 engine assembly components',
  },
  {
    id: 'DOC-002',
    title: 'Material Specifications',
    version: 'Rev A',
    type: 'Specification',
    status: 'Under Review',
    author: 'Sarah Johnson',
    createdDate: '2025-03-15',
    lastModified: '2025-09-10',
    description: 'Material specifications for carbon fiber components',
  },
  {
    id: 'DOC-003',
    title: 'QC Procedures Manual',
    version: 'Rev B',
    type: 'Manual',
    status: 'Approved',
    author: 'Mike Wilson',
    createdDate: '2025-02-20',
    lastModified: '2025-08-30',
    description: 'Comprehensive quality control procedures and guidelines',
  },
];

export const DocumentControlPage: React.FC = () => {
  const [documents] = useState<Document[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(filter.toLowerCase()) ||
      doc.author.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus = statusFilter === '' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'Approved':
        return '#4caf50';
      case 'Under Review':
        return '#ff9800';
      case 'Draft':
        return '#2196f3';
      case 'Obsolete':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const getTypeIcon = (type: Document['type']) => {
    switch (type) {
      case 'Drawing':
        return '📐';
      case 'Specification':
        return '📋';
      case 'Manual':
        return '📖';
      case 'Report':
        return '📊';
      default:
        return '📄';
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ margin: 0, color: '#1976d2' }}>Document Control</h1>
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
          + Upload Document
        </button>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search documents..."
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            minWidth: '150px',
          }}
        >
          <option value="">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Under Review">Under Review</option>
          <option value="Approved">Approved</option>
          <option value="Obsolete">Obsolete</option>
        </select>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: selectedDocument ? '1fr 400px' : '1fr',
          gap: '20px',
        }}
      >
        {/* Documents List */}
        <div
          style={{
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Documents ({filteredDocuments.length})</h2>
          </div>
          <div style={{ maxHeight: '600px', overflow: 'auto' }}>
            {filteredDocuments.map((document) => (
              <div
                key={document.id}
                onClick={() => setSelectedDocument(document)}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer',
                  backgroundColor: selectedDocument?.id === document.id ? '#f5f5f5' : 'white',
                }}
                onMouseEnter={(e) => {
                  if (selectedDocument?.id !== document.id) {
                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedDocument?.id !== document.id) {
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
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px',
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>{getTypeIcon(document.type)}</span>
                      <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>
                        {document.title}
                      </h3>
                    </div>
                    <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                      {document.description}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#888' }}>
                      <span>ID: {document.id}</span>
                      <span>Version: {document.version}</span>
                      <span>Author: {document.author}</span>
                      <span>Type: {document.type}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        background: getStatusColor(document.status),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 500,
                      }}
                    >
                      {document.status}
                    </span>
                    <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
                      Modified: {new Date(document.lastModified).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document Details Panel */}
        {selectedDocument && (
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
              <h2 style={{ margin: 0, fontSize: '18px' }}>Document Details</h2>
              <button
                onClick={() => setSelectedDocument(null)}
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
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}
                >
                  <span style={{ fontSize: '24px' }}>{getTypeIcon(selectedDocument.type)}</span>
                  <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>
                    {selectedDocument.title}
                  </h3>
                </div>
                <span
                  style={{
                    background: getStatusColor(selectedDocument.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '16px',
                    fontSize: '14px',
                  }}
                >
                  {selectedDocument.status}
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
                <p style={{ margin: 0, lineHeight: '1.5' }}>{selectedDocument.description}</p>
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
                    Document ID
                  </h4>
                  <p style={{ margin: 0, fontWeight: 500 }}>{selectedDocument.id}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Version</h4>
                  <p style={{ margin: 0, fontWeight: 500 }}>{selectedDocument.version}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Type</h4>
                  <p style={{ margin: 0, fontWeight: 500 }}>{selectedDocument.type}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Author</h4>
                  <p style={{ margin: 0, fontWeight: 500 }}>{selectedDocument.author}</p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>Created</h4>
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    {new Date(selectedDocument.createdDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>
                    Last Modified
                  </h4>
                  <p style={{ margin: 0, fontWeight: 500 }}>
                    {new Date(selectedDocument.lastModified).toLocaleDateString()}
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
                  Download
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
