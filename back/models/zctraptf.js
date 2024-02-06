module.exports = (sequelize, DataTypes) => {
  const zctraptf = sequelize.define(
    "zctraptf",
    {
      IdCtraPtf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      IdCtraCli: {
        type: DataTypes.INTEGER,
      },
      ISOCode_lmt: {
        type: DataTypes.CHAR(10),
        collate: "utf8_general_ci",
      },
      MktValAaiDevCLIAuc_lcn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      NomLocalProfil_lmt: {
        type: DataTypes.CHAR(50),
        collate: "utf8_general_ci",
      },
      NumeroPtfDep_lmt: {
        type: DataTypes.CHAR(50),
        collate: "utf8_general_ci",
      },
      RaisonSociale_lmt: {
        type: DataTypes.CHAR(50),
        collate: "utf8_general_ci",
      },
      TimeStampCreation: {
        type: DataTypes.DATE,
      },
      TimeStampModification: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true, // prevent automatic pluralization
      timestamps: false,
    }
  );

  // Define associations
  zctraptf.belongsTo(sequelize.models.zctracli, { foreignKey: "IdCtraCli" });

  return zctraptf;
};
