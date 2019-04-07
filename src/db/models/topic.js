'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    title: {
      type: DataTypes.STRING,
      allowNUll: false
    },
    description: {
      type: DataTypes.STRING,
      allowNUll: false
    }
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
    	foreignKey: "topicID",
    	as: "banners",
    });

    Topic.hasMany(models.Post, {
      foreignKey: "topicID",
      as: "posts"
    });
  };
  return Topic;
};