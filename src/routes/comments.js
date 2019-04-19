const express = require("express");
const router = express.Router();

 //#1  Load "commentController.js" and the validation module
const commentController = require("../controllers/commentController");
const validation = require("./validation");

 // #2 register a route for the 'create' action along with validation middleware & the controller action
router.post("/topics/:topicId/posts/:postId/comments/create",
  validation.validateComments,
  commentController.create);

 // #3 register a route for the 'destroy' action along with validation midddleware & the controller action
router.post("/topics/:topicId/posts/:postId/comments/:id/destroy",
  commentController.destroy);
module.exports = router;