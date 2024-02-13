module.exports = (sequelize, DataTypes) => {
  const zfile = sequelize.define(
    "zfile",
    {
      IdFile: {
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
      IdManager: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
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
      TimeStampUpload: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      TimeStampCreation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      TimeStampModification: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "0000-00-00 00:00:00",
      },
      Status: {
        type: DataTypes.ENUM("demand", "pending", "accepted", "rejected"),
        defaultValue: "demand",
      },
    },
    {
      freezeTableName: true, // prevent Sequelize from pluralizing the table name
      timestamps: false, // disable timestamps (createdAt and updatedAt)
      tableName: "zfile", // explicitly specify the table name
    }
  );

  // Define associations if needed
  // zfile.belongsTo(sequelize.models.zctracli, { foreignKey: 'IdCtraCli' });

  return zfile;
};
