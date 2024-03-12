module.exports = (sequelize, DataTypes) => {
  const znews = sequelize.define(
    "znews",
    {
      IdNews: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      Title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Subtitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      FileName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      FilePath: {
        type: DataTypes.STRING,
        allowNull: true,
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
      freezeTableName: true, // prevent Sequelize from pluralizing the table name
      timestamps: false, // disable timestamps (createdAt and updatedAt)
      tableName: "znews", // explicitly specify the table name
    }
  );

  // Define associations if needed
  // zfile.belongsTo(sequelize.models.zctracli, { foreignKey: 'IdCtraCli' });

  return znews;
};
