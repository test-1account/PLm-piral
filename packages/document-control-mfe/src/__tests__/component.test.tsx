import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentControlPage } from '../DocumentControlPage';

describe('DocumentControlPage Component Tests', () => {
  beforeEach(() => {
    render(<DocumentControlPage />);
  });

  test('renders document control header', () => {
    expect(screen.getByText('Document Control')).toBeInTheDocument();
    expect(screen.getByText('Manage product documentation and revisions')).toBeInTheDocument();
  });

  test('renders filter and search controls', () => {
    expect(screen.getByPlaceholderText('Search documents...')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Types')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Status')).toBeInTheDocument();
  });

  test('displays document list with mock data', () => {
    expect(screen.getByText('Engine Design Specifications')).toBeInTheDocument();
    expect(screen.getByText('Manufacturing Process Guide')).toBeInTheDocument();
    expect(screen.getByText('Quality Control Procedures')).toBeInTheDocument();
  });

  test('search functionality filters documents', () => {
    const searchInput = screen.getByPlaceholderText('Search documents...');
    fireEvent.change(searchInput, { target: { value: 'Engine' } });

    expect(screen.getByText('Engine Design Specifications')).toBeInTheDocument();
    expect(screen.queryByText('Manufacturing Process Guide')).not.toBeInTheDocument();
  });

  test('document type filter works correctly', () => {
    const typeSelect = screen.getByDisplayValue('All Types');
    fireEvent.change(typeSelect, { target: { value: 'Specification' } });

    expect(screen.getByText('Engine Design Specifications')).toBeInTheDocument();
    expect(screen.queryByText('Manufacturing Process Guide')).not.toBeInTheDocument();
  });
});
