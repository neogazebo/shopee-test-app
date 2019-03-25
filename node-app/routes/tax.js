const express = require('express');
const router = express.Router();
const Validator = require('../utils/validator');
const db = require('../models');
const Result = require('../utils/result');
const transformer = require('../transformer/tax');

/* POST tax object. */
router.post('/', async(req, res, next) => {
    try {
        // validate input
        const { name, tax_code: taxCode, price } = await Validator.validate(req.body, 'postTaxObject');

        // find or create data to db, return array
        const product = await db.Product.findOrCreate({ 
            where: { name, taxCode, price }
        });

        // return result
        const response = new Result('success', transformer.list(product)[0]);
        res.json(response);
    } catch (err) {
        next(err)
    }
});

module.exports = router;
