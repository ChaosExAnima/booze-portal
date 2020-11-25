/**
 * External dependencies
 */
import knex from 'knex';
import { env } from 'process';

/**
 * Type dependencies
 */
import type { SqliteConnectionOptions, MariaDBConnectionOptions } from 'next-env';

export function getDBConfig(): SqliteConnectionOptions | MariaDBConnectionOptions {
	if ( env.DB_TYPE === 'mariadb' ) {
		return {
			type: 'mariadb',
			host: env.DB_HOST ?? '127.0.0.1',
			user: env.DB_USER ?? 'booze',
			password: env.DB_PASS ?? '',
			database: env.DB_DATABASE ?? 'default',
		};
	}
	return {
		type: 'sqlite',
		filename: env.DB_FILENAME ?? './booze.db',
	};
}

export function getDB(): knex {
	const { type, ...connection } = getDBConfig();
	const dbConfig: knex.Config = {
		debug: env.DB_DEBUG === 'true',
		useNullAsDefault: true,
		client: type === 'mariadb' ? 'mysql' : 'sqlite3',
		connection,
	};
	return knex( dbConfig );
}
