import dotenv from 'dotenv';
const isProduction = process.env.NODE_ENV !== 'production';
if (isProduction) {
  dotenv.config();
}

import cors from 'cors';
import express from 'express';
import passport from 'passport';

import db from './models/index.js';
import routes from './routes/index.js';

const { json, urlencoded } = express;
const { mongoose, url } = db;

const app = express();

const corsOptions = {
  origin: isProduction
    ? 'https://luditesttest.web.illinois.edu'
    : 'http://localhost:3000',
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json({ limit: '30mb', extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ limit: '30mb', extended: true }));

app.use(passport.initialize());

app.use('/api', routes);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

mongoose.set('useFindAndModify', false);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
