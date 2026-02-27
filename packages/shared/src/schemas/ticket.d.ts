import { z } from 'zod';
export declare const tickets: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "tickets";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "id";
            tableName: "tickets";
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
        projectId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "project_id";
            tableName: "tickets";
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
        number: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "number";
            tableName: "tickets";
            dataType: "number";
            columnType: "SQLiteInteger";
            data: number;
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
        title: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "title";
            tableName: "tickets";
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
        description: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "description";
            tableName: "tickets";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
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
        status: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "status";
            tableName: "tickets";
            dataType: "string";
            columnType: "SQLiteText";
            data: "backlog" | "todo" | "in_progress" | "review" | "done";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["backlog", "todo", "in_progress", "review", "done"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        priority: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "priority";
            tableName: "tickets";
            dataType: "string";
            columnType: "SQLiteText";
            data: "low" | "medium" | "high" | "critical";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["low", "medium", "high", "critical"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            length: number | undefined;
        }>;
        assigneeId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "assignee_id";
            tableName: "tickets";
            dataType: "string";
            columnType: "SQLiteText";
            data: string;
            driverParam: string;
            notNull: false;
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
        reporterId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
            name: "reporter_id";
            tableName: "tickets";
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
            tableName: "tickets";
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
            tableName: "tickets";
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
export declare const insertTicketSchema: import("drizzle-zod").BuildSchema<"insert", {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "id";
        tableName: "tickets";
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
    projectId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "project_id";
        tableName: "tickets";
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
    number: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "number";
        tableName: "tickets";
        dataType: "number";
        columnType: "SQLiteInteger";
        data: number;
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
    title: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "title";
        tableName: "tickets";
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
    description: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "description";
        tableName: "tickets";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
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
    status: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "status";
        tableName: "tickets";
        dataType: "string";
        columnType: "SQLiteText";
        data: "backlog" | "todo" | "in_progress" | "review" | "done";
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: ["backlog", "todo", "in_progress", "review", "done"];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    priority: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "priority";
        tableName: "tickets";
        dataType: "string";
        columnType: "SQLiteText";
        data: "low" | "medium" | "high" | "critical";
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: ["low", "medium", "high", "critical"];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    assigneeId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "assignee_id";
        tableName: "tickets";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
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
    reporterId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "reporter_id";
        tableName: "tickets";
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
        tableName: "tickets";
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
        tableName: "tickets";
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
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, undefined>;
export declare const selectTicketSchema: import("drizzle-zod").BuildSchema<"select", {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "id";
        tableName: "tickets";
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
    projectId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "project_id";
        tableName: "tickets";
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
    number: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "number";
        tableName: "tickets";
        dataType: "number";
        columnType: "SQLiteInteger";
        data: number;
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
    title: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "title";
        tableName: "tickets";
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
    description: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "description";
        tableName: "tickets";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
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
    status: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "status";
        tableName: "tickets";
        dataType: "string";
        columnType: "SQLiteText";
        data: "backlog" | "todo" | "in_progress" | "review" | "done";
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: ["backlog", "todo", "in_progress", "review", "done"];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    priority: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "priority";
        tableName: "tickets";
        dataType: "string";
        columnType: "SQLiteText";
        data: "low" | "medium" | "high" | "critical";
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: ["low", "medium", "high", "critical"];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
    }, {}, {
        length: number | undefined;
    }>;
    assigneeId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "assignee_id";
        tableName: "tickets";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
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
    reporterId: import("drizzle-orm/sqlite-core").SQLiteColumn<{
        name: "reporter_id";
        tableName: "tickets";
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
        tableName: "tickets";
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
        tableName: "tickets";
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
export type Ticket = z.infer<typeof selectTicketSchema>;
export type InsertTicket = z.infer<typeof insertTicketSchema>;
