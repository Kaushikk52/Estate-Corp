const User = require('../modals/user');
const jwt = require('jsonwebtoken');


exports.postSignup = (req, res) =>{
    // console.log(req.body);
    User.create(req.body).then((response)=>{
        res.send({message: "User created successfully!"});
    }).catch(err =>{
        console.log(err);
        res.send({error: err.message})
    })
}

// exports.postLogin = (req, res) => {
//     console.log(req.body);
//     const email = req.body.email;
//     const password = req.body.password;
//     if(email === email && isAdmin){
//         if(password === password){
//             const token = jwt.sign({emailId: email}, 'estatecorp', {expiresIn: '1h'})
//             console.log('login is Sucessful')
//             res.send({status: 'success', token: token})
//         }else{
//             console.log('Incorrect password')
//             return res.send({status: 'password'})
//         }
//     }else{
//         try{
//             User.findOne({ where: {email: email}}).then(user =>{
//                 if(!user){
//                     console.log('User not found');
//                     return res.send({status: 'login'})
//                 }

//                 if(password !== user.password){
//                     console.log('Incorrect Password')
//                     res.send({status: 'password'})
//                 }

//                 const token = jwt.sign({email: user.email}, 'estatecorp', {expiresIn: '1h'})

//                 console.log('Login successful');
//                 res.send({ status: 'successful' , token: token});
//             }).catch(err =>{
//                 console.log(err)
//                 res.send({ error: 'Error while retrieving user data' });
//             })
//         } catch(error){
//             console.log(error);
//             res.send({ error: 'Error while retrieving user data' });
//         }
//     }

// }

exports.postLogin = (req, res) => {


    console.log(req.body)
    User.findOne({ where: { email: req.body.email }})
    .then(user =>{
        // console.log(user)
        if(!user){
            console.log('User not found');
            return res.json({ status: 'login' });
        }

        if (req.body.password !== user.password) {
            console.log('Incorrect password');
            return res.json({ status: 'password' });
        }

        const token = jwt.sign({emailId: user.email}, 'estatecorp', {expiresIn: '1h'})

        console.log('Login success');
        res.json({ status: 'success' , token: token, user: user});


    }).catch(err =>{
        console.log(err)
        res.json({ error: 'Error while retrieving user data' });
    })








    // console.log(req.body);
    // const email = req.body.email;
    // const password = req.body.password;

    // // Assuming isAdmin is a property of the User model
    // User.findOne({ where: { email: email } }).then(user => {
    //     if (!user) {
    //         console.log('User not found');
    //         return res.send({ status: 'login' });
    //     }

    //     if(password !== user.password){
    //         console.log('Incorrect Password');
    //         return res.send({ status: 'password' });
    //     }

    //     // if (user.isAdmin) {
    //     //     // Admin login logic
    //     //     // You may want to check the password here as well
    //     //     const token = jwt.sign({ email: user.email }, 'estatecorp', { expiresIn: '1h' });
    //     //     console.log('Admin login successful');
    //     //     // console.log(user)
    //     //     return res.send({ status: 'admin', token: token, user: user });
    //     // }
        
    //     const token = jwt.sign({ email: user.email }, 'estatecorp', { expiresIn: '1h' });
    //     console.log('Regular user login successful');
    //     // console.log(user)
    //     res.send({ status: 'success', token: token, user: user });
    // }).catch(err => {
    //     console.log(err);
    //     res.send({ error: 'Error while retrieving user data' });
    // });
};


exports.getUsers = (req, res) =>{
    User.findAll().then(users =>{
        // console.log(users);
    
        res.send(users)
    }).catch(err =>{
        console.log(err)
    })
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


