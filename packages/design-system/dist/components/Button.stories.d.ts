import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: import("react").FC<import("./Button").ButtonProps>;
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
        disabled: {
            control: {
                type: string;
            };
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Outline: Story;
export declare const Ghost: Story;
export declare const Small: Story;
export declare const Large: Story;
export declare const Disabled: Story;
