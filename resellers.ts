import { pgTable, text, serial, timestamp, integer, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const resellersTable = pgTable("resellers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  status: text("status").notNull().default("active"),
  creditBalance: numeric("credit_balance", { precision: 10, scale: 2 }).notNull().default("0"),
  notes: text("notes"),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertResellerSchema = createInsertSchema(resellersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertReseller = z.infer<typeof insertResellerSchema>;
export type Reseller = typeof resellersTable.$inferSelect;
