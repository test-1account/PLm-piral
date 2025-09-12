import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductManagementPage } from '../ProductManagementPage';

describe('ProductManagementPage Business Logic Tests', () => {
  test('displays product details when product card is clicked', () => {
    render(<ProductManagementPage />);

    const productCard = screen.getByText('V8 Engine Assembly');
    fireEvent.click(productCard);

    expect(screen.getByText('Product Details')).toBeInTheDocument();
    expect(screen.getByText('High-performance V8 engine for luxury vehicles')).toBeInTheDocument();
  });

  test('status filter shows only products with selected status', () => {
    render(<ProductManagementPage />);

    const statusSelect = screen.getByDisplayValue('All Status');
    fireEvent.change(statusSelect, { target: { value: 'Production' } });

    expect(screen.getByText('V8 Engine Assembly')).toBeInTheDocument();
    expect(screen.queryByText('Electric Drive Unit')).not.toBeInTheDocument();
  });

  test('shows empty state when no products match filters', () => {
    render(<ProductManagementPage />);

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'NonExistentProduct' } });

    expect(screen.getByText('No products found matching your filters.')).toBeInTheDocument();
  });

  test('product card displays all required information', () => {
    render(<ProductManagementPage />);

    expect(screen.getByText('V8 Engine Assembly')).toBeInTheDocument();
    expect(screen.getByText('v3.2')).toBeInTheDocument();
    expect(screen.getByText('Production')).toBeInTheDocument();
    expect(screen.getByText('Powertrain')).toBeInTheDocument();
  });

  test('back button returns to product list from details view', () => {
    render(<ProductManagementPage />);

    const productCard = screen.getByText('V8 Engine Assembly');
    fireEvent.click(productCard);

    const backButton = screen.getByText('← Back to Products');
    fireEvent.click(backButton);

    expect(screen.getByText('Product Management')).toBeInTheDocument();
    expect(screen.queryByText('Product Details')).not.toBeInTheDocument();
  });
});
