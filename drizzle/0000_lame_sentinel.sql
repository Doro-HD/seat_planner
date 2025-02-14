CREATE TABLE `table` (
	`id` text PRIMARY KEY NOT NULL,
	`human_id` text NOT NULL,
	`position_x` integer NOT NULL,
	`position_y` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `table_human_id_unique` ON `table` (`human_id`);