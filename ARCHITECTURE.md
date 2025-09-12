# PLM Microfrontend Architecture

This project demonstrates a proper Piral-based PLM system with separate microfrontends.

## Project Structure

```
plm-piral/
├── package.json                    # Workspace root configuration
├── packages/
│   ├── shell/                      # Piral Shell (Main Container)
│   │   ├── package.json           # Shell dependencies
│   │   ├── tsconfig.json          # Shell TypeScript config
│   │   └── src/
│   │       ├── index.tsx          # Piral instance entry
│   │       ├── layout.tsx         # Shell layout & navigation
│   │       └── index.html         # Shell HTML template
│   │
│   ├── product-management-mfe/     # Product Management MFE
│   │   ├── package.json           # Product MFE dependencies
│   │   ├── tsconfig.json          # Product TypeScript config
│   │   └── src/
│   │       ├── index.ts           # Pilet registration
│   │       └── ProductManagementPage.tsx
│   │
│   ├── document-control-mfe/       # Document Control MFE
│   │   ├── package.json           # Document MFE dependencies
│   │   ├── tsconfig.json          # Document TypeScript config
│   │   └── src/
│   │       ├── index.ts           # Pilet registration
│   │       └── DocumentControlPage.tsx
│   │
│   ├── change-management-mfe/      # 🎯 Change Management MFE
│   └── collaboration-mfe/          # 🎯 Collaboration MFE
```

## Key Principles

### Independent Package Management

- Each MFE has its own package.json
- Independent dependency management
- Separate build and deployment processes
- Own TypeScript configuration

### Workspace Orchestration

- Root package.json only manages workspace
- No business logic in root
- Centralized build commands
- Independent development servers

### Microfrontend Benefits

- Team Independence: Different teams can own different MFEs
- Technology Flexibility: Each MFE can use different versions/libraries
- Independent Deployment: Deploy MFEs without affecting others
- Scalable Development: Add new MFEs without touching existing code

## Development Workflow

### Start Individual MFEs

```bash
# Shell (Main Container)
npm run start:shell

# Individual MFEs (separate terminals)
npm run start:product-mfe
npm run start:document-mfe
npm run start:change-mfe
npm run start:collaboration-mfe
```

### Build for Production

```bash
# Build all packages
npm run build:all

# Or build individually
npm run build --workspace=packages/shell
npm run build --workspace=packages/product-management-mfe
```

## MFE Registration Pattern

Each MFE registers itself with the shell:

```typescript
// packages/product-management-mfe/src/index.ts
export function setup(app: PiletApi) {
  app.registerPage('/products', ProductManagementPage);
  app.registerMenu({ title: 'Products', href: '/products' });
  app.registerTile({ title: 'Product Management', href: '/products' });
}
```

## Deployment Architecture

```
Production Environment:
┌─────────────────┐    ┌─────────────────┐
│   Shell App     │    │  Pilet Feed     │
│  (Container)    │◄───│   Service       │
└─────────────────┘    └─────────────────┘
         │                       ▲
         │                       │
         ▼                       │
┌─────────────────┐              │
│  Load MFEs      │──────────────┘
│  Dynamically    │
└─────────────────┘

Individual MFE Deployments:
├── product-mfe.js     (deployed independently)
├── document-mfe.js    (deployed independently)
├── change-mfe.js      (deployed independently)
└── collaboration-mfe.js (deployed independently)
```

## Benefits Achieved

✅ **Development Speed**: Teams work independently
✅ **Maintainability**: Clear domain boundaries
✅ **Scalability**: Easy to add new features/teams
✅ **Deployment Flexibility**: Independent release cycles
✅ **Technology Evolution**: Gradual modernization possible

## Next Steps

1. **Complete Piral Setup**: Finish shell Piral configuration
2. **Shared Services**: Add authentication, state management
3. **CI/CD Pipeline**: Set up independent deployment pipelines
4. **Pilet Feed**: Configure production pilet distribution
5. **Monitoring**: Add MFE-specific monitoring and logging
