// const fs = require('fs')
// const path = require('path')
const bodyParser = require('body-parser');
const express = require('express');
const useApi = require('./api/userApi');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', useApi);

app.listen(3000);
console.log('success listen at port:3000......');
