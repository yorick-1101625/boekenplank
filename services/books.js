const db = require('../services/db');

function getMany() {
    const data = db.query('SELECT * FROM quote');

    return data;
}

function create(bookObj) {
    const { title, isbn, author } = bookObj;
    const result = db.run('INSERT INTO books (title, isbn, author) VALUES (@title, @isbn, @author)', {title, isbn, author});

    if (!result.changes) {
        throw new Error("Unexpected error while creating book");
    }

    return true;
}

function update(bookObj) {
    const { title, isbn, author, id } = bookObj;

    const result = db.run('UPDATE books SET title = @title, isbn = @isbn, author = @author WHERE id = @id', {
        title,
        isbn,
        author,
        id
    });

    if (!result.changes) {
        throw new Error("Unexpected error while updating book");
    }

    return true;
}

function remove(bookObj) {
    const {id} = bookObj;
    const result = db.run('DELETE FROM books WHERE id = @id', {id});

    if (!result.changes) {
        throw new Error("Unexpected error while deleting book");
    }

    return true;
}

module.exports = {
    getMany,
    create,
    update,
    remove
}