import dotenv from 'dotenv';
dotenv.config();

const config = require('./config.json');
const {mongoDB: {username, password}} = config;

const isProduction = process.env.NODE_ENV === 'production';

const PRODUCTION_URI =
`mongodb+srv://${username}:${password}@ludicluster.rtcvv.mongodb.net/ludi_db?retryWrites=true&w=majority`;
const DEVELOPMENT_URI = 'mongodb://localhost:27017/ludi_db';

// const uri = isProduction ? PRODUCTION_URI : DEVELOPMENT_URI;
const uri = PRODUCTION_URI;

export default uri;