const express     = require('express');
const userRouter  = express.Router();
const User        = require('../models/user');
const bcrypt      = require('bcrypt');
const passport    = require('passport');


userRouter.post('/signup', (req, res, next)=>{
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  if(password === "" || username === ""){
    res.json({errorMessage: 'Please fill in both a username and password in order to create an account.'})
    return;
  }
  User.findOne({username: username})
  .then((responseFRomDB)=>{
    if (responseFRomDB !== null){
      res.json({ errorMessage: `Sorry, the username ${username}, already exists. Please choose a different user name.`})
      return;
    }
  const salt           = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  User.create({email: email, username: username, password: hashedPassword})
    .then((response)=>{
      console.log(response);
      res.json(response);
    })
    .catch((err)=>{
      next(err);
    })
  })
  .catch((err)=>{
    res.json(err);
  })
});


userRouter.post('/login', (req, res, next) => {
  // passport.authenticate('local', (err, theUser, failureDetails) => {
  //   if (err) {
  //     console.log("server side err <<<<<<<<<<<<<<<<<<<<< ", err);
  //     res.status(500).json({ message: 'Something went wrong' });
  //     return;
  //   }

  //   if (!theUser) {
  //     console.log("error finding user on login ================== ", err);
  //     res.status(401).json(failureDetails);
  //     return;
  //   }
    User.findOneAndRemove({email: req.body.email})
    .then((userFromDB) => {
      if(userFromDB === null) {
        res.status(400).json({ message: "Email is invalid" });
        return;
      }

      const checkPassword = bcrypt.compareSync(req.body.password, userFromDB.password);

      console.log( "this is the user after confirming is on db ------------------ ", userFromDB);

      if(checkPassword === false) {
        res.status(400).json({message: "Invalid Password"});
        return;
      }

      req.login(userFromDB, (err) => {
        if ("error loging in the user >>>>>>>>>>>>>>>>>>> ", err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }
  
        // We are now logged in (notice req.user)
        res.status(200).json(req.user);
      })
    })
    .catch((err) => {
      res.status(500).json({message: "Log in Error"});
    })
  })

userRouter.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "See Ya! Come Back Soon." });
});

//Clear session
userRouter.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.json();
  });
});

module.exports = userRouter;