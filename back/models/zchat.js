module.exports = (sequelize, DataTypes) => {
  const zchat = sequelize.define(
    "zchat",
    {
      IdChat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      IdCtraCli: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "zctracli", // Referenced table name
          key: "IdCtraCli", // Referenced column name
        },
      },
      TimeStampCreation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      TimeStampModification: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Use Sequelize's NOW function
      },
    },
    {
      freezeTableName: true, // prevent automatic pluralization
      timestamps: false,
    }
  );

  // ASSOCIATION EXAMPLE
  zchat.associate = (models) => {
    zchat.hasMany(models.zchatcoll, {
      foreignKey: "IdChat",
      onDelete: "CASCADE",
    }); // Add onDelete option

    zchat.hasMany(models.zchatmsg, {
      foreignKey: "IdChat",
      onDelete: "CASCADE",
    }); // Add onDelete option
  };
  return zchat;
};
