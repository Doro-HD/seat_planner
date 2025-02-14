import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"

import { db } from "$lib/server/db";

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		return redirect(303, '/')
	}

	const tables = await db.query.tablesTable.findMany({
		where: (table, { eq }) => eq(table.sessionId, locals.session)
	});

	return {
		tables
	};
}
