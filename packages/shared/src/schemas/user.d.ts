import { z } from 'zod';
export declare const users: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "users";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "users";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        email: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "email";
            tableName: "users";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        passwordHash: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "password_hash";
            tableName: "users";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        displayName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "display_name";
            tableName: "users";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "created_at";
            tableName: "users";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "updated_at";
            tableName: "users";
            dataType: "date";
            columnType: "SQLiteTimestamp";
            data: Date;
            driverParam: number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "sqlite";
}>;
export declare const insertUserSchema: import("drizzle-zod").BuildSchema<"insert", {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "id";
        tableName: "users";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    email: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "email";
        tableName: "users";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    passwordHash: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "password_hash";
        tableName: "users";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    displayName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "display_name";
        tableName: "users";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "created_at";
        tableName: "users";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "updated_at";
        tableName: "users";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
}, {
    email: z.ZodString;
    displayName: z.ZodString;
}, undefined>;
export declare const selectUserSchema: import("drizzle-zod").BuildSchema<"select", {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "id";
        tableName: "users";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    email: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "email";
        tableName: "users";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    passwordHash: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "password_hash";
        tableName: "users";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    displayName: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "display_name";
        tableName: "users";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "created_at";
        tableName: "users";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
    updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "updated_at";
        tableName: "users";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {}>;
}, undefined, undefined>;
export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type PublicUser = Omit<User, 'passwordHash'>;
