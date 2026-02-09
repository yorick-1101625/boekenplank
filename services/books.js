const db = require('../services/db');
const ApiError = require('../errors/ApiError');

function getMany() {
    return db.query('SELECT * FROM books');
}

function getOne(bookId) {
    return db.query('SELECT * FROM books WHERE id = @bookId', {bookId});
}

function validateBook(bookObj) {
    let details = [];

    if (!bookObj.title) {
        details.push({ field: "title", reason: "Title is required." });
    }

    if (!bookObj.isbn) {
        details.push({ field: "isbn", reason: "ISBN is required." });
    }

    if (!bookObj.author) {
        details.push({ field: "author", reason: "Author is required." });
    }

    if (details.length > 0) {
        throw new ApiError("Missing required fields", 422, "VALIDATION_ERROR", details);
    }
}

function create(bookObj) {
    validateBook(bookObj);
    const { title, isbn, author } = bookObj;

    const isbnExists = db.query('SELECT * FROM books WHERE isbn = @isbn', {isbn});
    if (isbnExists && isbnExists.length > 0) {
        throw new ApiError("Book with this ISBN already exists.", 409, "ISBN_ALREADY_EXISTS");
    }

    const result = db.run('INSERT INTO books (title, isbn, author) VALUES (@title, @isbn, @author)', {title, isbn, author});

    if (!result.changes) {
        throw new ApiError("Unexpected error while creating book.", 500, "INTERNAL_SERVER_ERROR");
    }

    return true;
}

function update(bookId, bookObj) {
    validateBook(bookObj);
    const { title, isbn, author } = bookObj;

    const bookExists = db.query('SELECT * FROM books WHERE id = @bookId', {bookId});
    if (!bookExists || bookExists.length === 0) {
        throw new ApiError(`Book with id '${bookId}' does not exist.`, 400, "RESOURCE_NOT_FOUND");
    }

    const result = db.run('UPDATE books SET title = @title, isbn = @isbn, author = @author WHERE id = @bookId', {
        title,
        isbn,
        author,
        bookId
    });

    if (!result.changes) {
        throw new ApiError("Unexpected error while updating book.", 500, "INTERNAL_SERVER_ERROR");
    }

    return true;
}

function remove(bookId) {

    const bookExists = db.query('SELECT * FROM books WHERE id = @bookId', {bookId});
    if (!bookExists || bookExists.length === 0) {
        throw new ApiError(`Book with id '${bookId}' does not exist.`, 400, "RESOURCE_NOT_FOUND");
    }

    const result = db.run('DELETE FROM books WHERE id = @bookId', {bookId});

    if (!result.changes) {
        throw new ApiError("Unexpected error while deleting book.", 500, "INTERNAL_SERVER_ERROR");
    }

    return true;
}

module.exports = {
    getMany,
    getOne,
    create,
    update,
    remove
}