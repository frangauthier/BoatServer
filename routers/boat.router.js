const express = require('express');
const { createBoat, findBoatByName, findBoatByLocation, updateBoat, deleteBoatById } = require('../services/boat.service');
const boatRouter = express.Router();

boatRouter.post('/', async function(req, res) {

    const boatDocument = req.body;

    const result = await createBoat(boatDocument);

    res.status(result.status);
    res.send(result.body);

})

boatRouter.get('/', async function(req, res) {

    if (req.query.name) {
        const result = await findBoatByName(req.query.name)

        res.status(result.status);
        res.send(result.body);
    } else if (req.query.location) {
        const result = await findBoatByLocation(req.query.location)

        res.status(result.status);
        res.send(result.body);
    }

})

boatRouter.patch('/:id', async function(req, res) {

    const boatId = req.params.id;
    console.log('boatId: ', boatId);
    const update = req.body;

    const test = /.{16}/.test(boatId);
    console.log('test: ', test);

    if (!/^.{16}$|^.{24}$/.test(boatId)) {
        res.status(400)
        res.send('Malformed id. Must be 16 or 24 hexadecimal')
    }

    const result = await updateBoat(boatId, update)

    res.status(result.status);
    res.send(result.body);

})

boatRouter.delete('/:id', async function(req, res) {

    const boatId = req.params.id;

    const result = await deleteBoatById(boatId)

    res.status(result.status);
    res.send(result.body);

})

module.exports = boatRouter;