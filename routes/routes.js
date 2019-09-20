module.exports = (app) => {
    const notes = require('../routes/urlshorten.js');

    app.post('/api/item', notes.create);
    app.get('/api/item/:noteId', notes.findOne);
    app.get('/api/items', notes.findAll);
    app.get('/api/:shortUrlCode', notes.findUrl);
}