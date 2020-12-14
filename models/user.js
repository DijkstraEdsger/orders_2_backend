const mongodb = require('mongodb');
let getDb = require('../util/database').getDb;

class User {
    constructor(name, email, password, id, cart) {
        this.name = name;
        this.email = email;
        this.password = password;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.cart = cart ? cart : { items: [] };
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

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex((item) => item.productId.toString() === product._id.toString());
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = { items: updatedCartItems };
        let db = getDb();
        return db.collection('users')
            .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: updatedCart } });
    }

    getCart() {
        let db = getDb();
        let productIds = this.cart.items.map((item) => {
            return item.productId;
        })
        return db.collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then((products) => {
                return products.map((p) => {
                    return {
                        ...p, quantity: this.cart.items.find(item =>
                            item.productId.toString() === p._id.toString()).quantity
                    };
                })
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
                console.log('userrrrrrrrr', user);
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

    static findByEmail(email) {
        let db = getDb();
        return db.collection('users')
            .find({ email: email })
            .next()
            .then((user) => {
                console.log('user by email', user);
                return user;
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

module.exports = User;