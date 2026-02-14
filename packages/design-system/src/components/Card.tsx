import React from 'react';
import { colors, spacing, borderRadius, typography } from '../tokens';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className,
}: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: colors.background.paper,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: 'none',
        };
      case 'outlined':
        return {
          backgroundColor: colors.background.default,
          border: `1px solid ${colors.gray[300]}`,
          boxShadow: 'none',
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.background.default,
          border: 'none',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        };
    }
  };

  const getPaddingStyles = () => {
    switch (padding) {
      case 'sm':
        return { padding: spacing.md };
      case 'md':
        return { padding: spacing.lg };
      case 'lg':
        return { padding: spacing.xl };
      default:
        return {};
    }
  };

  const baseStyles = {
    borderRadius: borderRadius.lg,
    transition: 'all 0.2s ease-in-out',
  };

  const styles = {
    ...baseStyles,
    ...getVariantStyles(),
    ...getPaddingStyles(),
  };

  return (
    <div style={styles} className={className}>
      {children}
    </div>
  );
};
