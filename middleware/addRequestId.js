const { v4: uuidv4 } = require("uuid");

function addRequestId(req, _, next) {
    req.id = uuidv4();
    next();
}

module.exports = addRequestId;