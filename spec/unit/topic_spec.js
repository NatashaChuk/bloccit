

//#1 Require the 'User' model to use it in our tests
const User = require("../../src/db/models").User;

beforeEach((done) => {
	this.topic;
	this.post;
	this.user;

	sequelize.sync({force: true}).then((res) => {

//#2 Create a user object		
		User.create({
			email: "starman@tesla.com",
			password: "Trekkie4lyfe"
		})
		.then((user) => {
			this.user = user;  //store the user

//#3 Create a topic object
			Topic.create({
				title: "Expeditions to Alpha Centauri",
				description: "A compilation of reports from recent visits to the star system.",

//#4 Use 'nested create' to create objects and associations in a single call. 
//For each object in posts, Sequelize will create a Post object with the attribute values provided. 
//The result will be a Topic object with associated Post objects.
				posts: [{
					title: "My first visit to Proxima Centauri b",
					body: "I saw some rocks.",
					userId: this.user.id
				}]
			}, {

//#5 The include property allows us to tell the method what model to use  
//as well as where to store the resulting posts as in the Topic object. 
//'[Topic instance name].posts' will return an array of 'Post' objects associated with the 'Topic' object.
				include: {
					model: Post,
					as: "posts"
				}
			})
			.then((topic) => {
				this.topic = topic;  //store the topic
				this.post = topic.posts[0];  //store the post
				done();
			})
		})
	});
});