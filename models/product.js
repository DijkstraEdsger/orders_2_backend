var getDb = require('../util/database').getDb;
var mongodb = require('mongodb');

class Product {
  constructor(name, price, image, description, id) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this});
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    let db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    let db = getDb();
    return db.collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static delete(prodId) {
    let db = getDb();
    return db.collection('products')
    .deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then(() => {
      console.log('Product deleted succesfully');
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

module.exports = Product;
