'use strict';

const PORT = process.env.PORT || 8080;

const pkg = require('./package.json');
const express = require('express');

let app = express();

app.use('/static', express.static(`${__dirname}/app`));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/app/index.html`);
});

let dependencies = {};

app.use('/cards', require('./controller/cards')(dependencies));

app.listen(PORT, () => {
  console.log(`${pkg.name}v${pkg.version} listening on Port ${PORT}`);
});
