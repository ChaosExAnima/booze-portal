/// <reference types="next" />
/// <reference types="next/types/global" />

export interface SqliteConnectionOptions {
	type: 'sqlite';
	filename: string;
}

export interface MariaDBConnectionOptions {
	type: 'mariadb';
	host: string;
	user: string;
	password: string;
	database: string;
	port?: string;
}
