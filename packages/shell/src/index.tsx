import React from 'react';
import ReactDOM from 'react-dom/client';
import { layout } from './layout';

// Simple shell implementation for demo purposes
// In production, this would use full Piral with renderInstance

const App = () => {
  return layout({ 
    children: (
      <div>
        <h2>Welcome to PLM System</h2>
        <p>This is a demo of the microfrontend shell.</p>
        <p>Individual MFEs would be loaded here dynamically.</p>
      </div>
    )
  });
};

// Render the shell
const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App />);
