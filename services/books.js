const db = require('../services/db');

function getMany() {
    const data = db.query('SELECT * FROM quote');

    return data;
}

module.exports = {
    getMany
}