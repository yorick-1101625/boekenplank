const express = require("express");
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Turn on JSON parsing
app.use(express.json());

// Routers
const bookRouter = require('./routes/books');

app.use('/books', bookRouter);

app.use(errorHandler)

app.listen(3000);
