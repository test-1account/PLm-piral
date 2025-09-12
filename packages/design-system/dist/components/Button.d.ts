import React from 'react';
export interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onClick?: () => void;
}
export declare function Button({ children, variant, size, disabled, onClick, }: ButtonProps): import("react/jsx-runtime").JSX.Element;
