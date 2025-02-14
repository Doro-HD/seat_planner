ALTER TABLE `table` RENAME TO `tables`;--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
DROP INDEX `table_human_id_unique`;--> statement-breakpoint
ALTER TABLE `tables` ADD `session_id` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `tables_human_id_unique` ON `tables` (`human_id`);