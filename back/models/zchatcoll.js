module.exports = (sequelize, DataTypes) => {
  const zchatcoll = sequelize.define(
    "zchatcoll",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      IdChat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "zchat", // Assuming 'zchat' is the name of your 'zchat' table
          key: "IdChat",
        },
      },
      IdColl: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "zcoll", // Assuming 'zcoll' is the name of your 'zcoll' table
          key: "IdColl",
        },
      },
    },
    {
      freezeTableName: true, // prevent automatic pluralization
      timestamps: false,
    }
  );

  // Define associations
  zchatcoll.associate = (models) => {
    // Association with ZCOLL
    zchatcoll.belongsTo(models.zcoll, {
      foreignKey: "IdColl",
    });

    // Association with ZCHAT
    zchatcoll.belongsTo(models.zchat, {
      foreignKey: "IdChat",
    });
  };

  return zchatcoll;
};
