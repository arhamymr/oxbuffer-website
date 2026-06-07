import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const licenses = pgTable(
  "licenses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    key: varchar("key", { length: 32 }).notNull().unique(),
    email: varchar("email", { length: 255 }),
    plan: varchar("plan", { length: 50 }).notNull().default("lifetime"),
    maxDevices: integer("max_devices").notNull().default(1),
    status: varchar("status", { length: 20 }).notNull().default("active"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("licenses_key_idx").on(table.key),
    index("licenses_status_idx").on(table.status),
    index("licenses_created_at_idx").on(table.createdAt),
  ]
);

export const activations = pgTable(
  "activations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    licenseId: uuid("license_id")
      .notNull()
      .references(() => licenses.id, { onDelete: "cascade" }),
    machineFingerprint: varchar("machine_fingerprint", { length: 255 }).notNull(),
    machineInfo: jsonb("machine_info"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at"),
  },
  (table) => [
    index("activations_license_id_idx").on(table.licenseId),
    index("activations_fingerprint_idx").on(table.machineFingerprint),
  ]
);

export const articles = pgTable(
  "articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 200 }).notNull().unique(),
    title: varchar("title", { length: 300 }).notNull(),
    excerpt: varchar("excerpt", { length: 500 }),
    content: text("content").notNull(),
    status: varchar("status", { length: 20 }).notNull().default("draft"),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("articles_slug_idx").on(table.slug),
    index("articles_status_idx").on(table.status),
    index("articles_published_at_idx").on(table.publishedAt),
  ]
);
