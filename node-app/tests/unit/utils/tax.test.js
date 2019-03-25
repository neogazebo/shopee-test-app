const test = require('ava');
const { Tax, Food, Tobacco, Entertaintment } = require('../../../utils/tax');

const tax = new Tax();

test.serial('Calculate Food Tax SUCCESS', (t) => {
    const food = new Food();
    tax.setStrategy(food);

    const taxAmount = tax.calculate(1000);

    t.deepEqual(taxAmount, {
        amount: 100,
        refundable: true
    });
});

test.serial('Calculate Tobacco Tax SUCCESS', (t) => {
    const food = new Tobacco();
    tax.setStrategy(food);

    const taxAmount = tax.calculate(1000);

    t.deepEqual(taxAmount, {
        amount: 30,
        refundable: false
    });
});

test.serial('Calculate Entertaintment Tax below 100 SUCCESS', (t) => {
    const food = new Entertaintment();
    tax.setStrategy(food);

    const taxAmount = tax.calculate(90);

    t.deepEqual(taxAmount, {
        amount: 0,
        refundable: false
    });
});

test.serial('Calculate Entertaintment Tax after 100 SUCCESS', (t) => {
    const food = new Entertaintment();
    tax.setStrategy(food);

    const taxAmount = tax.calculate(1000);

    t.deepEqual(taxAmount, {
        amount: 9,
        refundable: false
    });
});
