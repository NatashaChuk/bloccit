module.exports = {
	init(app){
		const staticRoutes = require("../routes/static");
		const topicRoutes = require("../routes/topics");
		const ruleRoutes = require("../routes/rules");
		const advertisementRoutes = require("../routes/advertisements");

		app.use(staticRoutes);
		app.use(topicRoutes);
		app.use(ruleRoutes);
		app.use(advertisementRoutes);
	}
}