CREATE TABLE `comments` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_id` text NOT NULL,
	`author_id` text NOT NULL,
	`content` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`ticket_id`) REFERENCES `tickets`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE INDEX `comments_ticket_idx` ON `comments` (`ticket_id`);--> statement-breakpoint
CREATE INDEX `comments_author_idx` ON `comments` (`author_id`);--> statement-breakpoint
CREATE INDEX `comments_created_at_idx` ON `comments` (`created_at`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`display_name` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `users_email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_by_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`created_by_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_key_unique` ON `projects` (`key`);--> statement-breakpoint
CREATE INDEX `projects_key_idx` ON `projects` (`key`);--> statement-breakpoint
CREATE INDEX `projects_created_by_idx` ON `projects` (`created_by_id`);--> statement-breakpoint
CREATE TABLE `tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`number` integer NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'backlog' NOT NULL,
	`priority` text DEFAULT 'medium' NOT NULL,
	`assignee_id` text,
	`reporter_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`assignee_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`reporter_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tickets_project_number_idx` ON `tickets` (`project_id`,`number`);--> statement-breakpoint
CREATE INDEX `tickets_project_status_idx` ON `tickets` (`project_id`,`status`);--> statement-breakpoint
CREATE INDEX `tickets_assignee_idx` ON `tickets` (`assignee_id`);--> statement-breakpoint
CREATE INDEX `tickets_reporter_idx` ON `tickets` (`reporter_id`);--> statement-breakpoint
CREATE INDEX `tickets_created_at_idx` ON `tickets` (`created_at`);