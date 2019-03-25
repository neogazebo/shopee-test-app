const test = require('ava');
const request = require('supertest');
const sinon = require('sinon');
const db = require('../../../models');
const app = require('../../../app');

test.serial('create Tax Object SUCCESS', async (t) => {
    t.context.sandbox.stub(db.Product, 'findOrCreate').resolves([{
        name: 'Madu',
        taxCode: 1,
        price: 1000
    }]);

    try {
        const response = await request(app).post('/tax').send({
            name: 'Madu',
            tax_code: 1,
            price: 1000
        });
        t.deepEqual(response.body, {
            message: 'success',
            data: {
                name: 'Madu',
                tax_code: 1,
                price: 1000
            },
            meta: {}
        });
        t.is(response.status, 200)
    } catch (err) {
        t.fail(err.message)
    }
});

test.serial('create Tax Object FAILED input validation', async (t) => {
    try {
        const response = await request(app).post('/tax').send({
            name: 'Madu',
            tax_code: 7,
            price: 1000
        });
        t.is(response.status, 400);
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