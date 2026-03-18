import { pgTable, serial, varchar, text, integer, timestamp } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  shortUrl: varchar("short_url", { length: 12 }).notNull().unique(),
  originalUrl: text("original_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});