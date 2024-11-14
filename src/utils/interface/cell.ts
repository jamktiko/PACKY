export interface Cell {
  row: number;
  col: number;
  item: { name: string; desc: string; tips: string }[];
  id?: string;
}
