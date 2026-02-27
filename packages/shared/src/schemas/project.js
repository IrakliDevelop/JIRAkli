"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProjectSchema = exports.insertProjectSchema = exports.projects = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
const user_1 = require("./user");
exports.projects = (0, sqlite_core_1.sqliteTable)('projects', {
    id: (0, sqlite_core_1.text)('id').primaryKey(),
    key: (0, sqlite_core_1.text)('key').notNull().unique(),
    name: (0, sqlite_core_1.text)('name').notNull(),
    description: (0, sqlite_core_1.text)('description'),
    createdById: (0, sqlite_core_1.text)('created_by_id')
        .notNull()
        .references(() => user_1.users.id, { onDelete: 'restrict' }),
    createdAt: (0, sqlite_core_1.integer)('created_at', { mode: 'timestamp_ms' }).notNull(),
    updatedAt: (0, sqlite_core_1.integer)('updated_at', { mode: 'timestamp_ms' }).notNull(),
}, (table) => [
    (0, sqlite_core_1.index)('projects_key_idx').on(table.key),
    (0, sqlite_core_1.index)('projects_created_by_idx').on(table.createdById),
]);
exports.insertProjectSchema = (0, drizzle_zod_1.createInsertSchema)(exports.projects, {
    key: zod_1.z
        .string()
        .min(2)
        .max(6)
        .regex(/^[A-Z]+$/, 'Key must be uppercase letters only'),
    name: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().max(5000).optional(),
});
exports.selectProjectSchema = (0, drizzle_zod_1.createSelectSchema)(exports.projects);
//# sourceMappingURL=project.js.map