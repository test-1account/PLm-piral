import React, { useState } from 'react';
import { Button, Card, Badge } from '@plm/design-system';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  read: boolean;
  from: string;
  relatedItem?: string;
}

interface Discussion {
  id: string;
  title: string;
  topic: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'resolved' | 'archived';
  tags: string[];
}

const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'ECO-001 Approved',
    message: 'Your engineering change order has been approved and is ready for implementation.',
    type: 'success',
    priority: 'high',
    timestamp: '2024-01-15T10:30:00Z',
    read: false,
    from: 'Engineering Review Board',
    relatedItem: 'ECO-001'
  },
  {
    id: 'notif-002',
    title: 'New Comment on PCN-002',
    message: 'Sarah Johnson added a comment regarding the supplier qualification process.',
    type: 'info',
    priority: 'medium',
    timestamp: '2024-01-15T09:15:00Z',
    read: false,
    from: 'Sarah Johnson',
    relatedItem: 'PCN-002'
  },
  {
    id: 'notif-003',
    title: 'Document Review Due',
    message: 'The technical specification document SPEC-789 is due for review today.',
    type: 'warning',
    priority: 'high',
    timestamp: '2024-01-15T08:00:00Z',
    read: true,
    from: 'Document Control System',
    relatedItem: 'SPEC-789'
  },
  {
    id: 'notif-004',
    title: 'Weekly PLM Meeting',
    message: 'Weekly PLM coordination meeting scheduled for tomorrow at 2 PM.',
    type: 'info',
    priority: 'low',
    timestamp: '2024-01-14T16:45:00Z',
    read: true,
    from: 'Calendar System'
  }
];

const mockDiscussions: Discussion[] = [
  {
    id: 'disc-001',
    title: 'Material Selection for Project Alpha',
    topic: 'Engineering',
    participants: ['John Smith', 'Mike Davis', 'Lisa Anderson'],
    lastMessage: 'I think we should go with the aluminum option for weight considerations.',
    lastMessageTime: '2024-01-15T11:20:00Z',
    unreadCount: 3,
    status: 'active',
    tags: ['materials', 'project-alpha', 'engineering']
  },
  {
    id: 'disc-002',
    title: 'Supplier Qualification Process Update',
    topic: 'Procurement',
    participants: ['Sarah Johnson', 'Robert Chen', 'Emily White'],
    lastMessage: 'The new vendor audit is complete. All requirements met.',
    lastMessageTime: '2024-01-15T10:45:00Z',
    unreadCount: 1,
    status: 'active',
    tags: ['procurement', 'suppliers', 'audit']
  },
  {
    id: 'disc-003',
    title: 'Design Review Meeting Notes',
    topic: 'Design',
    participants: ['Mike Davis', 'Anna Thompson', 'Chris Wilson'],
    lastMessage: 'Action items from yesterday\'s review have been assigned.',
    lastMessageTime: '2024-01-14T15:30:00Z',
    unreadCount: 0,
    status: 'resolved',
    tags: ['design-review', 'action-items', 'meeting']
  }
];

