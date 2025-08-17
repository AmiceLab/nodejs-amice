const db = require("../util/database");
const Cart = require("./cart");

module.exports = class Product {
  constructor(id, t, imageUrl, price, description) {
    this.id = id;
    this.title = t;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)",
      [this.title, this.price, this.imageUrl, this.description],
    );
  }

  static deleteById(id) {}

  // get all products
  // static : a class method you can call on the class itself
  // no cb here, since we use promise from database
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
