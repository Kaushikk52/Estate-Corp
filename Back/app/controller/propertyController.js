
const Property = require('../modals/property');
const DashProperty = require('../modals/dashProperty');


// exports.postProperty = (req, res) => {
//     console.log('Property data', req.body)
//     console.log('files', req.files)
//     const {
//         propertyId,
//         propertyOwner,
//         propertyName,
//         projectName,
//         propertyType,
//         propertyVariant,
//         city,
//         locality,
//         address,
//         bedrooms,
//         totalFloor,
//         floorNo,
//         furnishedStatus,
//         boundaryWall,
//         personalWashroom,
//         balconies,
//         bathrooms,
//         pentryCafetria,
//         facing,
//         carpetArea,
//         carpetAreaUnit,
//         coveredArea,
//         coveredAreaUnit,
//         superArea,
//         superAreaUnit,
//         plotArea,
//         plotAreaUnit,
//         entranceWidth,
//         entranceWidthUnit,
//         monthlyRent,
//         mintanceCharge,
//         mintanceChargeUnit,
//         possesionStatus,
//         onstructionAge,
//         availabilityMonth,
//         availabilityYear,
//         rentNagociablePrice,
//         expectedPrice,
//         expectedPriceType,
//         saleNagociablePrice,
//         amenities,
//         defaultImage
//     } = req.body

//     const images = req.files.map(file => ({ filename: file.filename }));

//     Property.create({
//         propertyId,
//         propertyOwner,
//         propertyName,
//         projectName,
//         propertyType,
//         propertyVariant,
//         city,
//         locality,
//         address,
//         bedrooms,
//         totalFloor,
//         floorNo,
//         furnishedStatus,
//         boundaryWall,
//         personalWashroom,
//         balconies,
//         bathrooms,
//         pentryCafetria,
//         facing,
//         carpetArea,
//         carpetAreaUnit,
//         coveredArea,
//         coveredAreaUnit,
//         superArea,
//         superAreaUnit,
//         plotArea,
//         plotAreaUnit,
//         entranceWidth,
//         entranceWidthUnit,
//         monthlyRent,
//         mintanceCharge,
//         mintanceChargeUnit,
//         possesionStatus,
//         onstructionAge,
//         availabilityMonth,
//         availabilityYear,
//         rentNagociablePrice,
//         expectedPrice,
//         expectedPriceType,
//         saleNagociablePrice,
//         amenities,
//         defaultImage,
//         images: JSON.stringify(images) // Store images as JSON string
//     }).then(result => {
//         DashProperty.create({
//             propertyId,
//             propertyOwner,
//             propertyName,
//             projectName,
//             propertyType,
//             propertyVariant,
//             city,
//             locality,
//             address,
//             bedrooms,
//             totalFloor,
//             floorNo,
//             furnishedStatus,
//             boundaryWall,
//             personalWashroom,
//             balconies,
//             bathrooms,
//             pentryCafetria,
//             facing,
//             carpetArea,
//             carpetAreaUnit,
//             coveredArea,
//             coveredAreaUnit,
//             superArea,
//             superAreaUnit,
//             plotArea,
//             plotAreaUnit,
//             entranceWidth,
//             entranceWidthUnit,
//             monthlyRent,
//             mintanceCharge,
//             mintanceChargeUnit,
//             possesionStatus,
//             onstructionAge,
//             availabilityMonth,
//             availabilityYear,
//             rentNagociablePrice,
//             expectedPrice,
//             expectedPriceType,
//             saleNagociablePrice,
//             amenities,
//             defaultImage,
//             images: JSON.stringify(images) // Store images as JSON string
//         }).then(property => {
//             console.log(property)
//             res.send(JSON.stringify({ message: 'Property and Dashboard property created sucessfully' }))
//         }).catch(err => {
//             console.log(err)
//             res.send(JSON.stringify({ err: 'Property and Dashboard property is failed to create' }))
//         })
//     }).catch(err => {
//         console.log(err)
//         res.send(JSON.stringify({ error: err }))
//     })
// }


