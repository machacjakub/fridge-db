import sqlite3, { verbose } from 'sqlite3';
import {all, getDatabase as getDatabaseMaybe, run} from 'sqlite-maybe';
import { isLeft, Left, Right } from 'fputils';

interface IItems {
	name: string;
	expire: string;
	count: number;
	state: string;
	category: string;
}

const closeConnection = ( db: sqlite3.Database ) => {
	db.close( ( err ) => {
		if ( err ) {
			console.error( err.message );
		}
		console.log( 'Close the database connection.' );
	} );
};

const sqlInsert = `INSERT INTO items (name, expire, count, state, category) 
             VALUES (?,?,?,?,?)`;

export type Values = [string, string, number, string, string];

export const getDatabase = async () => {
	const db = await getDatabaseMaybe( verbose(), 'users.db' );
	if ( isLeft( db ) ) {
		return Left( `Cannot connect to database: ${db.value.message}` );
	}
	return Right(
		{
			create: ( items:IItems ) => {
				const {name, expire, count, state, category} = items;
				const itemsArray = [name, expire, count, state, category];
				return run( db.value, sqlInsert, itemsArray );
			}, 
			getAll: () => all( db.value, 'SELECT * FROM items;' ),
			delete:'',
		} );
};