import { Button } from './Button';
const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'outline', 'ghost'],
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
        disabled: {
            control: { type: 'boolean' },
        },
    },
};
export default meta;
export const Primary = {
    args: {
        children: 'Primary Button',
        variant: 'primary',
    },
};
export const Secondary = {
    args: {
        children: 'Secondary Button',
        variant: 'secondary',
    },
};
export const Outline = {
    args: {
        children: 'Outline Button',
        variant: 'outline',
    },
};
export const Ghost = {
    args: {
        children: 'Ghost Button',
        variant: 'ghost',
    },
};
export const Small = {
    args: {
        children: 'Small Button',
        size: 'sm',
    },
};
export const Large = {
    args: {
        children: 'Large Button',
        size: 'lg',
    },
};
export const Disabled = {
    args: {
        children: 'Disabled Button',
        disabled: true,
    },
};
