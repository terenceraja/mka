// Define the Message model
module.exports = (sequelize, DataTypes) => {
  const zchatmsg = sequelize.define(
    "zchatmsg",
    {
      IdMsg: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      IdChat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "zchat",
          key: "IdChat",
        },
      },
      IdSender: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      SenderType: {
        type: DataTypes.ENUM("Collaborator", "Client"),
        allowNull: false,
      },
      TimeStampCreation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      TimeStampModification: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  // Define associations
  zchatmsg.associate = (models) => {
    // Association with Chat
    zchatmsg.belongsTo(models.zchat, {
      foreignKey: "IdChat",
    });

    // Define the association with the zcoll model
    zchatmsg.belongsTo(models.zcoll, {
      foreignKey: "IdSender",
      as: "Collaborator",
    });
  };

  return zchatmsg;
};
