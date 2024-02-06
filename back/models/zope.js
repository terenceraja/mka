module.exports = (sequelize, DataTypes) => {
  const zope = sequelize.define(
    "zope",
    {
      IdOpe: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      IdTypOp: {
        type: DataTypes.INTEGER,
      },
      IdCtraPtf: {
        type: DataTypes.INTEGER,
      },
      CapitalDevLIGN_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      CodeIsin_lst: {
        type: DataTypes.CHAR(50),
        collate: "utf8_general_ci",
      },
      CotOPEASSETDevASSET_lsn: {
        type: DataTypes.DECIMAL(16, 5),
      },
      CptaMontantQte_lcn: {
        type: DataTypes.INTEGER,
      },
      DateCptaOPE_lsd: {
        type: DataTypes.DATE,
      },
      ISOCode_lmt: {
        type: DataTypes.CHAR(10),
        collate: "utf8_general_ci",
      },
      Libelle_lmt: {
        type: DataTypes.CHAR(150),
        collate: "utf8_general_ci",
      },
      NomLocalTypOp_lmt: {
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
  zope.belongsTo(sequelize.models.zctraptf, { foreignKey: "IdCtraPtf" });

  return zope;
};
