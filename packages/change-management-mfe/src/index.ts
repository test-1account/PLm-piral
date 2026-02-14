import React from 'react';
import { createRoot } from 'react-dom/client';
import ChangeManagementPage from './ChangeManagementPage';

// Export the main component
export { default as ChangeManagementPage } from './ChangeManagementPage';

// Setup function for Piral
export function setup(piral: any) {
  piral.registerPage('/change-management', ChangeManagementPage);
  
  // Register as a menu item
  piral.registerMenu(() => ({
    name: 'Change Management',
    path: '/change-management',
    icon: '🔄'
  }));
}

// For standalone development
if (typeof window !== 'undefined' && window.document) {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(ChangeManagementPage));
  }
}
