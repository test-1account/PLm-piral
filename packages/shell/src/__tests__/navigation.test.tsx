import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PLMShell from '../demo';

describe('PLMShell Navigation Tests', () => {
  beforeEach(() => {
    render(<PLMShell />);
  });

  test('renders shell header with PLM System title', () => {
    expect(screen.getByText('PLM System')).toBeInTheDocument();
    expect(screen.getByText('Product Lifecycle Management')).toBeInTheDocument();
  });

  test('renders all navigation buttons', () => {
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('Changes')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  test('dashboard is active by default', () => {
    const dashboardButton = screen.getByText('Dashboard');
    expect(dashboardButton).toHaveStyle('background: rgba(255,255,255,0.2)');
    expect(screen.getByText('PLM Dashboard')).toBeInTheDocument();
  });

  test('switches to products view when products button is clicked', () => {
    const productsButton = screen.getByText('Products');
    fireEvent.click(productsButton);

    expect(productsButton).toHaveStyle('background: rgba(255,255,255,0.2)');
    expect(screen.getByText('Product Management')).toBeInTheDocument();
  });

  test('switches to documents view when documents button is clicked', () => {
    const documentsButton = screen.getByText('Documents');
    fireEvent.click(documentsButton);

    expect(documentsButton).toHaveStyle('background: rgba(255,255,255,0.2)');
    expect(screen.getByText('Document Control')).toBeInTheDocument();
  });
});
