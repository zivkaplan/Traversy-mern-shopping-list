if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const itemsRoute = require('./routes/api/items');
const usersRoute = require('./routes/api/users');
const authRoute = require('./routes/api/auth');
const port = process.env.PORT || 5000;
const app = express();
const dbUrl =
    process.env.DB_URL || 'mongodb://localhost:27017/MERN-shopping-list';

const appConfig = (function () {
    const secret = process.env.SECRET || 'defaultSecret';
    const sessionConfig = {
        name: 'SessConnect',
        secret: secret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            // secure: true,
        },
    };

    // app.set('views', path.join(__dirname, 'views'));
    // app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
})();

const mongooseConfig = (function () {
    mongoose.set('useFindAndModify', false);

    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Database connected');
    });
})();

// routes
app.use('/api/items', itemsRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
