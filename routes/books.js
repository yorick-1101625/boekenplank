const express = require('express');
const router = express.Router()

router.route('/')
    .get((req, res) => {

        res.json({data: ['book 1', 'book 2']});
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