import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
};
export default meta;
export const Default = {
    args: {
        children: (_jsxs("div", { children: [_jsx("h3", { style: { margin: '0 0 16px 0' }, children: "PLM Product Card" }), _jsx("p", { style: { margin: '0 0 16px 0', color: '#666' }, children: "This is a sample product card showing how the design system can be used in PLM contexts." }), _jsxs("div", { style: { display: 'flex', gap: '8px', marginBottom: '16px' }, children: [_jsx(Badge, { variant: "success", children: "Active" }), _jsx(Badge, { variant: "info", children: "Rev C" })] }), _jsx(Button, { variant: "primary", size: "sm", children: "View Details" })] })),
    },
};
export const Elevated = {
    args: {
        variant: 'elevated',
        children: (_jsxs("div", { children: [_jsx("h3", { style: { margin: '0 0 16px 0' }, children: "Elevated Card" }), _jsx("p", { style: { margin: '0 0 16px 0', color: '#666' }, children: "This card has an elevated appearance with shadow." }), _jsx(Button, { variant: "outline", children: "Learn More" })] })),
    },
};
export const Outlined = {
    args: {
        variant: 'outlined',
        children: (_jsxs("div", { children: [_jsx("h3", { style: { margin: '0 0 16px 0' }, children: "Outlined Card" }), _jsx("p", { style: { margin: '0 0 16px 0', color: '#666' }, children: "This card has a border outline." }), _jsx(Button, { variant: "ghost", children: "View" })] })),
    },
};
