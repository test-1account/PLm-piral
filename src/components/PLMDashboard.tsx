// Sample PLM Dashboard Component
import React from 'react';

interface PLMDashboardProps {
  userRole?: string;
}

export const PLMDashboard: React.FC<PLMDashboardProps> = ({ userRole = 'user' }) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <h1>PLM Dashboard</h1>
        <p>Welcome to the Product Lifecycle Management System</p>
        <span style={{ background: '#e3f2fd', padding: '4px 8px', borderRadius: '4px' }}>
          Role: {userRole}
        </span>
      </header>

      <div
        style={{
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h3>Product Management</h3>
          <p>Manage product information, specifications, and lifecycle stages.</p>
          <button
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
            }}
          >
            View Products
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h3>Document Control</h3>
          <p>Manage engineering documents, drawings, and specifications.</p>
          <button
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
            }}
          >
            View Documents
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h3>Change Management</h3>
          <p>Track and manage engineering change orders and approvals.</p>
          <button
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
            }}
          >
            View Changes
          </button>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
          <h3>Collaboration</h3>
          <p>Team collaboration tools and project management.</p>
          <button
            style={{
              background: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
            }}
          >
            View Projects
          </button>
        </div>
      </div>

      <div
        style={{ marginTop: '30px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}
      >
        <h3>Recent Activity</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Product XYZ-123 specifications updated</li>
          <li>Engineering change ECO-456 approved</li>
          <li>New document DOC-789 uploaded</li>
          <li>Project Alpha milestone completed</li>
        </ul>
      </div>
    </div>
  );
};
