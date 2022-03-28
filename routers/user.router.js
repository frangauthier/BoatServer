const express = require('express');
const { createUser, signIn } = require('../services/user.service');
const userRouter = express.Router();

userRouter.post('/', async function(req, res) {

    const user = req.body

    if (!user.username || !user.password) {
        res.status(400)
        res.send('Missing username or password')
        return;
    }

    const result = await createUser(user);

    res.status(result.status);
    res.send(result.body);
})

userRouter.post('/login', async function(req, res) {

    const user = req.body

    if (!user.username || !user.password) {
        res.status(400)
        res.send('Missing username or password')
        return;
    }

    const result = await signIn(user)

    res.status(result.status);
    res.send(result.body);
})

module.exports = userRouter;