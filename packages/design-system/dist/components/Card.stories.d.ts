import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: import("react").FC<import("./Card").CardProps>;
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
        padding: {
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
export declare const Elevated: Story;
export declare const Outlined: Story;
