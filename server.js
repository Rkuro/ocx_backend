'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log("something is fucking up")
    res.send('Express/Nginx/Certbot tutorial');
});

app.listen(3000);