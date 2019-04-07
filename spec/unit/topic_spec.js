const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

	beforeEach((done) => {
		this.topic;
		this.post;
		sequelize.sync({force: true}).then((res) => {

			Topic.create({
				title: "Woodworking",
				description: "A discussion of projects you have completed and some you would like to."
			})
			.then((topic) => {
				this.topic = topic;

				Post.create({
					title: "My first project",
					body: "A cutting board!",
					topicId: this.topic.id
				})
				.then((post) => {
					this.post = post;
					done();
				});
			})
			.catch((err) => {
				console.log(err);
				done();
			});
		});
	});

	describe("#create()", () => {
		
		it("should create a post object with a title, body, and assigned topic", (done) => {

			Topic.create({
				title: "Woodworking",
				description: "A discussion of projects you have completed and some you would like to.",
				topicId: this.topic.id 
			})
			.then((topic) => {
				expect(topic.title).toBe("Woodworking");
				expect(topic.description).toBe("A discussion of projects you have completed and some you would like to.");
				done();
			})
			.catch((err) => {
				console.log(err);
				done();
			});
		});

		it("should not create a topic with missing title or description", (done) => {
			Topic.create({
				title: "A coffee table",
			})
			.then((topic) => {
				done();
			})
			.catch((err) => {
				expect(err.message).toContain("Topic.description cannot be null");
				done();
			})
		});

	});

	describe("#setTopic()", () => {

		it("should associate a topic and a post together", (done) => {

			Topic.create({
				title: "My Projects",
				description: "1. Console Table"
			})
			.then((newTopic) => {
				expect(this.post.topicId).toBe(this.topic.id);
			
				this.post.setTopic(newTopic)
				.then((post) => {
					expect(post.topicId).toBe(newTopic.id);
					done();
				});
			});
		});

		describe("#getPosts()", () => {

			it("should return the associated posts", (done) => {
				this.topic.getPosts()
				.then((associatedPosts) => {
					expect(associatedPosts[0].title);
					done();
				})
			});
		});
	});
});