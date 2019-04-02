const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {
	beforeEach((done) => {
		this.advertisement;
		sequelize.sync({force: true}).then((res) => {

			Advertisement.create({
				title: "First Advertisement",
				description: "Why ads?"
			})
			.then((advertisement) => {
				this.advertisement = advertisement;
				done();
			})
			.catch((err) => {
				console.log(err);
				done();
			});
		});
	});



	describe("GET /advertisements", () => {
		it("should return a status code 200 and all ads", (done) => {
			request.get(base, (err, res, body) => {
				expect(res.statusCode).toBe(200);
				expect(err).toBeNull();
				expect(body).toContain("Advertisement");
				expect(body).toContain("First Advertisement");
				done();
			});
		});
	});

	describe("GET /advertisements/new", () => {
		it("Should render a new advertisement form", (done) => {
			request.get(`${base}new`, (err, res, body) => {
				expect(err).toBeNull();
				expect(body).toContain("New Advertisement");
				done();
			});
		});
	});

	describe("POST /advertisements/create", () => {
		const options = {
			url: `${base}create`,
			form: {
				title: "Second Advertisement",
				description: "Just another ad"
			}
		};

		it("Should create a new ad and redirect", (done) => {
			request.post(options, 
				(err, res, body) => {
					Advertisement.findOne({where: {title: "Second Advertisement"}})
					.then((topic) => {
						expect(res.statusCode).toBe(303);
						expect(advertisement.title).toBe("Second Advertisement");
						expect(advertisement.description).toBe("What's your favorite ad?");
						done();
					})
					.catch((err) => {
						console.log(err);
						done();
					});
				})
			}
		);
	});

	describe("GET /advertisements/:id", () => {
		it("should render a view within the selected advertisement", (done) => {
			request.get(`${base}${this.advertisement.id}`, (err, res, body)  => {
				expect(err).toBeNull();
				expect(body).toContain("Advertisement");
				done();
			});
		});
	});

	describe("POST /advertisements/:id/destroy", () => {
		it("should delete the advertisement with the associated ID", (done) => {
			Advertisement.all()
			.then((advertisements) => {
				const advertisementCountBeforeDelete = advertisements.length;
				expect(advertisementCountBeforeDelete).toBe(1);
				request.post(`${base}4{this.advertisement.id}/destroy`, (err, res, body) => {
					.then((advertisements) => {
						expect(err).toBeNull();
						expect(advertisements.length).toBe(advertisementCountBeforeDelete - 1);
						done();
					})
				});
			});
		});

		describe("GET /advertisements/:id/edit", () => {
			it("shold render a view with an edit advertisement form", (done) => {
				request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
					expect(err).toBeNull();
					expect(body).toContain("Edit Advertisement");
					expect(body).toContain("Next Advertisement");
					done();
				};
			});
		});

			describe("POST /advertisements/:id/update", () => {
				it("should update the advertisement with the given values", (done) => {
					const options = {
						url: `${base}${this.advertisement.id}/update`,
						form: {
							title: "Second Advertisement",
							description: "Another advertisement"
						}
					};

					request.post(options, 
						(err, res, body) => {
							expect(err).toBeNull();

							Advertisement.findOne({
								where: { id: this.advertisement.id }
							})
							.then((advertisement) => {
								expect(advertisement.title).toBe("Antoher Advertisement");
								done();
							});
						});
					});
				});
			});
})