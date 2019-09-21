module.exports = (app) => {
    const notes = require('../routes/urlShorten.js');

    app.post('/url', notes.create);
    app.get('/url/:noteId', notes.findOne);
    app.get('/urls', notes.findAll);
    app.get('/:shortUrlCode', notes.findUrl);
}