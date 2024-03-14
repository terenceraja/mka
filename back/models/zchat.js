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
    },
    {
      freezeTableName: true, // prevent automatic pluralization
      timestamps: false,
    }
  );

  return zchat;
};
