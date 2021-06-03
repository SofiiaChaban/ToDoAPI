const express = require('express')
const mongoose = require('mongoose');
const app = express()

const dev_db_url = 'mongodb+srv://sofiia:qw16erty26@cluster0.mtqem.mongodb.net/tc?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const dbOptions = { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false };
mongoose.connect(mongoDB, dbOptions);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const api = require('./routes');


app.use(express.json())
app.use('/api', api)

require('./config/error-handler')(app)



app.listen(3000)

module.exports = app;