export declare const TICKET_STATUS: readonly ["backlog", "todo", "in_progress", "review", "done"];
export type TicketStatus = (typeof TICKET_STATUS)[number];
export declare const TICKET_PRIORITY: readonly ["low", "medium", "high", "critical"];
export type TicketPriority = (typeof TICKET_PRIORITY)[number];
export declare const DEFAULT_PAGE_SIZE = 20;
export declare const MAX_PAGE_SIZE = 100;
