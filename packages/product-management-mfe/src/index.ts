import type { PiletApi } from 'plm-shell';
import { ProductManagementPage } from './ProductManagementPage';

export function setup(app: PiletApi) {
  // Register the product management page
  app.registerPage('/products', ProductManagementPage);

  // Register navigation menu item
  app.registerMenu({
    title: 'Products',
    href: '/products',
    icon: '📦',
  });

  // Register dashboard tile
  app.registerTile({
    title: 'Product Management',
    description: 'Manage product information and lifecycle',
    href: '/products',
    icon: '📦',
  });
}
