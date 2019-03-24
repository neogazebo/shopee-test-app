const test = require('ava');
const request = require('supertest');
const sinon = require('sinon');
const db = require('../../../models');
const app = require('../../../app');

test.serial('View my Billing', async (t) => {
    t.context.sandbox.stub(db.Transaction, 'findAll').resolves([{
        Product: {
            name: 'Madu',
            taxCode: 1,
            price: 1000
        },
    }]);

    try {
        const response = await request(app).get('/billing/01');
        t.is(response.status, 200);
        t.deepEqual(response.body, {
            message: 'Success',
            data: {
                transaction: [{
                    name: 'Madu',
                    tax_code: 1,
                    type: 'FOOD',
                    refundable: true,
                    price: 1000,
                    tax: 100,
                    amount: 1100
                }],
                price_subtotal: 1000,
                tax_subtotal: 100,
                grand_total: 1100
            },
            meta: {}
        });
    } catch (err) {
        t.fail(err.message)
    }
});

test.serial('View my Billing FAILED billing not found', async (t) => {
    try {
        t.context.sandbox.stub(db.Transaction, 'findAll').resolves([]);
        const response = await request(app).get('/billing/01');
        t.is(response.status, 404);
        // t.is(response.error.message, 'Transaction Not Found');
    } catch (err) {
        t.fail(err.message)
    }
});

test.beforeEach('Initialize New Sandbox Before Each Test', async (t) => {
    t.context.sandbox = sinon.createSandbox().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', async (t) => {
    t.context.sandbox.restore();
});