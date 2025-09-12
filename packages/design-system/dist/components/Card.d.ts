import React from 'react';
export interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare function Card({ children, variant, padding, className, }: CardProps): import("react/jsx-runtime").JSX.Element;
