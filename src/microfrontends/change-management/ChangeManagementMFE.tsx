// Change Management Microfrontend
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface ChangeRequest {
  id: string;
  title: string;
  changeNumber: string;
  type: 'Engineering Change' | 'Product Change' | 'Process Change' | 'Documentation Change';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Submitted' | 'Under Review' | 'Approved' | 'Rejected' | 'Implemented' | 'Closed';
  initiator: string;
  assignee: string;
  description: string;
  justification: string;
  impactAssessment: string;
  affectedProducts: string[];
  submittedDate: string;
  targetDate: string;
  actualDate?: string;
  estimatedCost: number;
  actualCost?: number;
}

// Mock data for demo
const mockChangeRequests: ChangeRequest[] = [
  {
    id: '1',
    title: 'Update Hydraulic Pump Material Specification',
    changeNumber: 'ECO-2024-001',
    type: 'Engineering Change',
    priority: 'High',
    status: 'Under Review',
    initiator: 'John Smith',
    assignee: 'Sarah Johnson',
    description:
      'Change pump housing material from aluminum to stainless steel for better corrosion resistance',
    justification: 'Field reports indicate corrosion issues in marine environments',
    impactAssessment:
      'Material cost increase ~15%, but improved reliability and extended service life',
    affectedProducts: ['HPA-2024-001'],
    submittedDate: '2024-09-01',
    targetDate: '2024-10-15',
    estimatedCost: 15000,
  },
  {
    id: '2',
    title: 'Control Board Firmware Update',
    changeNumber: 'ECO-2024-002',
    type: 'Engineering Change',
    priority: 'Medium',
    status: 'Approved',
    initiator: 'Mike Chen',
    assignee: 'Lisa Anderson',
    description: 'Update control board firmware to version 2.1 with enhanced safety features',
    justification: 'Compliance with new safety regulations and improved diagnostics',
    impactAssessment: 'No hardware changes required, software update only',
    affectedProducts: ['CCB-2024-002'],
    submittedDate: '2024-08-15',
    targetDate: '2024-09-30',
    actualDate: '2024-09-20',
    estimatedCost: 5000,
    actualCost: 4500,
  },
  {
    id: '3',
    title: 'Safety Valve Pressure Rating Change',
    changeNumber: 'ECO-2024-003',
    type: 'Product Change',
    priority: 'Critical',
    status: 'Implemented',
    initiator: 'David Wilson',
    assignee: 'Emily Brown',
    description: 'Increase safety valve pressure rating from 150 PSI to 200 PSI',
    justification: 'Customer requirement for higher operating pressures',
    impactAssessment: 'Requires new valve body design and testing validation',
    affectedProducts: ['SV-2024-003'],
    submittedDate: '2024-07-01',
    targetDate: '2024-08-31',
    actualDate: '2024-08-25',
    estimatedCost: 25000,
    actualCost: 23500,
  },
  {
    id: '4',
    title: 'Update Installation Manual',
    changeNumber: 'DCO-2024-001',
    type: 'Documentation Change',
    priority: 'Low',
    status: 'Closed',
    initiator: 'Lisa Anderson',
    assignee: 'Mike Chen',
    description: 'Update installation manual with new torque specifications',
    justification: 'Recent changes to bolt specifications require updated documentation',
    impactAssessment: 'Documentation update only, no product impact',
    affectedProducts: ['HPA-2024-001', 'SV-2024-003'],
    submittedDate: '2024-06-15',
    targetDate: '2024-07-15',
    actualDate: '2024-07-10',
    estimatedCost: 1000,
    actualCost: 800,
  },
];

