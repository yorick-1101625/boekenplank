const express = require('express');
const router = express.Router();
const books = require('../services/books');

router.route('/')
    .get((req, res, next) => {
        try {
            res.json(books.getMany());
        }
        catch (e) {
            console.error('Error while getting books: ', e.message);
            next(e);
        }
    })
    .post((req, res) => {
        console.log(req.body)
        res.status(200).json(req.body)
    })
    // .patch()
    // .delete();

router.route('/:id')
    .get((req, res) => {
        res.json({id: req.params.id});
    })
    // .put()

module.exports = router;