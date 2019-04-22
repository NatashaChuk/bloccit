//We provide a definition for the destroy method which returns the result of 
//calling _isOwner to confirm that the user is the owner of this object

const ApplicationPolicy = require("./application");

module.exports = class FavoritePolicy extends ApplicationPolicy {
	destroy(){
		return this._isOwner();
	}
}