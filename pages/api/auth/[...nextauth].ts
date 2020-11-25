/**
 * External dependencies
 */
import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import { env } from 'process';
import { getDBConfig } from 'lib/db';

import type { NextApiRequest, NextApiResponse } from 'next';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

function getOptions(): InitOptions {
	const dbConfig = getDBConfig();
	let database: SqliteConnectionOptions | MysqlConnectionOptions = {
		type: 'sqlite',
		database: 'filename' in dbConfig ? dbConfig.filename : '',
		synchronize: env.DB_DEBUG === 'true',
	};
	if ( dbConfig.type === 'mariadb' ) {
		database = {
			type: 'mariadb',
			host: dbConfig.host,
			username: dbConfig.user,
			password: dbConfig.password,
			port: dbConfig.port ? Number.parseInt( dbConfig.port ) : undefined,
			synchronize: env.DB_DEBUG === 'true',
		};
	}

	return {
		providers: [
			Providers.Google( {
				clientId: env.GOOGLE_CLIENT_ID || 'test_id',
				clientSecret: env.GOOGLE_CLIENT_SECRET || 'test_secret',
			} ),
			Providers.Email( {
				server: {
					host: env.EMAIL_SERVER_HOST || 'example.com',
					port: Number.parseInt( env.EMAIL_SERVER_PORT || '587' ),
					auth: {
						user: env.EMAIL_SERVER_USER || 'username',
						pass: env.EMAIL_SERVER_PASSWORD || 'password',
					},
				},
				from: env.EMAIL_FROM,
			} ),
		],
		database,
		secret: env.AUTH_SECRET || undefined,
		debug: env.AUTH_DEBUG === 'true',
		callbacks: {
			signIn: async ( user ) => {
				let validUser = 'id' in user;
				if ( ! validUser && user ) {
					validUser = false; // TODO: Get list of valid users.
				}
				return Promise.resolve( validUser );
			},
		},
	};
}

export default ( req: NextApiRequest, res: NextApiResponse ) => NextAuth( req, res, getOptions() );
