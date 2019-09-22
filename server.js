'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Express/Nginx/Certbot tutorial');
});

app.listen(3001);