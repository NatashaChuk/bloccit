const Topic = require("./models").Topic;
const Post = require("./models").Post;


module.exports = {

	getAllTopics(callback){
		return Topic.all()

		.then((topics) => {
			callback(null, topics);
		})
		.catch((err) => {
			callback(err);
		})
	},

		addTopic(newTopic, callback){
			return Topic.create({
				title: newTopic.title,
				description: newTopic.description
			})
			.then((topic) => {
				callback(null, topic);
			})
			.catch((err) => {
				callback(err);
			})
		},

		getTopic(id, callback){
			return Topic.findById(id)

			return Topic.findById(id, {
				include: [{
					model: Post,
					as: "posts"
				}]
			})
			.then((topic) => {
				callback(null, topic);
			})
			.catch((err) => {
				callback(err);
			})
		},

		deleteTopic(req, callback){
			return Topic.findById(req.params.id)
			.then((topic) => {
				const authorized = new Authorizer(req.user, topic).destroy();

				if(authorized) {
					topic.destroy()
					.then((res) => {
						callback(null, topic);
					});
				} else {
					req.flash("notice", "You are not authorized to do that.")
					callback(401);
				}
			})
			.catch((err) => {
				callback(err);
			});
		},

		updateTopic(req, updatedTopic, callback){

	//#1 search for a topic matching the ID passed in the request parameters.	
			return Topic.findById(req.params.id)
			.then((topic) => {

	//#2  If not found, we return an error notice.			
				if(!topic){
					return callback("Topic not found");
				}

    //#3 authorize the user and topic by calling the update method of the policy instance.
				const authorized = new Authorizer(req.user, topic).update();

				if(authorized) {

    //#4 If the user is authorized, we call the update method of the Sequelize model. 
    //pass in the object containing the keys matching the attributes and the values with which to update them.
					topic.update(updatedTopic, {
						fields: Object.keys(updatedTopic)
					})
					.then(() => {
						callback(null, topic);
					})
					.catch((err) => {
						callback(err);
					});
				} else {

	//#5 If the user is not authorized, we populate a notice and pass control back to the controller				
					req.flash("notice", "You are not authorized to do that.");
					callback("Forbidden");
				}
			}); 
		}
}