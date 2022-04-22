const express = require('express');
const DataRetrievalControler = require('./src/controllers/DataRetrievalControler');
const routes = express.Router();


routes.post('/listing', DataRetrievalControler.store);
routes.post('/photo', DataRetrievalControler.store);

module.exports = routes;