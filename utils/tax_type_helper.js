const { Food, Tobacco, Entertaintment, Tax } = require('../utils/tax');

const mapping = {
    1: Food,
    2: Tobacco,
    3: Entertaintment
}

exports.handler = (type, price) => {
    const tax = new Tax();
    tax.setStrategy(new mapping[type]);

    return tax.calculate(price)
}

module.exports = exports;