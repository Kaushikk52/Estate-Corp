module.exports = app => {
    const PropertyController = require('../controller/propertyController');
    const multer = require('multer');
    const path = require('path');
    var router = require('express').Router();

    //multer logic
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'uploads')
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + path.extname(file.originalname))
        }
    })
    // file size = 10mb
    var upload = multer({ storage: storage,  limits: {fileSize: 10 * 1024 * 1024 * 1024 , fieldSize: 10 * 1024 * 1024 }})


    router.post('', upload.array('images', 10) , PropertyController.postProperty)

    router.get('/all', PropertyController.getAllProperties);

    router.get('/search', PropertyController.getPropertiesByCityBedrooms);

    router.get('', PropertyController.getNotApprovedProperties);

    router.get('/:propertyId', PropertyController.getPropertyDetails)

    router.get('/allapproved', PropertyController.getApprovedProperties);

    router.put('/approve', PropertyController.approveProperty);

    router.put('/unapprove', PropertyController.unApproveProperty);

    // router.get('/confirmProperties', PropertyController.getConfirmedProperties);
    // router.get('/confirm', PropertyController.confirmProperty);

    // Mount the usersRouter under the /users base path
    app.use('/properties', router);
}