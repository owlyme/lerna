const compose = require('./composeJavaScript')
const upload = require('./upload')

module.exports = function(app) {
    compose(app);
    upload(app)
}