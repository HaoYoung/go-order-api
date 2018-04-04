const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Customer variables
const customer_register = require('./controllers/customer/register');
const customer_signin = require('./controllers/customer/signin');


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

app.get('/', (req, res) => { res.send('it is working!') });

app.post('/customer_signin', (req, res) => { customer_signin.handleSignin(req, res, db, bcrypt) });
app.post('/customer_register', (req, res) => { customer_register.handleRegister(req, res, db, bcrypt) });


app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});