module.exports = (sequelize, DataTypes) => {
  const zcoll = sequelize.define(
    "zcoll",
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      IdColl: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Name: {
        type: DataTypes.CHAR(50),
        allowNull: false,
      },
      Surname: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        collate: "utf8_general_ci",
      },
      Color: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        collate: "utf8_general_ci",
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
      tableName: "zcoll", // explicitly specify the table name
    }
  );

  return zcoll;
};
