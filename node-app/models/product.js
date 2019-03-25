module.exports = function (sequelize, DataTypes) {
	const Product =  sequelize.define('Product', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			defaultValue: ''
		},
		taxCode: {
			type: DataTypes.INTEGER(2),
			field: 'tax_code'
		},
		price: {
			type: DataTypes.DECIMAL
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'created_at'
		}
	}, {
			tableName: 'product',
			timestamps: false
		});

	return Product;
};
