'use strict';

const Joi = require('joi');
const error = require('../utils/error');

const CREATE_TAX_SCHEMA = Joi.object().keys({
    name: Joi.string().max(100).required(),
    tax_code: Joi.number().integer().min(1).max(3).required(),
    price: Joi.number().min(0).required()
});

const SCHEMA = {
    postTaxObject: CREATE_TAX_SCHEMA
};

const validate = async (payload, schema) => {
    try {
        return await Joi.validate(payload, SCHEMA[schema]);
    } catch (err) {
        error.throw(err.message.replace(/"/g, ''), 400);
    }
};

module.exports = {
    validate
};