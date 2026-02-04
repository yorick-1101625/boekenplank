const express = require("express");
const app = express();

// Turn on JSON parsing
app.use(express.json());

// Routers
const bookRouter = require('./routes/books');

app.use('/books', bookRouter);

app.listen(3000);
