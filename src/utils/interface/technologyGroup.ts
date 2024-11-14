import { Technology } from './technology';

export interface TechnologyGroup {
  frontendFramework: Technology;
  backendFramework: Technology;
  Database: Technology;
  Language: Technology;
  [key: string]: Technology | Technology[]; // Another categories, Services, cssFrameoworks, libraries etc
}
