export const TICKET_STATUS = [
  'backlog',
  'todo',
  'in_progress',
  'review',
  'done',
] as const;

export type TicketStatus = (typeof TICKET_STATUS)[number];

export const TICKET_PRIORITY = ['low', 'medium', 'high', 'critical'] as const;

export type TicketPriority = (typeof TICKET_PRIORITY)[number];

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
