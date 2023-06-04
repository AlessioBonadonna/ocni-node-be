
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Dispositivo = require('./dispositivo');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName:'users'
});

// Aggiungi la relazione uno a molti con la tabella dei dispositivi
User.hasMany(Dispositivo);

module.exports = User;
