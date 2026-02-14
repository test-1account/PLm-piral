import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductManagementPage } from '../ProductManagementPage';

describe('ProductManagementPage Component Tests', () => {
  beforeEach(() => {
    render(<ProductManagementPage />);
  });

  test('renders product management header', () => {
    expect(screen.getByText('Product Management')).toBeInTheDocument();
    expect(screen.getByText('Manage product lifecycle and specifications')).toBeInTheDocument();
  });

  test('renders filter controls', () => {
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Categories')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Status')).toBeInTheDocument();
  });

  test('displays product list with mock data', () => {
    expect(screen.getByText('V8 Engine Assembly')).toBeInTheDocument();
    expect(screen.getByText('Electric Drive Unit')).toBeInTheDocument();
    expect(screen.getByText('Carbon Fiber Chassis')).toBeInTheDocument();
  });

  test('search functionality filters products', () => {
    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'V8' } });

    expect(screen.getByText('V8 Engine Assembly')).toBeInTheDocument();
    expect(screen.queryByText('Electric Drive Unit')).not.toBeInTheDocument();
  });

  test('category filter works correctly', () => {
    const categorySelect = screen.getByDisplayValue('All Categories');
    fireEvent.change(categorySelect, { target: { value: 'Powertrain' } });

    expect(screen.getByText('V8 Engine Assembly')).toBeInTheDocument();
    expect(screen.getByText('Electric Drive Unit')).toBeInTheDocument();
    expect(screen.queryByText('Carbon Fiber Chassis')).not.toBeInTheDocument();
  });
});
