const Property = require("../models/property");
const DashProperty = require("../models/dashProperty");
const path = require('path');
const fs = require('fs');

const getValueOrDefault = (value, defaultValue = null) => {
  return value === undefined || value === "" ? defaultValue : value;
};

//Add Property
exports.postProperty = async (req, res) => {
  try {
    console.log("Property data", req.body);
    console.log("files", req.files);

    const {
      propertyId,
      propertyOwner,
      propertyName,
      projectName,
      propertyType,
      propertyVariant,
      city,
      locality,
      address,
      bedrooms,
      totalFloor,
      floorNo,
      furnishedStatus,
      boundaryWall,
      personalWashroom,
      balconies,
      bathrooms,
      pentryCafetria,
      facing,
      carpetArea,
      carpetAreaUnit,
      coveredArea,
      coveredAreaUnit,
      superArea,
      superAreaUnit,
      plotArea,
      plotAreaUnit,
      entranceWidth,
      entranceWidthUnit,
      monthlyRent,
      mintanceCharge,
      mintanceChargeUnit,
      possesionStatus,
      constructionAge,
      availabilityMonth,
      availabilityYear,
      rentNegotiablePrice,
      expectedPrice,
      expectedPriceType,
      saleNegotiablePrice,
      amenities,
      defaultImage,
    } = req.body;

    const images = req.files.map((file) => ({ filename: file.filename }));

    // Handle missing or empty fields
    const propertyData = {
      propertyId: getValueOrDefault(propertyId),
      propertyOwner: getValueOrDefault(propertyOwner),
      propertyName: getValueOrDefault(propertyName),
      projectName: getValueOrDefault(projectName),
      propertyType: getValueOrDefault(propertyType),
      propertyVariant: getValueOrDefault(propertyVariant),
      city: getValueOrDefault(city),
      locality: getValueOrDefault(locality),
      address: getValueOrDefault(address),
      bedrooms: getValueOrDefault(bedrooms, null),
      totalFloor: getValueOrDefault(totalFloor, null),
      floorNo: getValueOrDefault(floorNo, null),
      furnishedStatus: getValueOrDefault(furnishedStatus),
      boundaryWall: getValueOrDefault(boundaryWall),
      personalWashroom: getValueOrDefault(personalWashroom),
      balconies: getValueOrDefault(balconies, null),
      bathrooms: getValueOrDefault(bathrooms, null),
      pentryCafetria: getValueOrDefault(pentryCafetria),
      facing: getValueOrDefault(facing),
      carpetArea: getValueOrDefault(carpetArea, null),
      carpetAreaUnit: getValueOrDefault(carpetAreaUnit),
      coveredArea: getValueOrDefault(coveredArea, null),
      coveredAreaUnit: getValueOrDefault(coveredAreaUnit),
      superArea: getValueOrDefault(superArea, null),
      superAreaUnit: getValueOrDefault(superAreaUnit),
      plotArea: getValueOrDefault(plotArea, null),
      plotAreaUnit: getValueOrDefault(plotAreaUnit),
      entranceWidth: getValueOrDefault(entranceWidth, null),
      entranceWidthUnit: getValueOrDefault(entranceWidthUnit),
      monthlyRent: getValueOrDefault(monthlyRent, null),
      mintanceCharge: getValueOrDefault(mintanceCharge, null),
      mintanceChargeUnit: getValueOrDefault(mintanceChargeUnit),
      possesionStatus: getValueOrDefault(possesionStatus),
      constructionAge: getValueOrDefault(constructionAge),
      availabilityMonth: getValueOrDefault(availabilityMonth),
      availabilityYear: getValueOrDefault(availabilityYear),
      rentNegotiablePrice: getValueOrDefault(rentNegotiablePrice, null),
      expectedPrice: getValueOrDefault(expectedPrice),
      expectedPriceType: getValueOrDefault(expectedPriceType),
      saleNegotiablePrice: getValueOrDefault(saleNegotiablePrice, null),
      amenities: getValueOrDefault(amenities),
      defaultImage: getValueOrDefault(defaultImage),
      images: JSON.stringify(images), // Store images as JSON string
    };

    const property = await Property.create(propertyData);
    const dashProperty = await DashProperty.create(propertyData);
    if (property && dashProperty) {
      res.send({
        message: "Property and Dashboard property created successfully",
      });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        error: "Property and Dashboard property creation failed",
        details: err.message,
      });
  }
};

