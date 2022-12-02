export type Elf = {
  x: number;
  y: number;
  calories: number[];
  total: number;
  scale: number;
  ranking: number;
}

export const emptyElf = (): Elf => ({
  x: 0,
  y: 0,
  calories: [],
  total: 0,
  scale: 0,
  ranking: 0,
});
