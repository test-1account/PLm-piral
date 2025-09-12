import React from 'react';
export interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    size?: 'sm' | 'md';
}
export declare function Badge({ children, variant, size, }: BadgeProps): import("react/jsx-runtime").JSX.Element;
