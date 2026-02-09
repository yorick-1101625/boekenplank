const express = require('express');
const books = require('../services/books');

const router = express.Router();


router.route('/')
    .get((req, res, next) => {
        try {
            res.json({
                "data": books.getMany(),
                "meta": {
                    "request_id": req.id
                }
            });
        }
        catch (e) {
            next(e);
        }
    })
    .post((req, res, next) => {
        try {
            res.json({
                "data": books.create(req.body),
                "meta": {
                    "request_id": req.id
                }
            });
        }
        catch (e) {
            next(e);
        }
    });



router.route('/:id')
    .get((req, res, next) => {
        try {
            res.json({
                "data": books.getOne(req.params.id),
                "meta": {
                    "request_id": req.id
                }
            });

        }
        catch (e) {
            next(e);
        }
    })
    .put((req, res, next) => {
        try {
            res.json({
                "data": books.update(req.params.id, req.body),
                "meta": {
                    "request_id": req.id
                }
            });
        }
        catch (e) {
            next(e);
        }
    })
    .delete((req, res, next) => {
        try {
            res.json({
                "data": books.remove(req.params.id),
                "meta": {
                    "request_id": req.id
                }
            });

        }
        catch (e) {
            next(e);
        }
    });

module.exports = router;