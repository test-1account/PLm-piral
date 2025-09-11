// Collaboration Microfrontend
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Project {
  id: string;
  name: string;
  projectCode: string;
  status: 'Planning' | 'Active' | 'On Hold' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  manager: string;
  teamMembers: string[];
  startDate: string;
  endDate: string;
  progress: number;
  budget: number;
  spent: number;
  description: string;
  milestones: Milestone[];
  recentActivity: Activity[];
}

interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
  assignee: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

// Mock data for demo
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Next-Gen Hydraulic System',
    projectCode: 'PROJ-2024-001',
    status: 'Active',
    priority: 'High',
    manager: 'Sarah Johnson',
    teamMembers: ['John Smith', 'Mike Chen', 'Lisa Anderson', 'David Wilson'],
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    progress: 65,
    budget: 500000,
    spent: 325000,
    description:
      'Development of next-generation hydraulic system with improved efficiency and smart monitoring capabilities',
    milestones: [
      {
        id: '1',
        name: 'Design Phase Complete',
        dueDate: '2024-03-31',
        status: 'Completed',
        assignee: 'John Smith',
      },
      {
        id: '2',
        name: 'Prototype Testing',
        dueDate: '2024-06-30',
        status: 'Completed',
        assignee: 'Mike Chen',
      },
      {
        id: '3',
        name: 'Pilot Production',
        dueDate: '2024-09-30',
        status: 'In Progress',
        assignee: 'Lisa Anderson',
      },
      {
        id: '4',
        name: 'Market Launch',
        dueDate: '2024-12-15',
        status: 'Pending',
        assignee: 'David Wilson',
      },
    ],
    recentActivity: [
      {
        id: '1',
        user: 'Mike Chen',
        action: 'Updated',
        timestamp: '2024-09-10 14:30',
        details: 'Completed testing protocol validation',
      },
      {
        id: '2',
        user: 'Lisa Anderson',
        action: 'Commented',
        timestamp: '2024-09-09 16:45',
        details: 'Production line setup is on schedule',
      },
      {
        id: '3',
        user: 'John Smith',
        action: 'Uploaded',
        timestamp: '2024-09-08 11:20',
        details: 'Final design specifications document',
      },
    ],
  },
  {
    id: '2',
    name: 'Control System Upgrade',
    projectCode: 'PROJ-2024-002',
    status: 'Planning',
    priority: 'Medium',
    manager: 'Emily Brown',
    teamMembers: ['Mike Chen', 'David Wilson', 'Alex Taylor'],
    startDate: '2024-10-01',
    endDate: '2025-06-30',
    progress: 15,
    budget: 300000,
    spent: 45000,
    description:
      'Upgrade existing control systems with new IoT capabilities and enhanced user interface',
    milestones: [
      {
        id: '1',
        name: 'Requirements Analysis',
        dueDate: '2024-11-15',
        status: 'In Progress',
        assignee: 'Mike Chen',
      },
      {
        id: '2',
        name: 'Architecture Design',
        dueDate: '2024-12-31',
        status: 'Pending',
        assignee: 'David Wilson',
      },
      {
        id: '3',
        name: 'Development Phase',
        dueDate: '2025-04-30',
        status: 'Pending',
        assignee: 'Alex Taylor',
      },
      {
        id: '4',
        name: 'System Integration',
        dueDate: '2025-06-15',
        status: 'Pending',
        assignee: 'Emily Brown',
      },
    ],
    recentActivity: [
      {
        id: '1',
        user: 'Emily Brown',
        action: 'Created',
        timestamp: '2024-09-05 09:15',
        details: 'Project kick-off meeting scheduled',
      },
      {
        id: '2',
        user: 'Mike Chen',
        action: 'Started',
        timestamp: '2024-09-03 13:30',
        details: 'Requirements gathering phase',
      },
    ],
  },
  {
    id: '3',
    name: 'Safety Compliance Update',
    projectCode: 'PROJ-2024-003',
    status: 'Completed',
    priority: 'Critical',
    manager: 'David Wilson',
    teamMembers: ['Lisa Anderson', 'Emily Brown', 'John Smith'],
    startDate: '2024-03-01',
    endDate: '2024-08-31',
    progress: 100,
    budget: 150000,
    spent: 142000,
    description: 'Update all safety systems to comply with new industry regulations and standards',
    milestones: [
      {
        id: '1',
        name: 'Compliance Audit',
        dueDate: '2024-04-15',
        status: 'Completed',
        assignee: 'Lisa Anderson',
      },
      {
        id: '2',
        name: 'System Updates',
        dueDate: '2024-06-30',
        status: 'Completed',
        assignee: 'Emily Brown',
      },
      {
        id: '3',
        name: 'Validation Testing',
        dueDate: '2024-08-15',
        status: 'Completed',
        assignee: 'John Smith',
      },
      {
        id: '4',
        name: 'Certification',
        dueDate: '2024-08-31',
        status: 'Completed',
        assignee: 'David Wilson',
      },
    ],
    recentActivity: [
      {
        id: '1',
        user: 'David Wilson',
        action: 'Completed',
        timestamp: '2024-08-31 17:00',
        details: 'Project successfully completed and certified',
      },
      {
        id: '2',
        user: 'John Smith',
        action: 'Submitted',
        timestamp: '2024-08-30 14:20',
        details: 'Final validation report',
      },
    ],
  },
];

