import React, { useState } from 'react';
import { Button, Card, Badge } from '@plm/design-system';

interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'pending' | 'in-review' | 'approved' | 'rejected' | 'implemented';
  type: 'ECO' | 'PCN' | 'DCN';
  priority: 'low' | 'medium' | 'high' | 'critical';
  initiator: string;
  createdDate: string;
  affectedItems: string[];
  approvalStage: number;
  totalStages: number;
}

const mockChangeRequests: ChangeRequest[] = [
  {
    id: 'ECO-001',
    title: 'Update Material Specification for Engine Component',
    description: 'Change material from Aluminum 6061 to 7075 for improved strength',
    status: 'in-review',
    type: 'ECO',
    priority: 'high',
    initiator: 'John Smith',
    createdDate: '2024-01-15',
    affectedItems: ['ENG-123', 'ENG-456'],
    approvalStage: 2,
    totalStages: 4
  },
  {
    id: 'PCN-002',
    title: 'Supplier Change Notification',
    description: 'Primary supplier change for electronic components due to EOL',
    status: 'pending',
    type: 'PCN',
    priority: 'critical',
    initiator: 'Sarah Johnson',
    createdDate: '2024-01-14',
    affectedItems: ['ELEC-789'],
    approvalStage: 1,
    totalStages: 3
  },
  {
    id: 'DCN-003',
    title: 'Design Change for Safety Requirements',
    description: 'Modify housing design to meet updated safety standards',
    status: 'approved',
    type: 'DCN',
    priority: 'medium',
    initiator: 'Mike Davis',
    createdDate: '2024-01-10',
    affectedItems: ['HOUS-101', 'HOUS-102'],
    approvalStage: 4,
    totalStages: 4
  },
  {
    id: 'ECO-004',
    title: 'Cost Reduction Initiative',
    description: 'Optimize manufacturing process to reduce production costs',
    status: 'draft',
    type: 'ECO',
    priority: 'low',
    initiator: 'Lisa Anderson',
    createdDate: '2024-01-12',
    affectedItems: ['PROC-201'],
    approvalStage: 0,
    totalStages: 4
  }
];

function ChangeManagementPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredRequests = mockChangeRequests.filter(request => {
    if (selectedStatus !== 'all' && request.status !== selectedStatus) return false;
    if (selectedType !== 'all' && request.type !== selectedType) return false;
    return true;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'draft': return 'default';
      case 'pending': return 'warning';
      case 'in-review': return 'info';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      case 'implemented': return 'success';
      default: return 'default';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'low': return 'default';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '600', 
          marginBottom: '8px',
          color: '#1a1a1a'
        }}>
          Change Management
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#666',
          marginBottom: '24px'
        }}>
          Manage Engineering Change Orders (ECO), Process Change Notifications (PCN), and Design Change Notices (DCN)
        </p>

        {/* Action Bar */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '24px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <Button variant="primary">
            + New Change Request
          </Button>
          <Button variant="secondary">
            Import from CAD
          </Button>
          <Button variant="outline">
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '24px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '4px', 
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Status
            </label>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="in-review">In Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="implemented">Implemented</option>
            </select>
          </div>
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '4px', 
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Type
            </label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Types</option>
              <option value="ECO">ECO</option>
              <option value="PCN">PCN</option>
              <option value="DCN">DCN</option>
            </select>
          </div>
        </div>
      </div>

      {/* Change Requests Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
        gap: '20px' 
      }}>
        {filteredRequests.map((request) => (
          <Card key={request.id} variant="elevated">
            <div style={{ padding: '20px' }}>
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '16px'
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    margin: '0 0 4px 0',
                    color: '#1a1a1a'
                  }}>
                    {request.id}
                  </h3>
                  <p style={{ 
                    fontSize: '16px', 
                    margin: '0',
                    color: '#333',
                    fontWeight: '500'
                  }}>
                    {request.title}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                  <Badge variant={getStatusBadgeVariant(request.status)}>
                    {request.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <Badge variant={getPriorityBadgeVariant(request.priority)}>
                    {request.priority.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <p style={{ 
                fontSize: '14px', 
                color: '#666',
                marginBottom: '16px',
                lineHeight: '1.5'
              }}>
                {request.description}
              </p>

              {/* Metadata */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                <div>
                  <span style={{ fontWeight: '500', color: '#333' }}>Type:</span>
                  <span style={{ marginLeft: '8px', color: '#666' }}>{request.type}</span>
                </div>
                <div>
                  <span style={{ fontWeight: '500', color: '#333' }}>Initiator:</span>
                  <span style={{ marginLeft: '8px', color: '#666' }}>{request.initiator}</span>
                </div>
                <div>
                  <span style={{ fontWeight: '500', color: '#333' }}>Created:</span>
                  <span style={{ marginLeft: '8px', color: '#666' }}>{request.createdDate}</span>
                </div>
                <div>
                  <span style={{ fontWeight: '500', color: '#333' }}>Items:</span>
                  <span style={{ marginLeft: '8px', color: '#666' }}>{request.affectedItems.length}</span>
                </div>
              </div>

              {/* Approval Progress */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                    Approval Progress
                  </span>
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    {request.approvalStage}/{request.totalStages}
                  </span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '8px', 
                  backgroundColor: '#f3f4f6',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: `${(request.approvalStage / request.totalStages) * 100}%`,
                    height: '100%',
                    backgroundColor: request.status === 'approved' ? '#10b981' : '#3b82f6',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Actions */}
              <div style={{ 
                display: 'flex', 
                gap: '8px',
                justifyContent: 'flex-end'
              }}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {request.status === 'pending' && (
                  <Button variant="primary" size="sm">
                    Review
                  </Button>
                )}
                {request.status === 'draft' && (
                  <Button variant="primary" size="sm">
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#666'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No change requests found</h3>
          <p>Try adjusting your filters or create a new change request.</p>
        </div>
      )}
    </div>
  );
}

export default ChangeManagementPage;