const getValueOrDefault = (value, defaultValue = null) => {
    return value === undefined || value === '' ? defaultValue : value;
};

exports.postProperty = async (req, res) => {
    try {
        console.log('Property data', req.body);
        console.log('files', req.files);

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
            defaultImage
        } = req.body;

        const images = req.files.map(file => ({ filename: file.filename }));

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
            images: JSON.stringify(images) // Store images as JSON string
        };

        const property = await Property.create(propertyData);

        await DashProperty.create(propertyData);

        res.send({ message: 'Property and Dashboard property created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Property and Dashboard property creation failed', details: err.message });
    }
};



exports.getAllProperties = (req, res) => {
    Property.findAll().then(properties => {
        console.log(properties)
        res.send(properties)
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ error: err }))
    })
}

exports.getProperties = async (req, res) => {
    const city = req.query.city;
    const propertyType = req.query.propertyType;
    try {
        const properties = await Property.findAll({ where: { city:city, bedrooms:propertyType } });
        console.log(req.query.city );
        console.log(req.query.propertyType);
        console.log(properties);
        return res.send(properties);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getApprovedProperties = (req, res) => {
    DashProperty.findAll({ where: { isApprove: true } }).then(properties => {
        console.log(properties)
        res.send(properties)
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ error: err }))
    })
}

exports.getNotConfirmProperties = (req, res) => {
    Property.findAll({ where: { isApproved: false } }).then(properties => {
        // console.log(properties)
        res.send(properties)
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ error: err }))
    })
}


exports.getConfirmedProperties = (req, res) => {
    Property.findAll({ where: { isConfirm: true, isApproved: false } }).then(properties => {
        console.log(properties)
        res.send(properties)
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ error: err }))
    })
}

exports.approveProperty = (req, res) => {
    const id = req.query.id;

    Property.findOne({ where: { propertyId: id } })
    .then(property => {
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        property.isApproved = 1;  // Update the property's isApproved to true 
        return property.save();// Save the changes to the database
    })
    .then(updatedProperty => {
        res.status(200).json({ message: 'Property approved successfully', property: updatedProperty });
    })
    .catch(error => {
        console.error('Error approving property:', error);
        res.status(500).json({ message: 'Internal server error' });
    });
};

exports.unApproveProperty = (req, res) => {
    const id = req.query.id;

    Property.findOne({ where: { propertyId: id } })
    .then(property => {
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        property.isApproved = 0;  // Update the property's isApproved to true 
        return property.save();// Save the changes to the database
    })
    .then(updatedProperty => {
        res.status(200).json({ message: 'Property approved successfully', property: updatedProperty });
    })
    .catch(error => {
        console.error('Error approving property:', error);
        res.status(500).json({ message: 'Internal server error' });
    });
};


exports.confirmProperty = (req, res) => {
    const propertyId = req.query.id;

    Property.findOne({ where: { propertyId: propertyId } })
        .then(property => {
            if (!property) {
                return res.status(404).json({ message: 'Property not found' });
            }
            // Update the property's isConfirm to true
            property.isConfirm = true;
            console.log(property)
            // Save the changes to the database
            return property.save();
        })
        .then(updatedProperty => {
            res.status(200).json({ message: 'Property confirmed successfully', property: updatedProperty });
        })
        .catch(error => {
            console.error('Error confirming property:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};


exports.getPropertyDetil = (req, res) =>{
    console.log(req.params.propertyId)
    Property.findOne({where:{propertyId : req.params.propertyId}})
    .then((property)=>{
        console.log(property.dataValues)
        if(property.dataValues.amenities){
            property.dataValues.amenities = property.dataValues.amenities.split(',')
        }

        if(property.dataValues.images){
            property.dataValues.images = JSON.parse(property.dataValues.images);
        }
        res.send(property)
        console.log('after split', property.dataValues)
    }).catch((err)=>{

        res.send(JSON.stringify({error: err}))
        console.log(err)
    })
}