function CollaborationPage() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'discussions'>('notifications');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredNotifications = mockNotifications.filter(notification => {
    if (selectedPriority !== 'all' && notification.priority !== selectedPriority) return false;
    return true;
  });

  const filteredDiscussions = mockDiscussions.filter(discussion => {
    if (selectedStatus !== 'all' && discussion.status !== selectedStatus) return false;
    return true;
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getNotificationBadgeVariant = (type: string) => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'info': return 'info';
      default: return 'default';
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'low': return 'default';
      case 'medium': return 'warning';
      case 'high': return 'error';
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
          Collaboration Center
        </h1>
        <p style={{ 
          fontSize: '16px', 
          color: '#666',
          marginBottom: '24px'
        }}>
          Stay connected with your team through notifications, discussions, and real-time updates
        </p>

        {/* Tab Navigation */}
        <div style={{ 
          display: 'flex', 
          gap: '2px', 
          marginBottom: '24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <button
            onClick={() => setActiveTab('notifications')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: activeTab === 'notifications' ? '#f8fafc' : 'transparent',
              borderBottom: activeTab === 'notifications' ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === 'notifications' ? '#1e40af' : '#6b7280',
              fontWeight: activeTab === 'notifications' ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Notifications ({mockNotifications.filter(n => !n.read).length})
          </button>
          <button
            onClick={() => setActiveTab('discussions')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: activeTab === 'discussions' ? '#f8fafc' : 'transparent',
              borderBottom: activeTab === 'discussions' ? '2px solid #3b82f6' : '2px solid transparent',
              color: activeTab === 'discussions' ? '#1e40af' : '#6b7280',
              fontWeight: activeTab === 'discussions' ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Discussions ({mockDiscussions.filter(d => d.unreadCount > 0).length})
          </button>
        </div>
      </div>

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div>
          {/* Notification Controls */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            marginBottom: '24px',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Button variant="primary" size="sm">
                Mark All Read
              </Button>
              <select 
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>

          {/* Notifications List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredNotifications.map((notification) => (
              <Card key={notification.id} variant={notification.read ? 'default' : 'elevated'}>
                <div style={{ 
                  padding: '16px',
                  opacity: notification.read ? 0.7 : 1,
                  borderLeft: notification.read ? 'none' : '4px solid #3b82f6'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '16px', 
                        fontWeight: '600', 
                        margin: '0 0 4px 0',
                        color: '#1a1a1a'
                      }}>
                        {notification.title}
                      </h3>
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#4b5563',
                        margin: '0',
                        lineHeight: '1.5'
                      }}>
                        {notification.message}
                      </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                      <Badge variant={getNotificationBadgeVariant(notification.type)}>
                        {notification.type.toUpperCase()}
                      </Badge>
                      <Badge variant={getPriorityBadgeVariant(notification.priority)}>
                        {notification.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    <div>
                      <span style={{ fontWeight: '500' }}>From:</span> {notification.from}
                      {notification.relatedItem && (
                        <span style={{ marginLeft: '16px' }}>
                          <span style={{ fontWeight: '500' }}>Related:</span> {notification.relatedItem}
                        </span>
                      )}
                    </div>
                    <span>{formatTime(notification.timestamp)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <div>
          {/* Discussion Controls */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            marginBottom: '24px',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Button variant="primary" size="sm">
                New Discussion
              </Button>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <Button variant="outline" size="sm">
              Search
            </Button>
          </div>

          {/* Discussions List */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
            gap: '20px' 
          }}>
            {filteredDiscussions.map((discussion) => (
              <Card key={discussion.id} variant="elevated">
                <div style={{ padding: '20px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        margin: '0 0 4px 0',
                        color: '#1a1a1a'
                      }}>
                        {discussion.title}
                      </h3>
                      <p style={{ 
                        fontSize: '14px', 
                        color: '#6b7280',
                        margin: '0',
                        fontWeight: '500'
                      }}>
                        {discussion.topic}
                      </p>
                    </div>
                    {discussion.unreadCount > 0 && (
                      <Badge variant="error">
                        {discussion.unreadCount} new
                      </Badge>
                    )}
                  </div>

                  <div style={{ 
                    fontSize: '14px', 
                    color: '#4b5563',
                    marginBottom: '16px',
                    fontStyle: 'italic',
                    lineHeight: '1.4'
                  }}>
                    "{discussion.lastMessage}"
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    gap: '4px',
                    marginBottom: '16px'
                  }}>
                    {discussion.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '16px',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    <div>
                      <span style={{ fontWeight: '500' }}>Participants:</span> {discussion.participants.length}
                    </div>
                    <span>{formatTime(discussion.lastMessageTime)}</span>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    justifyContent: 'flex-end'
                  }}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="primary" size="sm">
                      Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty States */}
      {activeTab === 'notifications' && filteredNotifications.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#666'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No notifications found</h3>
          <p>You're all caught up! Check back later for new updates.</p>
        </div>
      )}

      {activeTab === 'discussions' && filteredDiscussions.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#666'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No discussions found</h3>
          <p>Start a new discussion to collaborate with your team.</p>
        </div>
      )}
    </div>
  );
}

export default CollaborationPage;
