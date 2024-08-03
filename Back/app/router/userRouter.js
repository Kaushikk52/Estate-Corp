module.exports = app => {
    const UserController = require('../controller/userController');
    // Create a new router for /users path
    var router = require('express').Router();


    router.post('/signup', UserController.postSignup);

    router.post('/login', UserController.postLogin);

    router.get('/all-user', UserController.getUsers);

    router.get('/check-email', UserController.checkEmail);

    router.get('/check-contact', UserController.checkContact);

    // Mount the usersRouter under the /users base path
    app.use('/users', router);
}