const User = require("../models/user");

const Product = require("../models/product");
const DB_DATA = require("./db-data");

function seedDatabase(client) {
  client.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.log(err);
    } else {
      if (names.length < 1) createInstances();
      else 
        console.log('Db already seeded');
    }
  });
}

function createInstances() {
  try {
    DB_DATA.PRODUCTS.forEach((product) => {
      const newProduct = new Product({
        name: product.name,
        price: product.price,
        description: product.description,
        shortDescription: product.shortDescription,
        imageUrl: product.imageUrl,
        stockQuantity: product.stockStatus,
      });

      newProduct.save();
    });
    console.log(`${DB_DATA.PRODUCTS.length} products added to db`);

    DB_DATA.ADMINS.forEach((admin) => {
      const newAdmin = new User(admin);
      newAdmin.save();
    });
    console.log(`${DB_DATA.ADMINS.length} users added to db`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = seedDatabase;
