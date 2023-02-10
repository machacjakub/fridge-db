import { isLeft } from "fputils";
import { getDatabase } from "./database/database";

const express = require( 'express' );

const server = async () => {
	const app = express();
	const db = await getDatabase();

	if ( isLeft( db ) ){
		throw db.value;
	}

	app.get( '/items', async ( req: any, res: any ) => {
		const items = await db.value.getAll();
		if ( isLeft( items ) ){
			console.error( items.value );
			return res.status( 500 ).send( items.value );
		}
		res.send( items.value );
	} );

	app.post( '/items', async ( req: any, res: any ) => {
		await db.value.create( req.query );
		console.log( 'Data from postman: ', req.query );
		res.status( 201 ).send( { message: 'User created successfully' } );
	  } );

	// Start the server on port 3000
	app.listen( 3000, () => {
		console.log( 'Server started on http://localhost:3000' );
	} );
};

server();