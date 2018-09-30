const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const router 	= express.Router();
const searched = require('./server/controllers/api/search.ts');
const port = 4200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/meli-front-end-test')));

router.get('/api/items', searched.getAll);
router.route('/api/items/:id').get(searched.read);

app.use('/', router);

app.connect = function(opts) {
  const server = app.listen(port, () => {
    const serverPort = server.address().port;
    console.log('Listening on port ' + serverPort);
  });
};

app.connect();
