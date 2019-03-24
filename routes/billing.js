const express = require('express');
const router = express.Router();
const _ = require('lodash');
const db = require('../models');
const Result = require('../utils/result');
const { TAX_TYPE } = require('../utils/constanta')
const taxHelper = require('../utils/tax_type_helper');
const error = require('../utils/error');


const TAX_CODE = _.invert(TAX_TYPE)

/* POST tax object. */
router.get('/:trx_no', async(req, res, next) => {
    try {

        // get the transaction
        const { trx_no: trxNo} = req.params;
        const transaction = await db.Transaction.findAll({
            where : { trxNo },
            include: [{ model: db.Product, required: true }]
        });

        if (transaction.length === 0) error.throw('Transaction Not Found', 404);

        let priceSubtotal = 0;
        let taxSubtotal = 0;
        const billing = {}

        const data = transaction.map((t) => {
            const { name, taxCode } = t.Product;
            const price = _.toNumber(t.Product.price);

            // calculate tax
            const { amount: taxAmount, refundable } = taxHelper.handler(taxCode, price);
            const priceAmount = taxAmount + price;

            priceSubtotal += price;
            taxSubtotal += taxAmount;

            return {
                name,
                tax_code: taxCode,
                type: TAX_CODE[taxCode],
                refundable,
                price,
                tax: taxAmount,
                amount: priceAmount
            }
        });

        Object.assign(billing, {
            transaction: data,
            price_subtotal: priceSubtotal,
            tax_subtotal: taxSubtotal,
            grand_total: priceSubtotal + taxSubtotal
        })

        const response = new Result('Success', billing)
        res.json(response);
    } catch (err) {
        next(err)
    }
});

module.exports = router;
