// authentication helpers

const { User } = require('../../models/user');


const env = process.env.NODE_ENV;
const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON // option to turn on the test user.
const TEST_USER_ID = '623e007952cdf8af877cef4c' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file

module.exports = {
    // Middleware for authentication of resources
    authenticate: (req, res, next) => {
        if (env !== 'production' && USE_TEST_USER)
            req.session.user = TEST_USER_ID; // test user on development. (remember to run `TEST_USER_ON=true node server.js` if you want to use this user.)

        if (req.session.user) {
            User.findById(req.session.user).then((user) => {
                if (!user) {
                    return Promise.reject();
                } else {
                    req.user = user;
                    next();
                }
            }).catch((error) => {
                res.status(401).send("Unauthorized");
            })
        } else {
            res.status(401).send("Unauthorized");
        }
    },

    adminAuthenticate: async (req, res, next) => {
        if (req.session.user) {
            const u = await User.findById(req.session.user);
            if (!u || !u.admin) {
                res.status(401).send('Unauthorized');
            } else {
                next();
            }
        } else {
            res.status(401).send('Unauthorized');
        }
    },
    
    // Our own express middleware to check for 
    // an active user on the session cookie (indicating a logged in user.)
    sessionChecker: (req, res, next) => {
        if (req.session.user) {
            res.redirect('/dashboard'); // redirect to dashboard if logged in.
        } else {
            next(); // next() moves on to the route.
        }
    }
}
