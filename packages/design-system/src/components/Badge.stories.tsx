import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
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
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Success: Story = {
  args: {
    children: 'Approved',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Under Review',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Rejected',
    variant: 'error',
  },
};

export const Info: Story = {
  args: {
    children: 'Rev C',
    variant: 'info',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Badge',
    size: 'sm',
  },
};

export const PLMStatusExamples: Story = {
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
