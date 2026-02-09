const express = require("express");
const morgan = require("morgan");
const errorHandler = require('./middleware/errorHandler');
const addRequestId = require('./middleware/addRequestId');

const app = express();

// Turn on JSON parsing
app.use(express.json());

// Add unique id to each request
app.use(addRequestId);

// Logging
morgan.token("id", req => req.id);
app.use(morgan(":id :method :url :status :response-time ms"));

// Routers
const bookRouter = require('./routes/books');

app.use('/books', bookRouter);

app.use(errorHandler)

app.listen(3000);
