// Define the interface for the props that the SearchBar component will receive
export interface SearchBarProps {
  name: string;
  desc: string;
  image: string;
  link: string;
  weights: { weight: number }[];
  checked: boolean;
}
