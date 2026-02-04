const db = require('../services/db');
db.run('DROP TABLE IF EXISTS books');

db.run(`
    CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        isbn TEXT NOT NULL UNIQUE,
        author TEXT NOT NULL
    );
`);

console.log("Table 'books' successfully created");