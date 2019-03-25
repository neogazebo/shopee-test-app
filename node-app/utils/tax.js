const Tax = function(taxCode) {
    this.taxCode = taxCode
}

Tax.prototype = {
    setStrategy: function(type) {
        this.type = type;
    },

    calculate: function(price) {
        return this.type.calculate(price)
    }
}

const Food = function() {
    this.calculate = price => ({
        amount: 0.1 * price,
        refundable: true
    })
}

const Tobacco = function () {
    this.calculate = price => ({
        amount: (0.02 * price) + 10,
        refundable: false
    })
}

const Entertaintment = function () {
    this.calculate = (price) => {
        let amount = 0;
        if (price >= 100) amount = (price - 100) * 0.01;
        
        return {
            amount,
            refundable: false
        }
    }
}

module.exports = { Tax, Food, Tobacco, Entertaintment };