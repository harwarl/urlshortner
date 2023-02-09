import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { bootStrap } from './src/routes/index.js'
const PORT = process.env.PORT || 3000;
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next)=>{
    res.status(200).json({status: true, message: 'URLSHORTNER api AT YOUR SERVICE'});
});

bootStrap(app);

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.statusCode(statusCode).json({ status: false, message: message });
});

app.use('*', (req, res, next) => {
    const statusCode = 404;
    const message = 'You have lost your way 🤔🤔';
    res.status(statusCode).json({ status: false, message: message });
});

mongoose
    .connect(process.env.MONGOURI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App is running on port ${process.env.PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
    });