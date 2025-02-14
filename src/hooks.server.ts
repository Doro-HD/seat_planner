import type { Handle } from "@sveltejs/kit";

import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

import { db } from "$lib/server/db";
import { sessionsTable } from "$lib/server/db/schema";

function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);

	return token;
}

export const handle: Handle = async ({ resolve, event }) => {
	let session = event.cookies.get('session');
	if (!session) {
		const token = generateSessionToken();
		const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

		await db.insert(sessionsTable).values({ id: sessionId });

		event.cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)

		});
		session = sessionId;
	}
	event.locals.session = session;

	return resolve(event);
};
