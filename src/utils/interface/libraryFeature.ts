import { Weight } from './weight';

export interface LibraryFeature {
  name: string;
  desc: string;
  id: string;
  image: string;
  link: string;
  checked: boolean;
  weights: Weight[];
}
