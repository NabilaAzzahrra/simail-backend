'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Mail.init({
    id_criteria: DataTypes.INTEGER,
    location: DataTypes.STRING,
    mail: DataTypes.STRING,
    activity_photo: DataTypes.STRING,
    id_employee: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mail',
  });
  return Mail;
};