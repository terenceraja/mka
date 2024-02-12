module.exports = (sequelize, DataTypes) => {
  const zctracli = sequelize.define(
    "zctracli",
    {
      IdCtraCli: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ISOCode_lmt: {
        type: DataTypes.CHAR(10),
        collate: "utf8_general_ci",
      },
      Login_lmt: {
        type: DataTypes.CHAR(50),
        collate: "utf8_general_ci",
      },
      Password_lmt: {
        type: DataTypes.CHAR(50),
        collate: "utf8_general_ci",
      },
      WebDerniereMAJ_lsd: {
        type: DataTypes.DATE,
      },
      TimeStampCreation: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      TimeStampModification: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: "0000-00-00 00:00:00",
      },
    },
    {
      freezeTableName: true, // prevent automatic pluralization
      timestamps: false,
    }
  );

  return zctracli;
};
