 // #1  Load dependencies needed
const Comment = require("./models").Comment;
const Post = require("./models").Post;
const User = require("./models").User;
const Vote = require("./models").Vote;

module.exports = {
  createVote(req, val, callback){

 // #  Call 'findOne' on the 'vote' model to look for a 'vote' object with the id of
 //the current user as well as the id of the post being voted on
    return Vote.findOne({
      where: {
        postId: req.params.postId,
        userId: req.user.id
      }
    })
    .then((vote) => {

 // #3  If vote found, that means the user has already voted on it. Update the vote's 'value' to
 //the new upvote or downvote value and save the changes.
      if(vote){
        vote.value = val;
        vote.save()
        .then((vote) => {
          callback(null, vote);
        })
        .catch((err) => {
          callback(err);
        });
      } else {

 // #4 If vote not found, create a new vote with the information provided
        Vote.create({
          value: val,
          postId: req.params.postId,
          userId: req.user.id
        }).then((vote) => {
          callback(null, vote);
        })
        .catch((err) => {
          callback(err);
        });
      }
    });
  }
}