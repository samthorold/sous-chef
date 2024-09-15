import { sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `sous-chef_${name}`);

export const recipe = createTable("recipes_tbl", {
  id: serial("id").primaryKey(),
  lifetimeId: integer("lifetime_id").notNull(),
  parentId: integer("parent_id"),
  userId: varchar("user_id", { length: 64 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  contentId: varchar("content_id", { length: 64 }).notNull(),
  vectorId: varchar("vector_id", { length: 64 }).notNull(),
});

export const image = createTable("images_tbl", {
  id: serial("id").primaryKey(),
  recipeId: integer("recipe_id").notNull(),
  key: varchar("key", { length: 64 }).notNull(),
  userId: varchar("user_id", { length: 64 }).notNull(),
  url: varchar("url").notNull(),
});
