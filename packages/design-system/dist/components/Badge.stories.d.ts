import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: import("react").FC<import("./Badge").BadgeProps>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        variant: {
            control: {
                type: string;
            };
            options: string[];
        };
        size: {
            control: {
                type: string;
            };
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Success: Story;
export declare const Warning: Story;
export declare const Error: Story;
export declare const Info: Story;
export declare const Small: Story;
export declare const PLMStatusExamples: Story;
