import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined'],
    },
    padding: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 16px 0' }}>PLM Product Card</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666' }}>
          This is a sample product card showing how the design system can be used in PLM contexts.
        </p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <Badge variant="success">Active</Badge>
          <Badge variant="info">Rev C</Badge>
        </div>
        <Button variant="primary" size="sm">View Details</Button>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 style={{ margin: '0 0 16px 0' }}>Elevated Card</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666' }}>
          This card has an elevated appearance with shadow.
        </p>
        <Button variant="outline">Learn More</Button>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <h3 style={{ margin: '0 0 16px 0' }}>Outlined Card</h3>
        <p style={{ margin: '0 0 16px 0', color: '#666' }}>
          This card has a border outline.
        </p>
        <Button variant="ghost">View</Button>
      </div>
    ),
  },
};
