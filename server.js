const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Customer variables
const customer_register = require('./controllers/customer/register');
const customer_signin = require('./controllers/customer/signin');
const customer_rests = require('./controllers/customer/rests');
const customer_update_profile = require('./controllers/customer/updateProfile');
const customer_get_addr = require('./controllers/customer/getAddr');
const customer_add_addr = require('./controllers/customer/addAddr');
const customer_update_addr = require('./controllers/customer/updateAddr');
const customer_get_menu = require('./controllers/customer/getMenu');
const customer_addtocart = require('./controllers/customer/addToCart');
const customer_getcart = require('./controllers/customer/getCart');
const customer_getAllRAddr = require('./controllers/customer/getRAddr');
const customer_removefromcart = require('./controllers/customer/removeFromCart');
const customer_placeOrder = require('./controllers/customer/placeOrder');
const customer_getOrder = require('./controllers/customer/getOrder');
const customer_clearCart = require('./controllers/customer/clearCart');

// Restaurant variables
const restaurant_register = require('./controllers/restaurant/register');
const restaurant_signin = require('./controllers/restaurant/signin');
const rest_update_profile = require('./controllers/restaurant/updateProfile');
const rest_add_dish = require('./controllers/restaurant/addDish');
const get_rest_dishes = require('./controllers/restaurant/getDishes');
const restaurant_get_addr = require('./controllers/restaurant/getAddr');
const restaurant_get_info = require('./controllers/restaurant/getProfile');
const restaurant_add_addr = require('./controllers/restaurant/addAddr');
const restaurant_update_addr = require('./controllers/restaurant/updateAddr');

// Driver variables
const driver_register = require('./controllers/driver/register');
const driver_signin = require('./controllers/driver/signin');
const driver_delivery_order = require('./controllers/driver/orderDeliveried');

const get_address = require('./controllers/Share/getAddr');
const add_address = require('./controllers/Share/addAddr');
const update_address = require('./controllers/Share/updateAddr');
const driver_main = require('./controllers/driver/driverMain');

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
app.post('/customer_profile', (req, res) => { customer_update_profile.handleUpdateProfile(req, res, db) });
app.get('/rests', (req, res) => { customer_rests.handleRests(req, res, db) });
app.post('/rests_list', (req, res) => { customer_rests.handleRestsList(req, res, db) });
app.get('/get_c_addr/:id', (req, res) => { customer_get_addr.handleGetAddr(req, res, db) });
app.post('/add_c_addr', (req, res) => { customer_add_addr.handleAddAddr(req, res, db) });
app.post('/update_c_addr', (req, res) => { customer_update_addr.handleUpdateAddr(req, res, db) });
app.get('/menu/:id', (req, res) => { customer_get_menu.handleMenu(req, res, db) });
app.post('/addtocart', (req, res) => { customer_addtocart.handleAddToCart(req, res, db) });
app.get('/getcart/:id', (req, res) => { customer_getcart.handleGetCart(req, res, db) });
app.get('/get_aLL_r_addr', (req, res) => { customer_getAllRAddr.handleGetRAddr(req, res, db) });
app.delete('/removefromcart', (req, res) => { customer_removefromcart.handleRemoveFromCart(req, res, db) });
app.post('/place_order', (req, res) => { customer_placeOrder.handlePlaceOrder(req, res, db) });
app.get('/get_my_orders/:id', (req, res) => { customer_getOrder.handleGetOrder(req, res, db) });
app.post('/clear_my_cart', (req, res) => { customer_clearCart.handleClearCart(req, res, db) });

//app.post('/get_addr', (req, res) => { get_address.handleGetAddr(req, res, db) });
app.post('/add_addr', (req, res) => { add_address.handleAddAddr(req, res, db) });
app.post('/update_addr', (req, res) => { update_address.handleUpdateAddress(req, res, db) });

app.post('/restaurant_signin', (req, res) => { restaurant_signin.handleSignin(req, res, db, bcrypt) });
app.post('/restaurant_register', (req, res) => { restaurant_register.handleRegister(req, res, db, bcrypt) });
app.post('/restaurant_profile', (req, res) => { rest_update_profile.handleUpdateProfile(req, res, db) });
app.post('/rest_add_dish', (req, res) => { rest_add_dish.handleAddDish(req, res, db) });
app.get('/rest_dishes/:id', (req, res) => { get_rest_dishes.handleGetDishes(req, res, db) });
app.get('/get_r_addr/:id', (req, res) => { restaurant_get_addr.handleGetAddr(req, res, db) });
app.get('/get_rest_info/:id', (req, res) => { restaurant_get_info.handleProfile(req, res, db) });
app.post('/add_r_addr', (req, res) => { restaurant_add_addr.handleAddAddr(req, res, db) });
app.post('/update_r_addr', (req, res) => { restaurant_update_addr.handleUpdateAddr(req, res, db) })

app.post('/driver_signin', (req, res) => { driver_signin.handleSignin(req, res, db, bcrypt) });
app.post('/driver_register', (req, res) => { driver_register.handleRegister(req, res, db, bcrypt) });
app.get('/orders', (req, res) => { driver_main.handleDelivery(req, res, db) });
app.get('/driver/:id', (req, res) => {driver_info.handleProfile(req, res, db) });
app.post('/order_deliveried', (req, res) => { driver_delivery_order.handleOrderDeliveried(req, res, db) });


app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});