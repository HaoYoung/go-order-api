const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Customer variables
const customer_register = require('./controllers/customer/register');
const customer_signin = require('./controllers/customer/signin');
const customer_rests = require('./controllers/customer/rests');

// Restaurant variables
const restaurant_register = require('./controllers/restaurant/register');
const restaurant_signin = require('./controllers/restaurant/signin');
const rest_update_profile = require('./controllers/restaurant/updateProfile');

// Driver variables
const driver_register = require('./controllers/driver/register');
const driver_signin = require('./controllers/driver/signin');

// Database variable
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('Hello, this is GoOrder Server.') });

app.post('/customer_signin', (req, res) => { customer_signin.handleSignin(req, res, db, bcrypt) });
app.post('/customer_register', (req, res) => { customer_register.handleRegister(req, res, db, bcrypt) });
app.get('/rests', (req, res) => { customer_rests.handleRests(req, res, db) });

app.post('/restaurant_signin', (req, res) => { restaurant_signin.handleSignin(req, res, db, bcrypt) });
app.post('/restaurant_register', (req, res) => { restaurant_register.handleRegister(req, res, db, bcrypt) });
app.post('/restaurant_profile', (req, res) => { rest_update_profile.handleUpdateProfile(req, res, db) });

app.post('/driver_signin', (req, res) => { driver_signin.handleSignin(req, res, db, bcrypt) });
app.post('/driver_register', (req, res) => { driver_register.handleRegister(req, res, db, bcrypt) });


app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});