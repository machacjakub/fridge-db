import sqlite3 from 'sqlite3';
 
// open the database
const db = new sqlite3.Database( 'users.db', ( err ) => {
	if ( err ) {
		console.error( err.message );
	}
	console.log( 'Connected to the SQLite database.' );
} );
 
// create a table
db.run( `CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  expire TEXT NOT NULL,
  count INTEGER NOT NULL,
  state TEXT NOT NULL,
  category TEXT NOT NULL
)`, ( err ) => {
	if ( err ) {
		console.error( err.message );
	}
	console.log( 'Table created successfully' );
} );

// close the database connection
db.close( ( err ) => {
	if ( err ) {
		console.error( err.message );
	}
	console.log( 'Close the database connection.' );
} );