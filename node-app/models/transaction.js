module.exports = function (sequelize, DataTypes) {
	const Transaction = sequelize.define('Transaction', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		trxNo: {
			type: DataTypes.STRING(11),
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
			field: 'created_at'
		}
	}, {
			tableName: 'transaction',
			timestamps: false
		});

	Transaction.associate = models => {
		Transaction.hasOne(models.Product, {
			foreignKey: 'id',
			sourceKey: 'productId'
		});
	};

	return Transaction
};
