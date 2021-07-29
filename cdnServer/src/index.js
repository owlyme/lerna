const workflow = require('./workflow')
const compose = require('./composeJavaScript')
const upload = require('./upload')

module.exports = function(app) {
    workflow(app);
    compose(app);
    upload(app)
}