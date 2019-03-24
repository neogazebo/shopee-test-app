const test = require('ava');
const sinon = require('sinon');
const Result = require('../../../utils/result');

test.serial('toJSON returns ok', (t) => {
    const result = new Result('success').toJSON();

    t.is('success', result.message);
    t.deepEqual({}, result.data);
    t.deepEqual({}, result.meta);
});

test.serial('empty messsage', (t) => {
    const result = new Result().toJSON();

    t.is(undefined, result.message);
    t.deepEqual({}, result.data);
    t.deepEqual({}, result.meta);
});

test.beforeEach('Initialize New Sandbox Before Each Test', async (t) => {
    t.context.sandbox = sinon.createSandbox().usingPromise(Promise.Promise);
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', async (t) => {
    t.context.sandbox.restore();
});