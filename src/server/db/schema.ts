// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `sous-chef_${name}`);

export const recipes = createTable(
  "recipe",
  {
    id: varchar("id", { length: 64 }).primaryKey(),
    lifetimeId: varchar("lifetime_id", { length: 64 }).notNull(),
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
