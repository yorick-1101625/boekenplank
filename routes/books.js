const express = require('express');
const books = require('../services/books');

const router = express.Router();


router.route('/')
    .get((req, res, next) => {
        try {
            res.json(books.getMany());
        }
        catch (e) {
            next(e);
        }
    })
    .post((req, res, next) => {
        try {
            res.json(books.create(req.body));
        }
        catch (e) {
            next(e);
        }
    })



router.route('/:id')
    .get((req, res, next) => {
        try {
            res.json({id: req.params.id});
        }
        catch (e) {
            next(e);
        }
    })
    .put((req, res, next) => {
        try {
            res.json(books.update(req.params.id, req.body));
        }
        catch (e) {
            next(e);
        }
    })
    .delete((req, res, next) => {
        try {
            res.json(books.remove(req.params.id));
        }
        catch (e) {
            next(e);
        }
    });

module.exports = router;