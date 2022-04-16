module.exports = function (app) {
    const bookingHandlers = require('../controller/bookingController');

    app.route('/api/hello')
    .get(bookingHandlers.hello);

    app.route('/api/register')
    .post(bookingHandlers.register);

    app.route('/api/findCab')
    .get(bookingHandlers.findCab);

    app.route('/api/bookCab')
    .get(bookingHandlers.bookCab);

    app.route('/api/changeThreshold')
    .post(bookingHandlers.changeThreshold);
}