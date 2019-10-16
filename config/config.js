const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV;
let configBuffer = null;

// Init config_buffer according to the NODE_ENV
switch (NODE_ENV) {
    case 'production':
        configBuffer = fs.readFileSync( 'files/production.json');
        break;
    case 'development':
        configBuffer = fs.readFileSync('files/development.json');
        break;
    default:
        configBuffer = fs.readFileSync('files/development.json');
}
let config = JSON.parse(configBuffer);
module.exports = config;
