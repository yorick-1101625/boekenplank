const db = require('../services/db');

function getMany() {
    const data = db.query('SELECT * FROM quote');

    return data;
}

function create(bookObj) {
    const { title, isbn, author } = bookObj;
    const result = db.run('INSERT INTO books (title, isbn, author) VALUES (@title, @isbn, @author)', {title, isbn, author});

    let message = 'Error in creating book';
    if (result.changes) {
        message = 'Book created successfully';
    }

    return message;
}

module.exports = {
    getMany,
    create
}