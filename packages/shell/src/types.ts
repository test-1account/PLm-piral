// Simple interface for demo purposes
export interface PiletApi {
  registerPage(route: string, component: React.ComponentType): void;
  registerMenu(config: { title: string; href: string; icon: string }): void;
  registerTile(config: { title: string; description: string; href: string; icon: string }): void;
}
