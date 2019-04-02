'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advertisement = sequelize.define('Advertisement', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    topicId: {
    	type: DataTypes.INTEGER,
    	onDelete: "CASCADE",
    	references: {
    		model: "Topic",
    		key: "id",
    		as: "topicId",
    	}
    }
  }, {});
  Advertisement.associate = function(models) {
    // associations can be defined here
    Advertisement.belongsTo(models.Topic, {
    	foreignkey: "topicId",
    	onDelete: "CASCADE",
    });
  };
  return Advertisement;
};