export const ChangeManagementMFE: React.FC = () => {
  const [selectedChange, setSelectedChange] = useState<ChangeRequest | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: changeRequests = mockChangeRequests, isLoading } = useQuery({
    queryKey: ['changeRequests'],
    queryFn: () => Promise.resolve(mockChangeRequests),
    staleTime: 5 * 60 * 1000,
  });

  const filteredChanges = changeRequests.filter((change) => {
    const matchesSearch =
      change.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      change.changeNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || change.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || change.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: ChangeRequest['status']) => {
    switch (status) {
      case 'Closed':
        return '#4caf50';
      case 'Implemented':
        return '#8bc34a';
      case 'Approved':
        return '#2196f3';
      case 'Under Review':
        return '#ff9800';
      case 'Submitted':
        return '#9c27b0';
      case 'Rejected':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  const getPriorityColor = (priority: ChangeRequest['priority']) => {
    switch (priority) {
      case 'Critical':
        return '#f44336';
      case 'High':
        return '#ff9800';
      case 'Medium':
        return '#2196f3';
      case 'Low':
        return '#4caf50';
      default:
        return '#9e9e9e';
    }
  };

  const getTypeIcon = (type: ChangeRequest['type']) => {
    switch (type) {
      case 'Engineering Change':
        return '⚙️';
      case 'Product Change':
        return '📦';
      case 'Process Change':
        return '🔄';
      case 'Documentation Change':
        return '📝';
      default:
        return '📋';
    }
  };

  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading change requests...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Change Management</h2>

        {/* Search and Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search change requests..."
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
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Implemented">Implemented</option>
            <option value="Closed">Closed</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          >
            <option value="All">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
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
            New Change Request
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
            Approval Workflow
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
            Reports & Analytics
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Change Request List */}
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
              Change Requests ({filteredChanges.length})
            </div>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {filteredChanges.map((change) => (
                <div
                  key={change.id}
                  onClick={() => setSelectedChange(change)}
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    backgroundColor: selectedChange?.id === change.id ? '#e3f2fd' : 'transparent',
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
                    <span style={{ fontSize: '16px' }}>{getTypeIcon(change.type)}</span>
                    <span style={{ fontWeight: 'bold' }}>{change.title}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                    {change.changeNumber} • Due: {change.targetDate}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    <span
                      style={{
                        background: getStatusColor(change.status),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                      }}
                    >
                      {change.status}
                    </span>
                    <span
                      style={{
                        background: getPriorityColor(change.priority),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                      }}
                    >
                      {change.priority}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Assigned to: {change.assignee}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Change Request Details */}
        <div style={{ flex: 1 }}>
          {selectedChange ? (
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{getTypeIcon(selectedChange.type)}</span>
                Change Request Details
              </h3>

              <div style={{ marginBottom: '12px' }}>
                <strong>Title:</strong> {selectedChange.title}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Change Number:</strong> {selectedChange.changeNumber}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Type:</strong> {selectedChange.type}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Priority:</strong>{' '}
                <span
                  style={{
                    background: getPriorityColor(selectedChange.priority),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                >
                  {selectedChange.priority}
                </span>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Status:</strong>{' '}
                <span
                  style={{
                    background: getStatusColor(selectedChange.status),
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                >
                  {selectedChange.status}
                </span>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Initiator:</strong> {selectedChange.initiator}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Assignee:</strong> {selectedChange.assignee}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Description:</strong>
                <div
                  style={{
                    marginTop: '4px',
                    padding: '8px',
                    background: '#f9f9f9',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  {selectedChange.description}
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Justification:</strong>
                <div
                  style={{
                    marginTop: '4px',
                    padding: '8px',
                    background: '#f9f9f9',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  {selectedChange.justification}
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Impact Assessment:</strong>
                <div
                  style={{
                    marginTop: '4px',
                    padding: '8px',
                    background: '#f9f9f9',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  {selectedChange.impactAssessment}
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Affected Products:</strong> {selectedChange.affectedProducts.join(', ')}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Submitted Date:</strong> {selectedChange.submittedDate}
              </div>
              <div style={{ marginBottom: '12px' }}>
                <strong>Target Date:</strong> {selectedChange.targetDate}
              </div>
              {selectedChange.actualDate && (
                <div style={{ marginBottom: '12px' }}>
                  <strong>Actual Date:</strong> {selectedChange.actualDate}
                </div>
              )}
              <div style={{ marginBottom: '12px' }}>
                <strong>Estimated Cost:</strong> ${selectedChange.estimatedCost.toLocaleString()}
              </div>
              {selectedChange.actualCost && (
                <div style={{ marginBottom: '20px' }}>
                  <strong>Actual Cost:</strong> ${selectedChange.actualCost.toLocaleString()}
                </div>
              )}

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
                  Approve
                </button>
                <button
                  style={{
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Reject
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
                  History
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
              Select a change request to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
