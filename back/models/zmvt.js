module.exports = (sequelize, DataTypes) => {
  const zmvt = sequelize.define(
    "zmvt",
    {
      IdMvt: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      idAsset: {
        type: DataTypes.INTEGER,
      },
      IdPtf: {
        type: DataTypes.INTEGER,
      },
      CotOPEASSETDevASSET_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      CotOPEDevASSETDevPTF_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      CptaCpteGeneral_lsn: {
        type: DataTypes.INTEGER,
      },
      CptaDateOPE_lsd: {
        type: DataTypes.DATE,
      },
      CptaDateValeur_lsd: {
        type: DataTypes.DATE,
      },
      CptaMontantQteCredit_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      CptaMontantQteDebit_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      FlagExtourne_lcn: {
        type: DataTypes.INTEGER,
      },
      Libelle_lst: {
        type: DataTypes.CHAR(150),
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
  zmvt.belongsTo(sequelize.models.zctraptf, { foreignKey: "IdPtf" });

  return zmvt;
};
