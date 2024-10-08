import { relations, sql } from "drizzle-orm";
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
  userId: varchar("user_id", { length: 64 }).notNull(),
  recipeId: integer("recipe_id").notNull(),
  key: varchar("key", { length: 64 }).notNull(),
  url: varchar("url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const recipeRelations = relations(recipe, ({ many }) => ({
  images: many(image),
}));

export const imageRelations = relations(image, ({ one }) => ({
  recipe: one(recipe, {
    fields: [image.recipeId],
    references: [recipe.id],
  }),
}));
