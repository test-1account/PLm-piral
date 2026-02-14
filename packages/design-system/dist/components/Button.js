import { jsx as _jsx } from "react/jsx-runtime";
import { colors, spacing, borderRadius, typography } from '../tokens';
export function Button({ children, variant = 'primary', size = 'md', disabled = false, onClick, }) {
    const getVariantStyles = () => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: colors.primary[500],
                    color: colors.text.white,
                    border: `1px solid ${colors.primary[500]}`,
                };
            case 'secondary':
                return {
                    backgroundColor: colors.secondary[500],
                    color: colors.text.white,
                    border: `1px solid ${colors.secondary[500]}`,
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    color: colors.primary[500],
                    border: `1px solid ${colors.primary[500]}`,
                };
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    color: colors.primary[500],
                    border: '1px solid transparent',
                };
            default:
                return {};
        }
    };
    const getSizeStyles = () => {
        switch (size) {
            case 'sm':
                return {
                    padding: `${spacing.xs} ${spacing.sm}`,
                    fontSize: typography.fontSize.sm,
                };
            case 'md':
                return {
                    padding: `${spacing.sm} ${spacing.md}`,
                    fontSize: typography.fontSize.base,
                };
            case 'lg':
                return {
                    padding: `${spacing.md} ${spacing.lg}`,
                    fontSize: typography.fontSize.lg,
                };
            default:
                return {};
        }
    };
    const baseStyles = {
        fontFamily: typography.fontFamily.primary,
        fontWeight: typography.fontWeight.medium,
        borderRadius: borderRadius.md,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease-in-out',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        outline: 'none',
    };
    const styles = {
        ...baseStyles,
        ...getVariantStyles(),
        ...getSizeStyles(),
    };
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };
    return (_jsx("button", { style: styles, onClick: handleClick, disabled: disabled, children: children }));
}
;
