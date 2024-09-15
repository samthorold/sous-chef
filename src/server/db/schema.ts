// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator, timestamp, varchar } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `sous-chef_${name}`);

export const recipes = createTable(
  "recipe",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    lifetimeId: varchar("lifetime_id", { length: 64 }).notNull(),
    parentId: varchar("parent_id", { length: 64 }),
    name: varchar("name", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    contentId: varchar("content_id", { length: 64 }).notNull(),
    vectorId: varchar("vector_id", { length: 64 }).notNull(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);
