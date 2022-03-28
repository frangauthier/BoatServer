const { database } = require('../database');
const Joi = require('joi');
const { ObjectId } = require('mongodb');

const collection = database.collection("boats")

module.exports.createBoat = async function(boatDocument) {

    try {
        validateBoat(boatDocument)
    } catch (err) {
        return {
            status: 400,
            body: String(err)
        }
    }

    await collection.insertOne(boatDocument);

    return {
        status: 201,
        body: 'Created boat'
    }

}

module.exports.findBoatByName = async function(name) {

    const document = await collection.findOne({ name });

    if (document) {
        return {
            status: 200,
            body: document
        }
    } else {
        return {
            status: 404,
            body: 'Not found'
        }
    }

}

module.exports.findBoatByLocation = async function(location) {

    const document = await collection.findOne({ pierLocation: location });

    if (document) {
        return {
            status: 200,
            body: document
        }
    } else {
        return {
            status: 404,
            body: 'Not found'
        }
    }
}

module.exports.updateBoat = async function(boatId, updateFields) {

    const update = await collection.findOneAndUpdate({ _id: ObjectId(boatId) }, {
        $set: updateFields
    })

    if (!update.value) {
        return {
            status: 404,
            body: 'Not found'
        }
    }

    return {
        status: 200,
        body: 'Updated'
    }

}

module.exports.deleteBoatById = async function(boatId) {

    const deletion = await collection.deleteOne({ _id: ObjectId(boatId) })

    return {
        status: 200,
        body: 'Removed'
    }

}

const BoatSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .required(),

    pierLocation: Joi.string()
        .min(4)
        .max(5)
        .required(),

    ownerId: Joi.string()
        .hex()
        .regex(/^.{16}$|^.{24}$/),

    specifications: Joi.object({
        size: Joi.number(), // size in feet from stern to bow
        horsePower: Joi.number(),
        make: Joi.string(),
    })
})

/**
 * Validate the object with the boat schema
 * @param {object} boatObj 
 * @throws {ValidationError}
 */
function validateBoat(boatObj) {
    const valid = BoatSchema.validate(boatObj)
    if (valid.error) {
        throw valid.error;
    }
}