import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
};
export default meta;
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
    render: () => (_jsxs("div", { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' }, children: [_jsx(Badge, { variant: "success", children: "Active" }), _jsx(Badge, { variant: "warning", children: "Pending" }), _jsx(Badge, { variant: "error", children: "Obsolete" }), _jsx(Badge, { variant: "info", children: "Rev A" }), _jsx(Badge, { variant: "info", children: "Rev B" }), _jsx(Badge, { variant: "info", children: "Rev C" }), _jsx(Badge, { variant: "default", children: "Draft" }), _jsx(Badge, { variant: "success", size: "sm", children: "QC Passed" }), _jsx(Badge, { variant: "warning", size: "sm", children: "In Progress" })] })),
};
