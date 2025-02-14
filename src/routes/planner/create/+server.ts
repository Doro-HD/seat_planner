import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

import { db } from '$lib/server/db/index';
import { tablesTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const POST: RequestHandler = async ({ cookies, request }) => {
	const sessionId = cookies.get('session');
	if (!sessionId) {
		error(401);
	}

	const body = await request.json();

	await db.transaction(async (tx) => {
		try {
			await tx.delete(tablesTable).where(eq(tablesTable.sessionId, sessionId));

			const tables = body.tables.map(table => ({ ...table, sessionId }));
			await tx.insert(tablesTable).values(tables);
		} catch (err) {
			console.error(err);
			tx.rollback();
		}
	})

	return json(body);
};

export const DELETE: RequestHandler = async ({ locals }) => {
	if (!locals.session) {
		error(401);
	}

	await db.delete(tablesTable).where(eq(tablesTable.sessionId, locals.session));

	return new Response();
};
