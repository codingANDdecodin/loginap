'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
 const cors=require("cors");

const router = express.Router();
 app.use(cors())
router.get('/', (req, res) => {
  res.setHeader("Access-Control-Allow-Credential","true")
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());

app.use('/.netlify/functions/api', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

module.exports = app;
module.exports.handler = serverless(app);
