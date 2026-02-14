import React from 'react';
import { createRoot } from 'react-dom/client';
import CollaborationPage from './CollaborationPage';

// Export the main component
export { default as CollaborationPage } from './CollaborationPage';

// Setup function for Piral
export function setup(piral: any) {
  piral.registerPage('/collaboration', CollaborationPage);
  
  // Register as a menu item
  piral.registerMenu(() => ({
    name: 'Collaboration',
    path: '/collaboration',
    icon: '💬'
  }));
}

// For standalone development
if (typeof window !== 'undefined' && window.document) {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(CollaborationPage));
  }
}
