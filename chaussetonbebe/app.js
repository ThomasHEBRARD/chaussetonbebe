const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const mongoose = require('mongoose');
const collectionsRoute = require('./src/routes/api/collection.route');
const itemsRoute = require('./src/routes/api/item.route');
const db = require('./src/config/keys').mongoURI;

const app = express();
const port = process.env.PORT || 3000;


mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use(express.json());
app.use('/api/collections', collectionsRoute);
app.use('/api/items', itemsRoute);

app.post('/payment', async (req, res) => {
    let { amount, id } = req.body;
    try {
        await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "Your Company Description",
            payment_method: id,
            confirm: true,
        });

        res.json({
            message: "Payment Successful",
            success: true,
        });
    } catch (error) {
        console.log("stripe-routes.js 17 | error", error);
        res.json({
            message: "Payment Failed",
            success: false,
        });
    }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Server is listening on port: ${port}`));


