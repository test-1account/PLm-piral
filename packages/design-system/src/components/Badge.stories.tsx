import React from 'react';
import { Badge } from './Badge';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
  },
};

export const Default = {
  args: {
    children: 'Default',
  },
};

export const Success = {
  args: {
    children: 'Approved',
    variant: 'success',
  },
};

export const Warning = {
  args: {
    children: 'Under Review',
    variant: 'warning',
  },
};

export const Error = {
  args: {
    children: 'Rejected',
    variant: 'error',
  },
};

export const Info = {
  args: {
    children: 'Rev C',
    variant: 'info',
  },
};

export const Small = {
  args: {
    children: 'Small Badge',
    size: 'sm',
  },
};

export const PLMStatusExamples = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Obsolete</Badge>
      <Badge variant="info">Rev A</Badge>
      <Badge variant="info">Rev B</Badge>
      <Badge variant="info">Rev C</Badge>
      <Badge variant="default">Draft</Badge>
      <Badge variant="success" size="sm">QC Passed</Badge>
      <Badge variant="warning" size="sm">In Progress</Badge>
    </div>
  ),
};
