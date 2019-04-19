module.exports = {
  validatePosts(req, res, next) {

//#1 Check that the method used was 'POST' and if so, use methods provided by express-validator 
//to check URL parameters and body of the request for validations we need.
    if(req.method === "POST") {

//#2 Methods that return an object to which we can chain validation checkers like 'notEmpty'
//and 'isLength'
      req.checkParams("topicId", "must be valid").notEmpty().isInt();
      req.checkBody("title", "must be at least 2 characters in length").isLength({min: 2});
      req.checkBody("body", "must be at least 10 characters in length").isLength({min: 10});
    }

//#3 Gather any validation errors
    const errors = req.validationErrors();

    if (errors) {

//#4 If errors found, let the user know so they adjust their input. 'req.flash' helps to load messages.
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  },

  validateUsers(req, res, next) {
     if(req.method === "POST") {

// #1
       req.checkBody("email", "must be valid").isEmail();
       req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6})
       req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
     }

     const errors = req.validationErrors();

     if (errors) {
       req.flash("error", errors);
       return res.redirect(req.headers.referer);
     } else {
       return next();
     }
  },

  validateComments(req, res, next) {
     if(req.method === "POST") {
       req.checkBody("body", "must not be empty"). notEmpty();
     }

     const errors = req.validationErrors();

     if (errors) {
       req.flash("error", errors);
       return res.redirect(req.headers.referer);
     } else {
       return next()
     }
   }
}