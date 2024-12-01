// place files you want to import through the `$lib` alias in this folder.
import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '$lib/server/db/schema';

if (!DATABASE_URL) throw new Error('DATABASE_URL no fue definida en entorno');


const client = createClient({ url: DATABASE_URL });

export const db = drizzle(client, {schema ,casing: 'snake_case' });