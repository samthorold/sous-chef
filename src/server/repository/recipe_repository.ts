export type Recipe = {
  id: string;
  lifetimeId: string;
  parentId: string | null;
  name: string;
  createdAt: Date;
  vectorId: string;
};
