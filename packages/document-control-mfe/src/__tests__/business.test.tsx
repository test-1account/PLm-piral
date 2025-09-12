import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentControlPage } from '../DocumentControlPage';

describe('DocumentControlPage Business Logic Tests', () => {
  test('displays document details when document is clicked', () => {
    render(<DocumentControlPage />);

    const documentCard = screen.getByText('Engine Design Specifications');
    fireEvent.click(documentCard);

    expect(screen.getByText('Document Details')).toBeInTheDocument();
    expect(screen.getByText('Detailed specifications for V8 engine design')).toBeInTheDocument();
  });

  test('status filter shows only documents with selected status', () => {
    render(<DocumentControlPage />);

    const statusSelect = screen.getByDisplayValue('All Status');
    fireEvent.change(statusSelect, { target: { value: 'Approved' } });

    expect(screen.getByText('Engine Design Specifications')).toBeInTheDocument();
    expect(screen.queryByText('Quality Control Procedures')).not.toBeInTheDocument();
  });

  test('shows empty state when no documents match filters', () => {
    render(<DocumentControlPage />);

    const searchInput = screen.getByPlaceholderText('Search documents...');
    fireEvent.change(searchInput, { target: { value: 'NonExistentDocument' } });

    expect(screen.getByText('No documents found matching your filters.')).toBeInTheDocument();
  });

  test('document card displays all required information', () => {
    render(<DocumentControlPage />);

    expect(screen.getByText('Engine Design Specifications')).toBeInTheDocument();
    expect(screen.getByText('v2.1')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
    expect(screen.getByText('Specification')).toBeInTheDocument();
  });

  test('back button returns to document list from details view', () => {
    render(<DocumentControlPage />);

    const documentCard = screen.getByText('Engine Design Specifications');
    fireEvent.click(documentCard);

    const backButton = screen.getByText('← Back to Documents');
    fireEvent.click(backButton);

    expect(screen.getByText('Document Control')).toBeInTheDocument();
    expect(screen.queryByText('Document Details')).not.toBeInTheDocument();
  });
});
