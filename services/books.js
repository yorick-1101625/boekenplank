const db = require('../services/db');
const ApiError = require('../errors/ApiError');

function getMany() {
    const data = db.query('SELECT * FROM books');

    return data;
}

function validateBook(bookObj) {
    if (!bookObj) {
        throw new ApiError("No body found.", 400, "invalid_argument");
    }

    if (!bookObj.title) {
        throw new ApiError("No title found.", 400, "invalid_argument");
    }

    if (!bookObj.isbn) {
        throw new ApiError("No ISBN found.", 400, "invalid_argument");
    }

    if (!bookObj.author) {
        throw new ApiError("No author found.", 400, "invalid_argument");
    }
}

function create(bookObj) {
    validateBook(bookObj);
    const { title, isbn, author } = bookObj;

    const isbnExists = db.query('SELECT * FROM books WHERE isbn = @isbn', {isbn});
    if (isbnExists && isbnExists.length > 0) {
        throw new ApiError("Book with this ISBN already exists.", 400, "invalid_argument");
    }

    const result = db.run('INSERT INTO books (title, isbn, author) VALUES (@title, @isbn, @author)', {title, isbn, author});

    if (!result.changes) {
        throw new ApiError("Unexpected error while creating book.", 500, "internal_server_error");
    }

    return true;
}

function update(bookObj) {
    validateBook(bookObj);
    const { title, isbn, author, id } = bookObj;

    const bookExists = db.query('SELECT * FROM books WHERE id = @id', {id});
    if (!bookExists || bookExists.length === 0) {
        throw new ApiError(`Book with id ${id} does not exist.`, 400, "invalid_argument");
    }

    const result = db.run('UPDATE books SET title = @title, isbn = @isbn, author = @author WHERE id = @id', {
        title,
        isbn,
        author,
        id
    });

    if (!result.changes) {
        throw new ApiError("Unexpected error while updating book.", 500, "internal_server_error");
    }

    return true;
}

function remove(bookObj) {
    const {id} = bookObj;

    const bookExists = db.query('SELECT * FROM books WHERE id = @id', {id});
    if (!bookExists || bookExists.length === 0) {
        throw new ApiError(`Book with id ${id} does not exist.`, 400, "invalid_argument");
    }

    const result = db.run('DELETE FROM books WHERE id = @id', {id});

    if (!result.changes) {
        throw new ApiError("Unexpected error while deleting book.", 500, "internal_server_error");
    }

    return true;
}

module.exports = {
    getMany,
    create,
    update,
    remove
}