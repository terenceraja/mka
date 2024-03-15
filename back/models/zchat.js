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

  // ASSOCIATION EXAMPLE
  zchat.associate = (models) => {
    zchat.hasMany(models.zchatcoll, { foreignKey: "IdChat" });
  };

  return zchat;
};
