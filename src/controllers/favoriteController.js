// #1  Load dependencies
const favoriteQueries = require("../db/queries.favorites.js");

module.exports = {

// #2 'create' checks if there is a user signed in and if so, calls the 'createFavorite' 
//method of 'queries.favorites.js' with the request. If error, load flash message.
//Then redirect to the view where the request came from. 
  create(req, res, next){
    if(req.user){
      favoriteQueries.createFavorite(req, (err, favorite) => {
        if(err){
          req.flash("error", err);
        }
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
    }
    res.redirect(req.headers.referer);
  },

// # 'destroy' checks if there is a user signed in and if so, calls the 'deleteFavorite' method
// of 'queries.favorites.js' with the request. If error, flash error message.
  destroy(req, res, next){

    if(req.user){
      favoriteQueries.deleteFavorite(req, (err, favorite) => {
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to do that.")
      res.redirect(req.headers.referer);
    }
  }
}