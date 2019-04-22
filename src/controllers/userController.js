const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  signUp(req, res, next){
    res.render("users/sign_up");
  },

  create(req, res, next){
  	let newUser = {
  		email: req.body.email,
  		password: req.body.password,
  		passwordConfirmation: req.body.passwordConfirmation
  	};

  	userQueries.createUser(newUser, (err, user) => {
  		if(err) {
  			req.flash("error", err);
  			res.redirect("/users/sign_up");
  		} else {
  			passport.authenticate("local")(req, res, () => {
  				req.flash("notice", "You've successfully signed in!");
  				res.redirect("/");	
  			})
  		}
  	});
  },

  signInForm(req, res, next) {
  		res.render("users/sign_in");
  },

  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
       if(!req.user){
         req.flash("notice", "Sign in failed. Please try again.")
         res.redirect("/users/sign_in");
       } else {
         req.flash("notice", "You've successfully signed in!");
         res.redirect("/");
       }
     })
   },

   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   },

   show(req, res, next){
// #1 Call the 'getUser' method passing it the ID of the user we are trying to visit    
    userQueries.getUser(req.params.id, (err, result) => {

// #2 In 'getUser', send back an object. If 'user' property of 'result' not defined
//then it means we found no user with the passed ID    
      if (err || result.user === undefined){
        req.flash("notice", "No user found with that ID.");
        res.redirect("/");
      } else {
// #3 if request successfully handled, render the view and pass in the unpacked object        
        res.render("users/show", {...result});
      }
    });
   }
}