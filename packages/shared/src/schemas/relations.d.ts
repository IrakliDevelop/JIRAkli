export declare const usersRelations: import("drizzle-orm").Relations<"users", {
    createdProjects: import("drizzle-orm").Many<"projects">;
    assignedTickets: import("drizzle-orm").Many<"tickets">;
    reportedTickets: import("drizzle-orm").Many<"tickets">;
    comments: import("drizzle-orm").Many<"comments">;
}>;
export declare const projectsRelations: import("drizzle-orm").Relations<"projects", {
    createdBy: import("drizzle-orm").One<"users", true>;
    tickets: import("drizzle-orm").Many<"tickets">;
}>;
export declare const ticketsRelations: import("drizzle-orm").Relations<"tickets", {
    project: import("drizzle-orm").One<"projects", true>;
    assignee: import("drizzle-orm").One<"users", false>;
    reporter: import("drizzle-orm").One<"users", true>;
    comments: import("drizzle-orm").Many<"comments">;
}>;
export declare const commentsRelations: import("drizzle-orm").Relations<"comments", {
    ticket: import("drizzle-orm").One<"tickets", true>;
    author: import("drizzle-orm").One<"users", true>;
}>;
