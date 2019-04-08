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
  }
}