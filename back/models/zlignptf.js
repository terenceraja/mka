module.exports = (sequelize, DataTypes) => {
  const zlignptf = sequelize.define(
    "zlignptf",
    {
      IdLignPtf: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      IdCtraPtf: {
        type: DataTypes.INTEGER,
      },
      IdAsset: {
        type: DataTypes.INTEGER,
      },
      CodeIsin_lst: {
        type: DataTypes.CHAR(50),
        collate: "utf8_general_ci",
      },
      CpnCourusTotDevCLI_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      CpnCourusTotDevPTF_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      CurrISOCode_lxt: {
        type: DataTypes.CHAR(10),
        collate: "utf8_general_ci",
      },
      DateMaturite_lsd: {
        type: DataTypes.DATE,
      },
      EtatActiviteLign_lsn: {
        type: DataTypes.INTEGER,
      },
      LangueNomLocalAlloc_lmt: {
        type: DataTypes.CHAR(50),
        collate: "utf8_general_ci",
      },
      Libelle_lmt: {
        type: DataTypes.CHAR(150),
        collate: "utf8_general_ci",
      },
      MktCOTDevLIGN_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      MktCotYieldDevLIGNAff_lcn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      MVAaiJCptaDevCLI_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      MVAaiJCptaDevPTF_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      MVJCptaDevCLI_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      MVJCptaDevLIGN_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      MVJCptaDevPTF_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      NomLocalAlloc_lmt: {
        type: DataTypes.CHAR(150),
        collate: "utf8_general_ci",
      },
      PCTPlusValKpYtoDDevLIGNDebutAnnee_lcn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      PMA_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      SoldeCptaDateArrete_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      TauxBase_lmn: {
        type: DataTypes.INTEGER,
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
  zlignptf.belongsTo(sequelize.models.zctraptf, { foreignKey: "IdCtraPtf" });

  return zlignptf;
};
