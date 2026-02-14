import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PLMShell from '../demo';

describe('PLMShell Integration Tests', () => {
  test('renders shell with correct styling', () => {
    render(<PLMShell />);

    const header = screen.getByRole('banner');
    expect(header).toHaveStyle({
      background: '#1976d2',
      color: 'white',
      padding: '12px 20px',
    });
  });

  test('main content area has correct minimum height', () => {
    render(<PLMShell />);

    const main = screen.getByRole('main');
    expect(main).toHaveStyle('min-height: calc(100vh - 64px)');
  });

  test('navigation buttons have correct initial styling', () => {
    render(<PLMShell />);

    const dashboardBtn = screen.getByText('Dashboard');
    const productsBtn = screen.getByText('Products');

    expect(dashboardBtn).toHaveStyle('background: rgba(255,255,255,0.2)');
    expect(productsBtn).toHaveStyle('background: transparent');
  });

  test('clicking products button changes active state', () => {
    render(<PLMShell />);

    const dashboardBtn = screen.getByText('Dashboard');
    const productsBtn = screen.getByText('Products');

    fireEvent.click(productsBtn);

    expect(dashboardBtn).toHaveStyle('background: transparent');
    expect(productsBtn).toHaveStyle('background: rgba(255,255,255,0.2)');
  });

  test('clicking documents button loads document control page', () => {
    render(<PLMShell />);

    const documentsBtn = screen.getByText('Documents');
    fireEvent.click(documentsBtn);

    expect(screen.getByText('Document Control')).toBeInTheDocument();
    expect(screen.getByText('+ Upload Document')).toBeInTheDocument();
  });
});
