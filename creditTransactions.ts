import { pgTable, text, serial, timestamp, integer, numeric } from "drizzle-orm/pg-core";
import { resellersTable } from "./resellers";

export const creditTransactionsTable = pgTable("credit_transactions", {
  id: serial("id").primaryKey(),
  resellerId: integer("reseller_id").notNull().references(() => resellersTable.id),
  resellerName: text("reseller_name").notNull(),
  type: text("type").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  balanceAfter: numeric("balance_after", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type CreditTransaction = typeof creditTransactionsTable.$inferSelect;
