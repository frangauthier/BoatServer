require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { connectCallback } = require('./database');
const bodyParser = require('body-parser');
const boatRouter = require('./routers/boat.router');
const userRouter = require('./routers/user.router');
const auth = require('./middlewares/auth');
const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get('/', function(req, res) {
    res.send('Hello World')
})


app.use('/users', userRouter);
// method 1
// app.use(auth);
// app.use('/boat', boatRouter)
// method 2
app.use('/boat', auth, boatRouter)

connectCallback(() => {
    app.listen(3000, () => {
        console.log('Server listening on port 3000')
    })
})