import { relations } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const sessionsTable = sqliteTable('sessions', {
	id: text('id').primaryKey()
});

export const sessionsRelation = relations(sessionsTable, ({ many }) => {
	return {
		tables: many(tablesTable)
	};
});

export const tablesTable = sqliteTable('tables', {
	id: text('id').primaryKey(),
	humanId: text('human_id').notNull(),
	positionX: integer('position_x').notNull(),
	positionY: integer('position_y').notNull(),
	sessionId: text('session_id').notNull()
});

export const tablesRelation = relations(tablesTable, ({ one }) => {
	return {
		session: one(sessionsTable, {
			fields: [tablesTable.sessionId],
			references: [sessionsTable.id]
		})
	};
});
