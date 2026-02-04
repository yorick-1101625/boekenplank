const sqlite = require('better-sqlite3');
const path = require('path');

const db = new sqlite(path.resolve('db/books.db'),{fileMustExist: true});

db.prepare(`
    CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        isbn TEXT NOT NULL UNIQUE,
        author TEXT NOT NULL
    );
`).run();

console.log("Table 'books' successfully created");