# PLM Design System

A comprehensive design system for Product Lifecycle Management (PLM) applications built with React and TypeScript.

## 🎨 Overview

This design system provides:
- **Design Tokens**: Consistent colors, spacing, typography, and other design properties
- **Reusable Components**: Pre-built React components following PLM best practices
- **Storybook Documentation**: Interactive component documentation and playground

## 📦 Installation

```bash
# In your PLM microfrontend package
npm install @plm/design-system
```

## 🚀 Quick Start

```tsx
import React from 'react';
import { Button, Card, Badge, colors } from '@plm/design-system';

function ProductCard({ product }) {
  return (
    <Card variant="elevated" padding="md">
      <h3 style={{ color: colors.text.primary }}>
        {product.name}
      </h3>
      <Badge variant={product.status === 'Active' ? 'success' : 'warning'}>
        {product.status}
      </Badge>
      <Button variant="primary" size="sm">
        View Details
      </Button>
    </Card>
  );
}
```

## 🎨 Design Tokens

### Colors
```tsx
import { colors } from '@plm/design-system';

// Primary colors
colors.primary[500]  // Main brand color: #1976d2
colors.primary[700]  // Darker shade: #0d47a1

// Semantic colors
colors.success       // #4caf50
colors.warning       // #ff9800
colors.error         // #f44336
colors.info          // #2196f3

// Text colors
colors.text.primary    // #212121
colors.text.secondary  // #757575
```

### Spacing
```tsx
import { spacing } from '@plm/design-system';

spacing.xs   // 4px
spacing.sm   // 8px
spacing.md   // 16px
spacing.lg   // 24px
spacing.xl   // 32px
```

## 🧩 Components

### Button
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Primary Action
</Button>

<Button variant="outline" size="sm">
  Secondary Action
</Button>
```

**Variants**: `primary` | `secondary` | `outline` | `ghost`
**Sizes**: `sm` | `md` | `lg`

### Badge
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Obsolete</Badge>
<Badge variant="info">Rev C</Badge>
```

**Variants**: `default` | `success` | `warning` | `error` | `info`
**Sizes**: `sm` | `md`

### Card
```tsx
<Card variant="elevated" padding="lg">
  <h3>Product Information</h3>
  <p>Product details and specifications...</p>
</Card>
```

**Variants**: `default` | `elevated` | `outlined`
**Padding**: `sm` | `md` | `lg`

## 📚 Storybook

View all components and their variations:

```bash
# From the design system directory
npm run storybook
```

## 🏗️ Architecture

This design system is built for microfrontend architectures:

- **Independent**: Can be used across different MFEs
- **Consistent**: Ensures visual consistency across all PLM applications
- **Flexible**: Easy to extend and customize for specific needs
- **Type-safe**: Full TypeScript support with proper type definitions

## 🛠️ Development

```bash
# Build the design system
npm run build

# Start Storybook for development
npm run storybook

# Watch mode for development
npm run dev
```

## 📈 Usage in PLM Context

Perfect for:
- ✅ Product status indicators
- ✅ Action buttons for CRUD operations
- ✅ Information cards for product/document display
- ✅ Consistent navigation elements
- ✅ Form controls and inputs (coming soon)
- ✅ Data tables and lists (coming soon)

## 🤝 Contributing

When adding new components:
1. Follow existing patterns and TypeScript interfaces
2. Add comprehensive Storybook stories
3. Include proper JSDoc documentation
4. Export from main `index.ts` file
5. Update this README with usage examples

---

Built with ❤️ for PLM teams using microfrontend architecture.
