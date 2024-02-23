module.exports = (sequelize, DataTypes) => {
  const zmessage = sequelize.define(
    "zmessage",
    {
      IdMessage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      IdSender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "zctracli", // Referenced table name
          key: "IdCtraCli", // Referenced column name
        },
      },
      IdChat: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      TimeStampCreation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Use Sequelize's NOW function
      },
      TimeStampModification: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Use Sequelize's NOW function
      },
    },
    {
      freezeTableName: true, // prevent Sequelize from pluralizing the table name
      timestamps: false, // disable timestamps (createdAt and updatedAt)
      tableName: "zmessage", // explicitly specify the table name
    }
  );

  return zmessage;
};