export const CollaborationMFE: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'team' | 'activity'>(
    'overview'
  );
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const { data: projects = mockProjects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => Promise.resolve(mockProjects),
    staleTime: 5 * 60 * 1000,
  });

  const filteredProjects = projects.filter((project) => {
    return filterStatus === 'All' || project.status === filterStatus;
  });

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return '#4caf50';
      case 'Active':
        return '#2196f3';
      case 'Planning':
        return '#ff9800';
      case 'On Hold':
        return '#f44336';
      case 'Cancelled':
        return '#9e9e9e';
      default:
        return '#9e9e9e';
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
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

  const getMilestoneStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'Completed':
        return '#4caf50';
      case 'In Progress':
        return '#2196f3';
      case 'Pending':
        return '#9e9e9e';
      case 'Delayed':
        return '#f44336';
      default:
        return '#9e9e9e';
    }
  };

  if (isLoading) {
    return <div style={{ padding: '20px' }}>Loading projects...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Project Collaboration</h2>

        {/* Filters and Actions */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'center' }}>
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
            <option value="Planning">Planning</option>
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
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
              New Project
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
              Team Calendar
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
              Reports
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Project List */}
        <div style={{ width: '350px' }}>
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
              Projects ({filteredProjects.length})
            </div>
            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  style={{
                    padding: '12px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    backgroundColor: selectedProject?.id === project.id ? '#e3f2fd' : 'transparent',
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{project.name}</div>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                    {project.projectCode} • {project.manager}
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
                        background: getStatusColor(project.status),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                      }}
                    >
                      {project.status}
                    </span>
                    <span
                      style={{
                        background: getPriorityColor(project.priority),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '11px',
                      }}
                    >
                      {project.priority}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        flex: 1,
                        background: '#f0f0f0',
                        borderRadius: '10px',
                        height: '6px',
                      }}
                    >
                      <div
                        style={{
                          background: getStatusColor(project.status),
                          height: '100%',
                          borderRadius: '10px',
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '12px', color: '#666' }}>{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div style={{ flex: 1 }}>
          {selectedProject ? (
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              {/* Project Header */}
              <div
                style={{ background: '#f5f5f5', padding: '16px', borderBottom: '1px solid #ddd' }}
              >
                <h3 style={{ margin: 0, marginBottom: '8px' }}>{selectedProject.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {selectedProject.projectCode}
                  </span>
                  <span
                    style={{
                      background: getStatusColor(selectedProject.status),
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  >
                    {selectedProject.status}
                  </span>
                  <span
                    style={{
                      background: getPriorityColor(selectedProject.priority),
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  >
                    {selectedProject.priority}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
                {(['overview', 'milestones', 'team', 'activity'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      border: 'none',
                      background: activeTab === tab ? '#e3f2fd' : 'transparent',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      borderBottom: activeTab === tab ? '2px solid #1976d2' : 'none',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div style={{ padding: '16px', maxHeight: '500px', overflowY: 'auto' }}>
                {activeTab === 'overview' && (
                  <div>
                    <div style={{ marginBottom: '16px' }}>
                      <strong>Description:</strong>
                      <div style={{ marginTop: '4px', fontSize: '14px' }}>
                        {selectedProject.description}
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '16px',
                        marginBottom: '16px',
                      }}
                    >
                      <div>
                        <strong>Project Manager:</strong>
                        <div>{selectedProject.manager}</div>
                      </div>
                      <div>
                        <strong>Team Size:</strong>
                        <div>{selectedProject.teamMembers.length} members</div>
                      </div>
                      <div>
                        <strong>Start Date:</strong>
                        <div>{selectedProject.startDate}</div>
                      </div>
                      <div>
                        <strong>End Date:</strong>
                        <div>{selectedProject.endDate}</div>
                      </div>
                      <div>
                        <strong>Budget:</strong>
                        <div>${selectedProject.budget.toLocaleString()}</div>
                      </div>
                      <div>
                        <strong>Spent:</strong>
                        <div>${selectedProject.spent.toLocaleString()}</div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <strong>Progress: {selectedProject.progress}%</strong>
                      <div
                        style={{
                          marginTop: '4px',
                          background: '#f0f0f0',
                          borderRadius: '10px',
                          height: '10px',
                        }}
                      >
                        <div
                          style={{
                            background: getStatusColor(selectedProject.status),
                            height: '100%',
                            borderRadius: '10px',
                            width: `${selectedProject.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'milestones' && (
                  <div>
                    {selectedProject.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        style={{
                          padding: '12px',
                          border: '1px solid #eee',
                          borderRadius: '4px',
                          marginBottom: '8px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '4px',
                          }}
                        >
                          <strong>{milestone.name}</strong>
                          <span
                            style={{
                              background: getMilestoneStatusColor(milestone.status),
                              color: 'white',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '11px',
                            }}
                          >
                            {milestone.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          Due: {milestone.dueDate} • Assigned to: {milestone.assignee}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'team' && (
                  <div>
                    <div style={{ marginBottom: '12px' }}>
                      <strong>Project Manager:</strong>
                      <div
                        style={{
                          marginTop: '4px',
                          padding: '8px',
                          background: '#e3f2fd',
                          borderRadius: '4px',
                        }}
                      >
                        {selectedProject.manager}
                      </div>
                    </div>
                    <div>
                      <strong>Team Members:</strong>
                      <div style={{ marginTop: '8px' }}>
                        {selectedProject.teamMembers.map((member, index) => (
                          <div
                            key={index}
                            style={{
                              padding: '8px',
                              background: '#f9f9f9',
                              borderRadius: '4px',
                              marginBottom: '4px',
                            }}
                          >
                            {member}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div>
                    {selectedProject.recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        style={{
                          padding: '12px',
                          border: '1px solid #eee',
                          borderRadius: '4px',
                          marginBottom: '8px',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '4px',
                          }}
                        >
                          <strong>{activity.user}</strong>
                          <span style={{ fontSize: '12px', color: '#666' }}>
                            {activity.timestamp}
                          </span>
                        </div>
                        <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                          <span style={{ color: '#1976d2' }}>{activity.action}</span>:{' '}
                          {activity.details}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
              Select a project to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
