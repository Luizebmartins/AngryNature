const { DataTypes } = require('sequelize')
const connection = require('../database')

const phenomenon = connection.define('phenomenon', {
    id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},

    tipo: {
		type: DataTypes.STRING(100),
		allowNull: false
	},

	estado: {
		type: DataTypes.CHAR(4),
		allowNull: false,
	},

	local: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	
    data: {
        type: DataTypes.DATEONLY,
		allowNull: true,
    },

    horas: {
        type: DataTypes.TIME,
		allowNull: true,
    },

    nivel: {
        type: DataTypes.INTEGER,
		allowNull: false,
    },

    arquivo: {
        type: DataTypes.BLOB,
		allowNull: true,
    },

    idEspecialista: {
        type: DataTypes.INTEGER,
		allowNull: true,
        references: {
            model: require('./specialistUserModel'),
            key: 'id'
        }
        
    },

    idUser: {
        type: DataTypes.INTEGER,
		allowNull: true,
        references: {
            model: require('./userModel'),
            key: 'id'
        }
    }

}, {
	tableName: 'phenomenon',
	timestamps: false,
	hooks: {
		afterCreate: (record) => {
			delete record.dataValues.senha
		},
	},
})

phenomenon.sync()

module.exports = phenomenon
