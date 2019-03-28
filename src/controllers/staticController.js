module.exports = {
	index(req, res, next) {
		res.render("static/index", {title: "Welcome to Bloccit"});
	},

	about: function (req, res, next) {
		res.render("static/index", {title: "About"});
	}
}