// Get All Properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    

    for (const property of properties) {
      const images = property.images;
      // console.log("images",images)
      images.forEach(image => {
        const imagePath = path.join("D:/A9 Projects/Estate-Corp/Back/", 'uploads/', image.filename); 
        if (fs.existsSync(imagePath)) {
          const imageBuffer = fs.readFileSync(imagePath);
          property.defaultImage = imageBuffer.toString('base64');
        } else {
          property.imageData = null; 
        }
      });
    }
    res.json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve properties' });
  }
};

//Get property Details
exports.getPropertyDetails = async (req, res) => {
    try {
        const {propertyId} = req.params;
        const property = await Property.findOne({ where: { propertyId: req.params.propertyId } });
        if (property.dataValues.amenities) {
            property.dataValues.amenities =
            property.dataValues.amenities.split(",");
        }
    
        if (property.dataValues.images) {
            property.dataValues.images = JSON.parse(property.dataValues.images);
        }  
        res.send(property);
        console.log("after split", property.dataValues);
    }catch(err){
        res.send(JSON.stringify({ error: err }));
        console.log(err);
    }
};

//Get properties by city and bedrooms
exports.getPropertiesByCityBedrooms = async (req, res) => {
  const { city, propertyType } = req.query;
  try {
    console.log(`city: ${city} & property-type: ${propertyType}`);
    const properties = await Property.findAll({
      where: { city: city, bedrooms: propertyType },
    });
    // console.log(properties);
    return res.send(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get all approved properties
exports.getApprovedProperties = async (req, res) => {
  try {
    const approvedDashProperty = await DashProperty.findAll({
      where: { isApprove: true },
    });
    console.log(approvedDashProperty);
    res.send(approvedDashProperty);
  } catch (err) {
    console.log(err);
    res.send(JSON.stringify({ error: err }));
  }
};

//Get all un-approved properties
exports.getNotApprovedProperties = async (req, res) => {
  try {
    const unapprovedDashProperty = await DashProperty.findAll({
      where: { isApprove: false },
    });
    // console.log(unapprovedDashProperty)
    res.send(unapprovedDashProperty);
  } catch (err) {
    console.log(err);
    res.send(JSON.stringify({ error: err }));
  }
};

// approve property
exports.approveProperty = async (req, res) => {
    const { id } = req.query;
    try {
        const existingProperty = await Property.findOne({
            where: { propertyId: id }
        });
        if (!existingProperty) {
            return res.status(404).json({ message: "Property not found" });
        }
        existingProperty.isApproved = 1;
        await existingProperty.save();
        res.status(200).json({ message: "Property approved successfully" });
    } catch (err) {
        console.error("Error approving property:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// unapprove property
exports.unApproveProperty = async (req, res) => {
  try {
      const { id } = req.query;
      const property = await Property.findOne({ where: { propertyId: id } });
      if (!property) {
          return res.status(404).json({ message: "Property not found" });
      }
      property.isApproved = 0; // Update the property's isApproved to false
      const updatedProperty = await property.save(); // Await the save operation
      return res.status(200).json({ message: "Property unapproved successfully", property: updatedProperty });
  } catch (err) {
      console.error("Error unapproving property:", err);
      res.status(500).json({ message: "Internal server error" });
  }
};


// exports.getConfirmedProperties = (req, res) => {
//   Property.findAll({ where: { isConfirm: true, isApproved: false } })
//     .then((properties) => {
//       console.log(properties);
//       res.send(properties);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send(JSON.stringify({ error: err }));
//     });
// };

// exports.confirmProperty = (req, res) => {
//   const propertyId = req.query.id;

//   Property.findOne({ where: { propertyId: propertyId } })
//     .then((property) => {
//       if (!property) {
//         return res.status(404).json({ message: "Property not found" });
//       }
//       // Update the property's isConfirm to true
//       property.isConfirm = true;
//       console.log(property);
//       // Save the changes to the database
//       return property.save();
//     })
//     .then((updatedProperty) => {
//       res
//         .status(200)
//         .json({
//           message: "Property confirmed successfully",
//           property: updatedProperty,
//         });
//     })
//     .catch((error) => {
//       console.error("Error confirming property:", error);
//       res.status(500).json({ message: "Internal server error" });
//     });
// };
