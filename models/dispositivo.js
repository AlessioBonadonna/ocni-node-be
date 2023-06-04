const { Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class Dispositivo extends Model{}

Dispositivo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modello: {
      type: DataTypes.STRING,
      allowNull: false
    },
        UserId:{
            type: DataTypes.INTEGER,
            FIELD:'user_id',
        }
    
  }, {
    sequelize,
    modelName: 'dispositivo',
    tableName:'dispositivos',
  });
  
  module.exports = Dispositivo;