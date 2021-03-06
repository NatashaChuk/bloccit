const Advertisement = require("./models").Advertisement;

module.exports = {

	getAllAdvertisements(callback){
		return Advertisement.all()

		.then((advertisements) => {
			callback(null, topics);
		})
		.catch((err) => {
			callback(err);
		})
	},

		addAdvertisement(newAdvertisement, callback){
			return Advertisement.create({
				title: newAdvertisement.title,
				description: newAdvertisement.description
			})
			.then((advertisement) => {
				callback(null, advertisement);
			})
			.catch((err) => {
				callback(err);
			})
		},

		getAdvertisement(id, callback){
			return Advertisement.findById(id)
			.then((advertisement) => {
				callback(null, advertisement);
			})
			.catch((err) => {
				callback(err);
			})
		},

		deleteAdvertisement(id, callback){
			return Advertisement.destory({
				where: {id}
			})
			.then((advertisement) => {
				callback(null, advertisement);
			})
			.catch((err) => {
				callback(err);
			})
		},

		updateAdvertisement(id, updateAdvertisement, callback){
			return Advertisement.findById(id)
			.then((advertisement) => {
				if(!advertisement){
					return callback("Advertisement not found");
				}

				advertisement.update(updateAdvertisement, {
					fields: Object.keys(updateAdvertisement)
				})
				.then(() => {
					callback(null, advertisement);
				})
				.catch((err) => {
					callback(err);
				});
			});
		}
}