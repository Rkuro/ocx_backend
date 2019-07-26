const api = {}
const env = require('dotenv').config()
const mongodb = require('mongodb')
const ERROR_CODES = require('./error_codes')

let mongo_client;

api.connect = async () => {
    try {
        return mongodb.connect( process.env.MONGODB_URI, {useNewUrlParser:true})
    } catch (e) {
        throw (e)
    }
}

api.update = async (db, collection, query, operations, options) => {
    try {
        return {
            status:ERROR_CODES.SUCCESS,
            data: await mongo_client.db(db).collection(collection).findOneAndUpdate(payload, {upsert:true, ...options})
        }
    } catch (e) {
        return {
            status:ERROR_CODES.FAILURE,
            data: {
                error:e
            }
        }
    }
}

api.write = async (db, collection, payload) => {
    try {
        return {
            status:ERROR_CODES.SUCCESS,
            data:await mongo_client.db(db).collection(collection).insert(payload)
        }
    } catch (e) {
        console.error(e)
        return {
            status:ERROR_CODES.FAILURE,
            data:{
                error:e
            }
        }
    }
}

api.read = async (db, collection, payload) => {
    try {
        return {
            status:ERROR_CODES.SUCCESS,
            data:await mongo_client.db(db).collection(collection).find(payload)
        }
    } catch (e) {
        console.error(e)
        return {
            status:ERROR_CODES.FAILURE,
            data: {
                error:e
            }
        }
    }
}

api.connect()
    .then(result => {
        console.log("connected to mongodb")
    })
    .catch(err => {
        console.error(err)
        throw (err)
    })

module.exports = api;