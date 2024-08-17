const User = require('../models/user');
const jwt = require('jsonwebtoken');

//register
exports.register = async (req, res) =>{
    try{
        const user = await User.create(req.body);
        res.status(201).send({message: "User created successfully!",user:user});
    }catch(err){
        console.log(err);
        res.send({error: err.message})
    }
}

//login
exports.login = async (req, res) => {
    try{
        const {email,password} = req.body;
        const existingUser = await User.findOne({ where: { email: email }});
        if(!existingUser){
            console.log('User not found');
            return res.json({ status: 'login' });
        }
        if (password !== existingUser.password) {
            console.log('Incorrect password');
            return res.json({ status: 'password' });
        }
        const token = jwt.sign({emailId: existingUser.email}, 'estatecorp', {expiresIn: '1h'})
        console.log('Login success');
        res.json({ status: 'success' , token: token, user: existingUser});
    }catch(err){
        console.log(err)
        res.json({ error: 'Error while retrieving user data' });
    }
};

//Get all users
exports.getUsers = async (req, res) =>{
    try{
        const users = await User.findAll();
        if(!users){
            throw new Error('No users in DB');
        }
        res.status(200).send(users);
    }catch(err){
        console.log(err);
        res.status(500).send({message:err.message})
    }
}


exports.checkEmail = (req, res) => {    
    User.findOne({ where: { email: req.query.email } }).then(user => {
        if (user) {
            console.log(user)
            console.log("Email exists");
            res.send({ message: true }); // Email exists
        } else {
            console.log("Email does not exist");
            res.send({ message: false }); // Email does not exist
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Internal Server Error' });
    });
}

exports.checkContact = (req, res) => {  
    console.log('contact number', req.query.number)
    User.findOne({ where: { contactNo: req.query.number } }).then(user => {
        if (user) {
            console.log(user)
            console.log("Contact no. exists");
            res.send({ message: true }); // Email exists
        } else {
            console.log("Contact no. does not exist");
            res.send({ message: false }); // Email does not exist
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Internal Server Error' });
    });
}


