exports.single = (data) => ({ name: data.name, tax_code: data.taxCode, price: data.price });

exports.list = (dataList) => dataList.map(this.single);