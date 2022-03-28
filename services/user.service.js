const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { database } = require('../database');

const collection = database.collection("users")

async function createUser(user) {

    const username = user.username;
    const password = user.password;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await collection.insertOne({ username, password: passwordHash });

    return {
        status: 201,
        body: 'Created'
    }
}

async function signIn({ username, password }) {
    const user = await collection.findOne({ username });

    if (!user) {
        return {
            status: 404,
            message: 'Not found'
        }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch: ', isMatch);

    if (isMatch) {
        const payload = {
            userId: user._id
        };
        const token = await jwt.sign(
            payload,
            process.env.SECRET, {
                expiresIn: 10000
            })
        return {
            status: 200,
            body: {
                token
            }
        }
    } else {
        return {
            status: 401,
            body: 'Invalid password'
        }
    }

}

module.exports = {
    createUser,
    signIn,
}