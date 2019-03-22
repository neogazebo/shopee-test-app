module.exports = function (sequelize, DataTypes) {
	const Transaction =  sequelize.define('transaction', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		trxNo: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'trx_no'
		},
		productId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'product_id'
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
		}
	}, {
			tableName: 'transaction',
			timestamps: false
		});

	Transaction.associate = models => {
		ExchangeRate.hasOne(models.Product, {
			foreignKey: 'id',
			sourceKey: 'product_id'
		});
	};

	return Transaction
};
