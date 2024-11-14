export interface Feature {
  row: number; // Row position in the grid
  col: number; // Column position in the grid
  item: { name: string; desc: string; tips: string }[]; // Array containing features name and desc
}
