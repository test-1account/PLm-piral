import React from 'react';
import { colors, spacing, typography } from '../tokens';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: colors.success,
          color: colors.text.white,
        };
      case 'warning':
        return {
          backgroundColor: colors.warning,
          color: colors.text.white,
        };
      case 'error':
        return {
          backgroundColor: colors.error,
          color: colors.text.white,
        };
      case 'info':
        return {
          backgroundColor: colors.info,
          color: colors.text.white,
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.gray[200],
          color: colors.text.primary,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: `2px ${spacing.xs}`,
          fontSize: typography.fontSize.xs,
        };
      case 'md':
        return {
          padding: `${spacing.xs} ${spacing.sm}`,
          fontSize: typography.fontSize.sm,
        };
      default:
        return {};
    }
  };

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.medium,
    borderRadius: '12px',
    textAlign: 'center' as const,
  };

  const styles = {
    ...baseStyles,
    ...getVariantStyles(),
    ...getSizeStyles(),
  };

  return <span style={styles}>{children}</span>;
};
