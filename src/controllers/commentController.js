// #1  import queries.comments.js and the policy module
const commentQueries = require("../db/queries.comments.js");
const Authorizer = require("../policies/comment.js");

module.exports = {
  create(req, res, next){
 // #2 check the policy to confirm te user can create comments
    const authorized = new Authorizer(req.user).create();

    if(authorized) {

 // #3  'create' builds a 'newComment' object with the info from the request
      let newComment = {
        body: req.body.body,
        userId: req.user.id,
        postId: req.params.postId
      };

 // #4  Call 'createComment', passing in 'newComment'
      commentQueries.createComment(newComment, (err, comment) => {
 // #5 redirect the user to the same place regardless of the outcome
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
      req.redirect("/users/sign_in");
    }
  },

// #6 The 'destroy' action passes the request to the 'deleteComment' method to to determine if it should be deleted
  destroy(req, res, next){
    commentQueries.deleteComment(req, (err, comment) => {
      if(err){
        res.redirect(err, req.headers.referer);
      } else {
        res.redirect(req.headers.referer);
      }
    });
  }
}