const mongodb = require('mongodb');
let getDb = require('../util/database').getDb;

class User {
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        let db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('users').updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOp = db.collection('users').insertOne(this);
        }
        return dbOp
            .then((result) => {
                console.log(result);
                return result;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    static fetchAll() {
        let db = getDb();
        return db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                return users;
            })
    }

    static findById(userId) {
        let db = getDb();
        return db.collection('users')
            .find({ _id: new mongodb.ObjectId(userId) })
            .next()
            .then((user) => {
                return user;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    static delete(userId) {
        let db = getDb();
        return db.collection('users')
            .deleteOne({ _id: new mongodb.ObjectId(userId) })
            .then(() => {
                console.log('user deleted');
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

module.exports = User;