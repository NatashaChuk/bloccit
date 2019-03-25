const request = require("request");
const server = require("../../src/server");
const base = "http://localhosst:3000/";
const macro = "http://localhosst:3000/macro";

describe("routes : static", () => {

	describe("GET /", () => {
		it("should return status code 200", (done) => {
			request.get(base, (err, res, body) => {
				expect(res.statusCode).toBe(200);
				done();
			});
		});
	});

	describe("GET /macro", () => {
		it("Should return status code 200", (done) => {
			request.get(macro, (err, res, body) => {
				expect(res.statusCode).toBe(200);
				done();
			});
		});

		it("should contain polo in the body", (done) => {
			request.get(macro, (err, res, body) => {
				expect(res.body).toContain("polo");
				done();
			});
		});
	});
});