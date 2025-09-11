// Document Control Microfrontend
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Document {
  id: string;
  title: string;
  documentNumber: string;
  revision: string;
  type: 'Drawing' | 'Specification' | 'Manual' | 'Report' | 'Certificate';
  status: 'Draft' | 'Under Review' | 'Approved' | 'Released' | 'Obsolete';
  author: string;
  approver?: string;
  createdDate: string;
  lastModified: string;
  fileSize: string;
  relatedProducts: string[];
}

// Mock data for demo
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Hydraulic Pump Assembly Drawing',
    documentNumber: 'DWG-HPA-001',
    revision: 'Rev C',
    type: 'Drawing',
    status: 'Released',
    author: 'John Smith',
    approver: 'Sarah Johnson',
    createdDate: '2024-01-15',
    lastModified: '2024-03-10',
    fileSize: '2.4 MB',
    relatedProducts: ['HPA-2024-001'],
  },
  {
    id: '2',
    title: 'Control System Technical Specification',
    documentNumber: 'SPEC-CS-002',
    revision: 'Rev B',
    type: 'Specification',
    status: 'Under Review',
    author: 'Mike Chen',
    createdDate: '2024-02-20',
    lastModified: '2024-09-05',
    fileSize: '1.8 MB',
    relatedProducts: ['CCB-2024-002'],
  },
  {
    id: '3',
    title: 'Safety Procedures Manual',
    documentNumber: 'MAN-SAF-003',
    revision: 'Rev A',
    type: 'Manual',
    status: 'Draft',
    author: 'Lisa Anderson',
    createdDate: '2024-08-01',
    lastModified: '2024-09-10',
    fileSize: '5.2 MB',
    relatedProducts: ['SV-2024-003'],
  },
  {
    id: '4',
    title: 'Quality Test Report',
    documentNumber: 'RPT-QT-004',
    revision: 'Rev A',
    type: 'Report',
    status: 'Approved',
    author: 'David Wilson',
    approver: 'Emily Brown',
    createdDate: '2024-07-15',
    lastModified: '2024-08-20',
    fileSize: '3.1 MB',
    relatedProducts: ['HPA-2024-001', 'CCB-2024-002'],
  },
];

export const DocumentControlMFE: React.FC = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: documents = mockDocuments, isLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: () => Promise.resolve(mockDocuments),
    staleTime: 5 * 60 * 1000,
  });

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || doc.type === filterType;
    const matchesStatus = filterStatus === 'All' || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'Released':
        return '#4caf50';
      case 'Approved':
        return '#8bc34a';
      case 'Under Review':
        return '#ff9800';
      case 'Draft':
        return '#2196f3';
      case 'Obsolete':
        return '#f44336';
      default:
        return '#9e9e9e';
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
      case 'Certificate':
        return '🏆';
      default:
        return '📄';
    }
  };

  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading documents...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Document Control</h2>

        {/* Search and Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            <option value="All">All Types</option>
            <option value="Drawing">Drawing</option>
            <option value="Specification">Specification</option>
            <option value="Manual">Manual</option>
            <option value="Report">Report</option>
            <option value="Certificate">Certificate</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            <option value="All">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Released">Released</option>
            <option value="Obsolete">Obsolete</option>
          </select>
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
            Upload Document
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
            Bulk Operations
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
            Document Register
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Document List */}
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
              Documents ({filteredDocuments.length})
            </div>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocument(doc)}
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    backgroundColor: selectedDocument?.id === doc.id ? '#e3f2fd' : 'transparent',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{getTypeIcon(doc.type)}</span>
                    <span style={{ fontWeight: 'bold' }}>{doc.title}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                    {doc.documentNumber} {doc.revision} • {doc.fileSize}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        background: getStatusColor(doc.status),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                      }}
                    >
                      {doc.status}
                    </span>
                    <span style={{ fontSize: '12px', color: '#666' }}>by {doc.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Document Details */}
        <div style={{ flex: 1 }}>
          {selectedDocument ? (
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{getTypeIcon(selectedDocument.type)}</span>
                Document Details
              </h3>

              <div style={{ marginBottom: '12px' }}>
                <strong>Title:</strong> {selectedDocument.title}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Document Number:</strong> {selectedDocument.documentNumber}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Revision:</strong> {selectedDocument.revision}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Type:</strong> {selectedDocument.type}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    background: getStatusColor(selectedDocument.status),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                >
                  {selectedDocument.status}
                </span>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Author:</strong> {selectedDocument.author}
              </div>
              {selectedDocument.approver && (
                <div style={{ marginBottom: '12px' }}>
                  <strong>Approver:</strong> {selectedDocument.approver}
                </div>
              )}
              <div style={{ marginBottom: '12px' }}>
                <strong>File Size:</strong> {selectedDocument.fileSize}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Created:</strong> {selectedDocument.createdDate}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Last Modified:</strong> {selectedDocument.lastModified}
              </div>
              <div style={{ marginBottom: '20px' }}>
                <strong>Related Products:</strong> {selectedDocument.relatedProducts.join(', ')}
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
                  Download
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
                  View Online
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
                  Edit Properties
                </button>
                <button
                  style={{
                    background: '#9c27b0',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Version History
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
              Select a document to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
