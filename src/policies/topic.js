// #1  require ApplicationPolicy so that we can extend it
const ApplicationPolicy = require("./application");

module.exports = class TopicPolicy extends ApplicationPolicy {

 // #2 provide our definition of the new method because using
 // the one defined in the interface of the parent would not work for this resource.
  new() {
    return this._isAdmin();
  }

  create() {
    return this.new();
  }

 // #3 Only admins can edit topics, so the edit method checks that the user is an admin user.
  edit() {
    return this._isAdmin();
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}