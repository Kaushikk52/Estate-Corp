const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../util/database');


const DashProperty = sequelize.define('DashProperty', {
  // Model attributes are defined here
  propertyOwner: {
    type: DataTypes.STRING,
    allowNull: false
  },
  propertyId: {
    type: DataTypes.STRING
  },
  propertyName: {
    type: DataTypes.STRING,    
  },
  projectName: {
    type: DataTypes.STRING
  },
  propertyType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  propertyVariant: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  locality: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
  },
  bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  totalFloor: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  floorNo: {
    type: DataTypes.STRING
  },
  furnishedStatus: {
    type: DataTypes.STRING
  },
  boundaryWall: {
    type: DataTypes.STRING
  },
  personalWashroom: {
    type: DataTypes.STRING
  },
  balconies: {
    type: DataTypes.STRING
  },
  bathrooms: {
    type: DataTypes.STRING
  },
  pentryCafetria: {
    type: DataTypes.STRING
  },
  facing: {
    type: DataTypes.STRING
  },
  carpetArea: {
    type: DataTypes.STRING
  },
  carpetAreaUnit: {
    type: DataTypes.STRING
  },
  coveredArea: {
    type: DataTypes.STRING
  },
  coveredAreaUnit: {
    type: DataTypes.STRING
  },
  superArea: {
    type: DataTypes.STRING
  },
  superAreaUnit: {
    type: DataTypes.STRING
  },
  plotArea: {
    type: DataTypes.STRING,
  },
  plotAreaUnit: {
    type: DataTypes.STRING
  },
  entranceWidth: {
    type: DataTypes.STRING
  },
  entranceWidthUnit: {
    type: DataTypes.STRING
  },
  monthlyRent: {
    type: DataTypes.STRING
  },
  mintanceCharge: {
    type: DataTypes.STRING
  },
  mintanceChargeUnit: {
    type: DataTypes.STRING
  },
  possesionStatus: {
    type: DataTypes.STRING
  },
  constructionAge: {
    type: DataTypes.STRING
  },
  availabilityMonth: {
    type: DataTypes.STRING
  },
  availabilityYear: {
    type: DataTypes.STRING
  },
  rentNagociablePrice: {
    type: DataTypes.STRING
  },
  expectedPrice: {
    type: DataTypes.STRING
  },
  expectedPriceType: {
    type: DataTypes.STRING
  },
  saleNagociablePrice: {
    type: DataTypes.STRING
  },
  amenities: {
    type: DataTypes.STRING
  },
  defaultImage: {
    type: DataTypes.STRING
  },
  images: {
    type: DataTypes.STRING
  },
  isAprove: {
    type: DataTypes.NUMBER,
    defaultValue: 0
  }
});

// Export the User model
module.exports = DashProperty;