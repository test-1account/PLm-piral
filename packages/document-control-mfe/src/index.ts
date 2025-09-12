import type { PiletApi } from 'plm-shell';
import { DocumentControlPage } from './DocumentControlPage';

export function setup(app: PiletApi) {
  // Register the document control page
  app.registerPage('/documents', DocumentControlPage);

  // Register navigation menu item
  app.registerMenu({
    title: 'Documents',
    href: '/documents',
    icon: '📄',
  });

  // Register dashboard tile
  app.registerTile({
    title: 'Document Control',
    description: 'Manage engineering documents and drawings',
    href: '/documents',
    icon: '📄',
  });
}
