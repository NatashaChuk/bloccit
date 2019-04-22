const User = require("./models").User;
const Post = require("./models").Post;
const Comment = require("./models").Comment;
const bcrypt = require("bcryptjs");

module.exports = {
// #2
  createUser(newUser, callback){

// #3
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

// #4
    return User.create({
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getUser(id, callback){
// #1 Define a 'result' object to hold the 'user', 'posts', and 'comments' that we will return and request the 'user' object from the database.    
    let result = {};
    User.findById(id)
    .then((user) => {
//#2 If no user returns, we return an error
      if(!user) {
        callback(404);
      } else {
//#3 Otherwise, we store the resulting user
        result["user"] = user;
//#4 Execute the scope on 'Post' to get the last five posts made by the user
        Post.scope({method: ["lastFiveFor", id]}).all()
        .then((posts) => {
//#5 Store the result in the 'result' object
          result["posts"] = posts;
//#6 Execute the scope on 'Comment' to get the last five comments made by the user
          Comment.scope({mehthod: ["lastFiveFor", id]}).all()
          .then((comments) => {
 //#7 Store the result in the object and pass the object to the callback           
            result["comments"] = comments;
            callback(null, result);
          })
          .catch((err) => {
            callback(err);
          })
        })
      }
    })
  }

}