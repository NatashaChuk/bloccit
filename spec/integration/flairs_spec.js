const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/flairs/";
const sequelize = require("../../src/db/models").Flair;

describe("routes : flairs", () => {
  beforeEach((done) => {
    this.flair;
    sequelize.sync({force: true}).then((res) => {
      Flair.create({
        name: "Goldie",
        color: "yellow"
      })
      .then((flair) => {
        this.flair = flair;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("GET /flairs", () => {
    it("should return a status code 200 and get all flairs", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Flairs");
        expect(body).toContain("Goldie");
        done();
      });
    });
  });

  describe("GET /flairs/new", () => {
    it("should render a view with a new flair form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Flair");
        done();
      });
    });
  });

  describe("POST /flairs/create", () => {
    it("should create a new flair and redirect", (done) => {
      const options = {
        url: `${base}create`,
        form: {
          name: "Rubie",
          color: "red"
        }
      };
      request.post(options, (err, res, body) => {
        Flair.findOne({where: {name: "Rubie"}})
        .then((flair) => {
          expect(err).toBeNull();
          expect(res.statusCode).toBe(303);
          expect(flair.name).toBe("Rubie");
          expect(flair.color).toBe("red");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe("GET /flairs/:id", () => {
    it("should render a view of the flair with the associated ID", (done) => {
      request.get(`${base}${this.flair.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Goldie");
        expect(body).toContain("yellow");
        done();
      });
    });
  });

  describe("POST /flairs/:id/destroy", () => {
    it("should delete a flair with the associated ID", (done) => {
      Flair.all()
      .then((flairs) => {
        expect(flairs.length).toBe(1);
        request.post(`${base}${this.flair.id}/destroy`, (err, res, body) => {
          Flair.all()
          .then((flairs) => {
            expect(err).toBeNull();
            expect(flairs.length).toBe(0);
            done();
          })
        });
      });
    });
  });

  describe("GET /flairs/:id/edit", () => {
    it("should render a view with a form to edit the flair with the associated ID", (done) => {
      request.get(`${base}${this.flair.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Flair");
        expect(body).toContain("Goldie");
        done();
      });
    });
  });

  describe("POST /flairs/:id/update", () => {
    it("should update the assiociated flair with the given values", (done) => {
      const options = {
        url: `${base}${this.flair.id}/update`,
        form: {
          name: "Goldie",
          color: "blonde"
        }
      };

      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Flair.findOne({where: {id: this.flair.id}})
        .then((flair) => {
          expect(flair.color).toBe("blonde");
          done();
        });
      });
    });
  });
});