const functions = require("firebase-functions");
const WEBOWNERUSERNAME = functions.config().webowner.username;
const WEBOWNERPASSWORD = functions.config().webowner.password;
const ensureToken = async (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
         res.status(401).send({ data: 'Missing Authorization Header' });
         res.end();
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    // console.log(username, password);
    if(username === WEBOWNERUSERNAME && password === WEBOWNERPASSWORD) {
        next();
    }else {
        res.status(401).send({ data: 'Missing Authorization Header' });
        res.end();
    }
};

module.exports = ensureToken;
