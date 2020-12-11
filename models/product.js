var getDb = require('../util/database').getDb;

class Product {
  constructor(name, price, image, description) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  save() {
    const db = getDb();
    return db.collection('products').insertOne(this)
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
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
