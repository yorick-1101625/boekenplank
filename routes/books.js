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
    .post((req, res, next) => {
        try {
            res.json(books.create(req.body));
        }
        catch (e) {
            console.error('Error while adding book: ', e.message);
            next(e);
        }
    })
    .patch((req, res, next) => {
        try {
            res.json(books.update(req.body));
        }
        catch (e) {
            console.error('Error while updating book: ', e.message);
            next(e);
        }
    })
    .delete((req, res, next) => {
        try {
            res.json(books.remove(req.body));
        }
        catch (e) {
            console.error('Error while deleting book: ', e.message);
            next(e);
        }
    });

router.route('/:id')
    .get((req, res) => {
        res.json({id: req.params.id});
    })
    // .put()

module.exports = router;